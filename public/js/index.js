document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    let ticking = false;  // Variable pour optimiser le défilement

    // Fonction de gestion du défilement
    function checkScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

                // Si l'utilisateur est en haut de la page
                if (scrollTop === 0) {
                    header.classList.remove('solid');
                    header.classList.add('transparent');
                } else {
                    header.classList.remove('transparent');
                    header.classList.add('solid');
                }

                // Si on défile vers le bas, cacher le header
                if (scrollTop > lastScrollTop) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }

                lastScrollTop = scrollTop;
                ticking = false;
            });
            ticking = true;
        }
    }

    // Ajouter l'événement de scroll
    window.addEventListener('scroll', checkScroll);
    checkScroll();  // Initialisation de l'état du header

    // Timer pour cacher le header après un certain délai d'inactivité
    let timer;

    function changeHeaderState() {
        header.classList.remove('solid');
        header.classList.add('hidden');
    }

    function resetTimer() {
        clearTimeout(timer);
        if (window.scrollY === 0) {
            header.classList.add('transparent');
        } else {
            header.classList.remove('transparent');
            timer = setTimeout(changeHeaderState, 3000);
        }

        if (header.classList.contains('hidden')) {
            header.classList.remove('hidden');
            header.classList.add('solid');
        }
    }

    document.addEventListener('mousemove', resetTimer);
    document.addEventListener('scroll', resetTimer);
    resetTimer();

    // Scrolling agréable (smooth scrolling) pour les liens ancrés
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Chargement lent des images (Lazy Loading)
    const images = document.querySelectorAll('img[data-src]');
    const config = {
        rootMargin: '0px 0px 50px 0px',
        threshold: 0
    };

    let observer = new IntersectionObserver(function(entries, self) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                preloadImage(entry.target);
                self.unobserve(entry.target);
            }
        });
    }, config);

    images.forEach(image => {
        observer.observe(image);
    });

    function preloadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        img.src = src;
    }

});
