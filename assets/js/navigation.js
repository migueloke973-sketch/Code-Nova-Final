/* =========================================================
   CODENOVA — NAVIGATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileMenuClose = document.getElementById("mobileMenuClose");
    const menuOverlay = document.getElementById("menuOverlay");
    const mobileLinks = document.querySelectorAll(".mobile-nav a");

    if (!menuToggle || !mobileMenu) {
        return;
    }


    /* =====================================================
       OUVRIR LE MENU
    ===================================================== */

    function openMenu() {

        mobileMenu.classList.add("open");

        menuOverlay?.classList.add("active");

        menuToggle.classList.add("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        document.body.classList.add("menu-open");
    }


    /* =====================================================
       FERMER LE MENU
    ===================================================== */

    function closeMenu() {

        mobileMenu.classList.remove("open");

        menuOverlay?.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        document.body.classList.remove("menu-open");
    }


    /* =====================================================
       BOUTON HAMBURGER
    ===================================================== */

    menuToggle.addEventListener("click", () => {

        const isOpen =
            mobileMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    /* =====================================================
       BOUTON FERMER
    ===================================================== */

    if (mobileMenuClose) {

        mobileMenuClose.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================================
       OVERLAY
    ===================================================== */

    if (menuOverlay) {

        menuOverlay.addEventListener(
            "click",
            closeMenu
        );

    }


    /* =====================================================
       LIENS DU MENU
    ===================================================== */

    mobileLinks.forEach(link => {

        link.addEventListener("click", () => {
            closeMenu();
        });

    });


    /* =====================================================
       TOUCHE ESC
    ===================================================== */

    document.addEventListener("keydown", event => {

        if (
            event.key === "Escape" &&
            mobileMenu.classList.contains("open")
        ) {

            closeMenu();

        }

    });


    /* =====================================================
       REDIMENSIONNEMENT
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 900 &&
            mobileMenu.classList.contains("open")
        ) {

            closeMenu();

        }

    });

});