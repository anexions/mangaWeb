document.addEventListener('DOMContentLoaded', () => {
    
    const modal = document.getElementById('carta-modal');
    const openBtn = document.getElementById('open-menu');
    const closeBtn = document.getElementById('close-menu');

    // Función para abrir la carta con efecto cascada (stagger)
    openBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevenir scroll de fondo
        
        // Efecto Juicy: Cascada en los elementos de la carta
        const staggerItems = modal.querySelectorAll('.carta-section, .carta-header');
        staggerItems.forEach((item, index) => {
            item.classList.add('stagger-item');
            item.classList.remove('active'); // Reset para que siempre anime
            setTimeout(() => {
                item.classList.add('active');
            }, 100 * (index + 1));
        });
    });

    // Función para cerrar la carta con el botón
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restaurar scroll
    });

    // Cerrar la carta si se hace click fuera del contenido (en el overlay oscuro)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Efecto de scroll suave para enlaces de anclaje (ej. Galería)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Lógica del Slider de la Galería
    const slider = document.querySelector('.gallery-slider');
    const leftArrow = document.querySelector('.left-arrow');
    const rightArrow = document.querySelector('.right-arrow');

    if (slider && leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
            const scrollAmount = slider.clientWidth * 0.8; // Desplazar el 80% del ancho visible
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        rightArrow.addEventListener('click', () => {
            const scrollAmount = slider.clientWidth * 0.8;
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });
    }

    // Efecto Juicy 1: Animaciones de Aparición (Scroll Reveal)
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo animar la primera vez
            }
        });
    }, {
        threshold: 0.1, 
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Efecto Juicy 2: Parallax en el Hero
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            // Solo aplicar si estamos cerca del top para mejorar rendimiento
            if (scrolled < window.innerHeight) {
                heroBg.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        });
    }


});
