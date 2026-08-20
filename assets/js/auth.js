/* CodeNova — authentification locale de démonstration.
 * Pour une vraie application en production, remplace ce module par un backend sécurisé.
 */
(() => {
  const USERS_KEY = "codenova-users";
  const SESSION_KEY = "codenova-session";

  const getUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || "[]"); }
    catch { return []; }
  };

  const saveUsers = users => localStorage.setItem(USERS_KEY, JSON.stringify(users));

  async function hash(value) {
    if (window.crypto?.subtle) {
      const data = new TextEncoder().encode(value);
      const buffer = await crypto.subtle.digest("SHA-256", data);
      return [...new Uint8Array(buffer)].map(b => b.toString(16).padStart(2, "0")).join("");
    }
    let h = 2166136261;
    for (const c of value) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
    return (h >>> 0).toString(16);
  }

  const currentUser = () => {
    const email = localStorage.getItem(SESSION_KEY);
    return email ? getUsers().find(user => user.email === email) || null : null;
  };

  const setSession = email => localStorage.setItem(SESSION_KEY, email);
  const clearSession = () => localStorage.removeItem(SESSION_KEY);

  async function register(name, email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const users = getUsers();
    if (users.some(user => user.email === normalizedEmail)) throw new Error("Cette adresse e-mail est déjà utilisée.");
    if (password.length < 8) throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
    users.push({ name: name.trim(), email: normalizedEmail, passwordHash: await hash(password), createdAt: new Date().toISOString() });
    saveUsers(users);
    setSession(normalizedEmail);
  }

  async function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();
    const user = getUsers().find(item => item.email === normalizedEmail);
    if (!user || user.passwordHash !== await hash(password)) throw new Error("E-mail ou mot de passe incorrect.");
    setSession(normalizedEmail);
  }

  function bindForms() {
    const registerForm = document.getElementById("registerForm");
    if (registerForm) registerForm.addEventListener("submit", async event => {
      event.preventDefault();
      const button = registerForm.querySelector("button[type=submit]");
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      try {
        button.disabled = true;
        await register(name, email, password);
        window.location.href = new URLSearchParams(location.search).get("redirect") || "dashboard.html";
      } catch (error) {
        alert(error.message);
        button.disabled = false;
      }
    });

    const loginForm = document.getElementById("loginForm");
    if (loginForm) loginForm.addEventListener("submit", async event => {
      event.preventDefault();
      const button = loginForm.querySelector("button[type=submit]");
      try {
        button.disabled = true;
        await login(document.getElementById("email").value, document.getElementById("password").value);
        window.location.href = new URLSearchParams(location.search).get("redirect") || "dashboard.html";
      } catch (error) {
        alert(error.message);
        button.disabled = false;
      }
    });
  }

  function updateAccountUI() {
    const user = currentUser();

    document.querySelectorAll("[data-user-name]").forEach(el => el.textContent = user?.name || "Apprenant");
    document.querySelectorAll("[data-user-email]").forEach(el => el.textContent = user?.email || "Non renseigné");
    document.querySelectorAll("[data-user-initials]").forEach(el => {
      const initials = (user?.name || "CN").split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0].toUpperCase()).join("");
      el.textContent = initials || "CN";
    });

    document.querySelectorAll("[data-auth-only]").forEach(el => {
      el.hidden = !user;
      el.setAttribute("aria-hidden", String(!user));
    });

    document.querySelectorAll("[data-guest-only]").forEach(el => {
      el.hidden = !!user;
      el.setAttribute("aria-hidden", String(!!user));
    });

    document.querySelectorAll("[data-logout]").forEach(button => {
      if (button.dataset.authBound === "true") return;
      button.dataset.authBound = "true";
      button.addEventListener("click", () => {
        clearSession();
        window.location.href = "index.html";
      });
    });

    if (["dashboard.html", "profil.html", "certificats.html"].includes(location.pathname.split("/").pop()) && !user) {
      const returnUrl = encodeURIComponent(location.pathname.split("/").pop());
      window.location.href = `connexion.html?redirect=${returnUrl}`;
    }
  }

  window.CodeNovaAuth = { currentUser, register, login, logout: clearSession, updateUI: updateAccountUI };
  document.addEventListener("DOMContentLoaded", () => { bindForms(); updateAccountUI(); });
})();
