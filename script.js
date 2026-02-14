// Navigation functionality
const navButtons = document.querySelectorAll('.nav-btn');
const sections = document.querySelectorAll('.section');

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Hide all sections
        sections.forEach(section => section.classList.remove('active'));
        
        // Show selected section
        const sectionId = button.getAttribute('data-section');
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// Expandable content functionality
const expandButtons = document.querySelectorAll('.expand-btn');

expandButtons.forEach(button => {
    button.addEventListener('click', function() {
        const expandableContent = this.nextElementSibling;
        
        if (expandableContent && expandableContent.classList.contains('expandable-content')) {
            const isHidden = expandableContent.style.display === 'none';
            
            if (isHidden) {
                expandableContent.style.display = 'block';
                this.textContent = 'Esconder';
            } else {
                expandableContent.style.display = 'none';
                this.textContent = 'Saber Mais';
            }
        }
    });
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    const sectionArray = Array.from(sections);
    const currentIndex = sectionArray.findIndex(section => section.classList.contains('active'));
    
    if (event.key === 'ArrowRight' && currentIndex < sectionArray.length - 1) {
        navButtons[currentIndex + 1].click();
    } else if (event.key === 'ArrowLeft' && currentIndex > 0) {
        navButtons[currentIndex - 1].click();
    }
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.content-box, .ritual-card, .prayer-card, .timeline-item').forEach(element => {
    observer.observe(element);
});

// Add hover effects to prayer cards
const prayerCards = document.querySelectorAll('.prayer-card');

prayerCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Feature cards interactivity
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach((card, index) => {
    card.addEventListener('click', function() {
        const sections = ['definicao', 'rituais', 'oracoes', 'historia', 'protecao'];
        if (index < sections.length) {
            const button = document.querySelector(`[data-section="${sections[index]}"]`);
            if (button) {
                button.click();
            }
        }
    });
});

// Initialize with home section active
window.addEventListener('load', function() {
    const homeButton = document.querySelector('[data-section="home"]');
    if (homeButton) {
        homeButton.click();
    }
});

// Add scroll-to-top button
const scrollButton = document.createElement('button');
scrollButton.innerHTML = '↑';
scrollButton.id = 'scrollToTop';
scrollButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #c41e3a;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5em;
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 99;
    box-shadow: 0 4px 15px rgba(196, 30, 58, 0.5);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollButton);

scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollButton.style.display = 'flex';
    } else {
        scrollButton.style.display = 'none';
    }
});

scrollButton.addEventListener('mouseenter', function() {
    this.style.background = '#a01530';
    this.style.transform = 'scale(1.1)';
});

scrollButton.addEventListener('mouseleave', function() {
    this.style.background = '#c41e3a';
    this.style.transform = 'scale(1)';
});

// Add print functionality
window.addEventListener('afterprint', function() {
    console.log('Página impressa com sucesso!');
});

console.log('Site Guia Completo de Exorcismo carregado com sucesso!');
