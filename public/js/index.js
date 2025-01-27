document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('main-header');
    let lastScrollTop = 0;

    // Fonction de gestion du défilement
    function checkScroll() {
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
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();  // Initialisation de l'état du header

    // --- Partie Inactivité Souris --- 

    let timer;  

function changeHeaderState() {
    header.classList.remove('solid'); 
    header.classList.add('hidden'); 
}

function resetTimer() {
    clearTimeout(timer);

    // Vérifier si on est en haut de la page
    if (window.scrollY === 0) {
        header.classList.add('transparent');
    } else {
        header.classList.remove('transparent');
        timer = setTimeout(changeHeaderState, 3000);
    if (header.classList.contains('hidden')) {
        header.classList.remove('hidden');
        header.classList.add('solid');
    }
    }
}

document.addEventListener('mousemove', resetTimer);
document.addEventListener('scroll', resetTimer);  // Ajouter un écouteur sur le défilement
resetTimer();

    // --- Fin Partie Inactivité Souris ---

    // --- Carousel automatique ---
    let counter = 1;
    const totalSlides = 4;

    function changeSlide() {
        document.getElementById('radio' + counter).checked = true;
        counter = counter % totalSlides + 1;
    }

    setInterval(changeSlide, 5000);

    // --- Scrolling agréable ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Chargement lent des images ---
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

// --- Bouton interactif ---
document.querySelectorAll('.bouton a').forEach(item => {
    item.addEventListener('click', function() {
        // ouvrir le bouton
        this.classList.toggle('active');
        
        // pour ouvrir et fermer les bouton 
        const parentSection = this.closest('.bouton');
        parentSection.querySelectorAll('a.active').forEach(other => {
            if (other !== this) {
                other.classList.remove('active');
            }
        });
    });
});