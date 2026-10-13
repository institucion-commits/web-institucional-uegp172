
/* ==========================================
   REVELACIÓN DE SECCIONES AL DESPLAZARSE
========================================== */

(() => {
    const selectores = [
        ".presentacion",
        ".tarjetas-acceso",
        ".imagen-secundaria",
        ".bloque-encabezado",
        ".noticia",
        ".recursos",
        ".recurso",
        ".footer"
    ];

    const elementos = document.querySelectorAll(
        selectores.join(",")
    );

    /* Si el navegador no admite esta función,
       el contenido sigue visible normalmente. */
    if (
        !("IntersectionObserver" in window) ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    elementos.forEach((elemento) => {
        elemento.classList.add("js-reveal");
    });

    const observador = new IntersectionObserver(
        (entradas, observer) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add("is-visible");
                    observer.unobserve(entrada.target);
                }
            });
        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -35px 0px"
        }
    );

    elementos.forEach((elemento) => {
        observador.observe(elemento);
    });
})();

/* ==========================================
   MENÚ ACTIVO SEGÚN LA SECCIÓN VISIBLE
========================================== */

(() => {
    const menu = document.querySelector(".header .menu");

    if (!menu) return;

    const enlaces = [...menu.querySelectorAll('a[href^="#"]')];

    const secciones = enlaces
        .map((enlace) => {
            const id = enlace.getAttribute("href").slice(1);
            const seccion = document.getElementById(id);

            return seccion ? { enlace, seccion } : null;
        })
        .filter(Boolean);

    if (!secciones.length) return;

    function activar(enlaceActivo) {
        enlaces.forEach((enlace) => {
            const activo = enlace === enlaceActivo;

            enlace.classList.toggle("activo", activo);

            if (activo) {
                enlace.setAttribute("aria-current", "location");
            } else {
                enlace.removeAttribute("aria-current");
            }
        });
    }

    /* Detectar clics en los enlaces */
    enlaces.forEach((enlace) => {
        enlace.addEventListener("click", () => {
            const destino = secciones.find(
                (item) => item.enlace === enlace
            );

            if (destino) activar(enlace);
        });
    });

    /* Detectar qué sección está visible */
    if ("IntersectionObserver" in window) {
        const observador = new IntersectionObserver(
            (entradas) => {
                const visibles = entradas
                    .filter((entrada) => entrada.isIntersecting)
                    .sort(
                        (a, b) =>
                            b.intersectionRatio - a.intersectionRatio
                    );

                if (!visibles.length) return;

                const actual = secciones.find(
                    (item) => item.seccion === visibles[0].target
                );

                if (actual) activar(actual.enlace);
            },
            {
                rootMargin: "-15% 0px -55% 0px",
                threshold: [0, 0.1, 0.25, 0.5]
            }
        );

        secciones.forEach(({ seccion }) => {
            observador.observe(seccion);
        });
    }
})();
