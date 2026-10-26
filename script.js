
/* ========================================
   1. CARGAR COMPONENTES HTML
======================================== */

async function cargarComponente(id, archivo) {
    try {
        const respuesta = await fetch(archivo);

        if (!respuesta.ok) {
            throw new Error(
                `No se pudo cargar ${archivo}: ${respuesta.status}`
            );
        }

        const contenido = await respuesta.text();
        const contenedor = document.getElementById(id);

        if (!contenedor) {
            console.error(`No se encontró el contenedor: ${id}`);
            return;
        }

        contenedor.innerHTML = contenido;

        // Marcar el enlace activo después de cargar el navbar.
        if (id === "navbar-container") {
            marcarPaginaActual();
        }
    } catch (error) {
        console.error(`Error al cargar el componente ${archivo}:`, error);
    }
}


/* ========================================
   2. CARGAR NAVBAR Y FOOTER
======================================== */

cargarComponente(
    "navbar-container",
    "components/navbar.html"
);

cargarComponente(
    "footer-container",
    "components/footer.html"
);


/* ========================================
   3. MARCAR LA PÁGINA ACTUAL
======================================== */

function marcarPaginaActual() {
    const paginaActual =
        window.location.pathname.split("/").pop() || "index.html";

    const enlaces = document.querySelectorAll(".nav-links a");

    enlaces.forEach(enlace => {
        const paginaEnlace = enlace.getAttribute("href");

        if (paginaEnlace === paginaActual) {
            enlace.classList.add("active");
            enlace.setAttribute("aria-current", "page");
        } else {
            enlace.classList.remove("active");
            enlace.removeAttribute("aria-current");
        }
    });
}


/* ========================================
   4. VOLVER ARRIBA AL RECARGAR
======================================== */

// Evita que el navegador restaure automáticamente
// la posición anterior del scroll.
if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}

// Lleva la página al inicio una vez cargada.
window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});
