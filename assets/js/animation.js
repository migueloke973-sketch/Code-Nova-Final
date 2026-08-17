/* =========================================================
   CODENOVA — ANIMATIONS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ÉLÉMENTS ANIMÉS
    ===================================================== */

    const animatedElements =
        document.querySelectorAll(
            ".fade-in, .fade-up, .fade-left, .fade-right, .scale-in, .card-animate"
        );


    /* =====================================================
       INTERSECTION OBSERVER
    ===================================================== */

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add("visible");

                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        animatedElements.forEach(element => {

            /*
             * Les éléments card-animate utilisent
             * directement la classe visible.
             */

            if (
                element.classList.contains(
                    "card-animate"
                )
            ) {

                element.style.opacity = "0";

                element.style.transform =
                    "translateY(25px)";

            }

            observer.observe(element);

        });

    } else {

        /*
         * Compatibilité avec les anciens navigateurs.
         */

        animatedElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       BARRES DE PROGRESSION
    ===================================================== */

    const progressBars =
        document.querySelectorAll(
            ".progress-bar-fill"
        );


    if (
        progressBars.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const progressObserver =
            new IntersectionObserver(
                (entries, observerInstance) => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "active"
                        );

                        observerInstance.unobserve(
                            entry.target
                        );

                    });

                },
                {
                    threshold: 0.3
                }
            );


        progressBars.forEach(bar => {

            progressObserver.observe(bar);

        });

    }


    /* =====================================================
       DÉLAIS AUTOMATIQUES POUR LES CARTES
    ===================================================== */

    const animationGroups =
        document.querySelectorAll(
            ".features-grid, .courses-grid"
        );


    animationGroups.forEach(group => {

        const cards =
            group.querySelectorAll(
                ".feature-card, .course-card"
            );


        cards.forEach((card, index) => {

            card.style.animationDelay =
                `${index * 0.1}s`;

        });

    });


    /* =====================================================
       ANIMATION AU CHARGEMENT
    ===================================================== */

    document.body.classList.add(
        "page-loaded"
    );

});