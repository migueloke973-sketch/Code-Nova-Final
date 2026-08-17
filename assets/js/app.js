/* =========================================================
   CODENOVA — APPLICATION GÉNÉRALE
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       HEADER AU SCROLL
    ===================================================== */

    const header =
        document.querySelector(".site-header");

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       ANNÉE AUTOMATIQUE
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );

    const currentYear =
        new Date().getFullYear();

    yearElements.forEach(element => {
        element.textContent = currentYear;
    });


    /* =====================================================
       LIEN ACTIF DE NAVIGATION
    ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    const navigationLinks =
        document.querySelectorAll(
            ".nav-link, .mobile-nav a"
        );

    navigationLinks.forEach(link => {

        const href =
            link.getAttribute("href");

        if (!href || href.startsWith("#")) {
            return;
        }

        const linkPage =
            href.split("/")
                .pop()
                .toLowerCase();

        link.classList.remove("active");

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       LIENS INTERNES AVEC SCROLL FLUIDE
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(
                    targetId
                );

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       BOUTON RETOUR EN HAUT
    ===================================================== */

    const backToTop =
        document.querySelector(
            "[data-back-to-top]"
        );

    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

        }

        updateBackToTop();

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       FERMER LE MENU MOBILE APRÈS CHANGEMENT DE PAGE
       ===================================================== */

    window.addEventListener(
        "pageshow",
        () => {

            document.body.classList.remove(
                "menu-open"
            );

        }
    );


    /* =====================================================
       CONSOLE CODENOVA
    ===================================================== */

    console.log(
        "%cCodeNova",
        "font-size: 24px; font-weight: bold;"
    );

    console.log(
        "APPRENDS • CODE • RÉUSSIS"
    );

});
/* =========================================================
   THÈME / APPARENCE
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("themeToggle");
  const saved = localStorage.getItem("codenova-theme");
  if (saved === "light") document.body.classList.add("light-mode");
  if (toggle) {
    toggle.textContent = document.body.classList.contains("light-mode") ? "☀" : "☾";
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("light-mode");
      const light = document.body.classList.contains("light-mode");
      localStorage.setItem("codenova-theme", light ? "light" : "dark");
      toggle.textContent = light ? "☀" : "☾";
    });
  }
});
