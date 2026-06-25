/* ============================================================
   INSTITUCIÓN EDUCATIVA GUANE — JAVASCRIPT PRINCIPAL
   Todo en JS vanilla (sin librerías). Dividido en 4 partes:
     1. Menú hamburguesa (móvil)
     2. Animaciones de scroll (Intersection Observer)
     3. Contador animado de cifras institucionales
     4. Año dinámico en el footer
   ============================================================ */

/* Esperamos a que todo el HTML esté cargado antes de buscar elementos,
   así evitamos errores de "elemento no encontrado". */
document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     1. MENÚ HAMBURGUESA (solo visible/funcional en móvil)
     ---------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      // Alternamos la clase que desliza el menú dentro/fuera de pantalla (ver CSS)
      const isOpen = navMenu.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);

      // Actualizamos aria-expanded para que lectores de pantalla sepan
      // si el menú está abierto o cerrado (accesibilidad)
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Si el usuario hace click en cualquier link del menú, lo cerramos
    // automáticamente (mejora la experiencia en móvil).
    navMenu.querySelectorAll('.nav__link, .nav__cta').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ----------------------------------------------------------
     2. ANIMACIONES DE SCROLL (fade-in + slide-up)
     ----------------------------------------------------------
     Usamos Intersection Observer en vez de escuchar el evento "scroll"
     directamente, porque es mucho más eficiente: el navegador nos avisa
     solo cuando un elemento entra o sale del viewport, sin que nosotros
     tengamos que calcular posiciones manualmente en cada pixel de scroll. */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // El elemento ya es visible en pantalla: añadimos la clase
        // que dispara la transición CSS (opacidad + traslación).
        entry.target.classList.add('is-visible');

        // Dejamos de observarlo: la animación de entrada solo debe
        // ocurrir una vez, no cada vez que se hace scroll arriba/abajo.
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15, // se activa cuando el 15% del elemento es visible
    rootMargin: '0px 0px -40px 0px' // dispara un poco antes de llegar al borde inferior
  });

  revealElements.forEach((el) => revealObserver.observe(el));

  /* ----------------------------------------------------------
     3. CONTADOR ANIMADO DE CIFRAS INSTITUCIONALES
     ----------------------------------------------------------
     Cada <span class="stat__number" data-target="23"> tiene un
     atributo data-target con el número final. Cuando la sección
     de cifras entra en pantalla, animamos desde 0 hasta ese número. */
  const statNumbers = document.querySelectorAll('.stat__number[data-target]');

  // Anima un solo elemento numérico desde 0 hasta su valor final
  function animateCount(element) {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 1400; // duración total de la animación, en milisegundos
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // valor entre 0 y 1

      // Math.floor para que el número solo muestre enteros mientras sube
      element.textContent = Math.floor(progress * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        element.textContent = target; // asegura que termine exacto en el valor final
      }
    }

    requestAnimationFrame(step);
  }

  // Un segundo observer, independiente del de "reveal", porque la lógica
  // de conteo es distinta a solo mostrar/ocultar con CSS.
  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach((el) => statsObserver.observe(el));

  /* ----------------------------------------------------------
     4. AÑO DINÁMICO EN EL FOOTER
     ----------------------------------------------------------
     Así no hay que actualizar manualmente el "© 2026" cada año. */
  const yearSpan = document.getElementById('currentYear');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

});
