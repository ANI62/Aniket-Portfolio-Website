// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Wait for document load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const loader = document.querySelector('.loader');
    const progressBar = document.querySelector('.bar-fill');
    
    // Simulate loading progress
    gsap.to(progressBar, {
        width: '100%',
        duration: 2,
        ease: 'power2.inOut'
    });
    
    // Hide loader after content loads
    gsap.to(loader, {
        opacity: 0,
        duration: 0.5,
        delay: 2.2,
        onComplete: () => {
            loader.style.display = 'none';
            // Start animations after loader is gone
            initAnimations();
        }
    });
    
    // Initialize custom cursor
    initCustomCursor();
    
    // Toggle mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('show');
    });
    
    // Close menu when clicking a nav link on mobile
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('show');
        });
    });
    
    // Make header sticky on scroll
    window.addEventListener('scroll', function() {
        const header = document.getElementById('header');
        if (window.scrollY > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Show/hide back to top button
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 500) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });
    
    // Back to top functionality
    document.querySelector('.back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
});

// Custom cursor function
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    // Only initialize if cursor elements exist
    if (cursor && cursorFollower) {
        document.addEventListener('mousemove', function(e) {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1
            });
            
            gsap.to(cursorFollower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.3
            });
        });
        
        // Change cursor on hoverable elements
        const hoverables = document.querySelectorAll('a, button, .btn, .project-card, .hamburger, .back-to-top');
        
        hoverables.forEach(hoverable => {
            hoverable.addEventListener('mouseenter', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorFollower.style.backgroundColor = 'rgba(52, 152, 219, 0.1)';
                cursorFollower.style.border = 'none';
            });
            
            hoverable.addEventListener('mouseleave', function() {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorFollower.style.backgroundColor = 'transparent';
                cursorFollower.style.border = '2px solid var(--primary-color)';
            });
        });
        
        // Hide cursor on document leave
        document.addEventListener('mouseleave', function() {
            cursor.style.opacity = '0';
            cursorFollower.style.opacity = '0';
        });
        
        document.addEventListener('mouseenter', function() {
            cursor.style.opacity = '1';
            cursorFollower.style.opacity = '0.5';
        });
    }
}

// Initialize GSAP animations
function initAnimations() {
    // Hero section animations
    const heroTimeline = gsap.timeline();
    
    heroTimeline
        .from('.logo', {
            y: -50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        })
        .from('nav ul li', {
            y: -50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.animate-text', {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.scroll-indicator', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
        }, '-=0.3');
    
    // About section animations
    gsap.from('#about .section-header', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.about-text', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.skills', {
        scrollTrigger: {
            trigger: '.skills',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.skill-group', {
        scrollTrigger: {
            trigger: '.skill-groups',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Experience section animations
    gsap.from('#experience .section-header', {
        scrollTrigger: {
            trigger: '#experience',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.experience-item', {
        scrollTrigger: {
            trigger: '.experience-timeline',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        duration: 0.8,
        stagger: 0.3,
        ease: 'power3.out'
    });
    
            // // Projects section animations with staggered reveal
            // gsap.from(".project-content", {
            //     y: 50,
            //     opacity: 0,
            //     duration: 1,
            //     scrollTrigger: {
            //       trigger: ".project-section",
            //       start: "top 80%",
            //     },
            //   });
            
            // gsap.from('#projects .section-header', {
            //     scrollTrigger: {
            //         trigger: '#projects',
            //         start: 'top 80%',
            //         toggleActions: 'play none none none'
            //     },
            //     y: 50,
            //     opacity: 0,
            //     duration: 0.8,
            //     ease: 'power3.out'
            // });
            
            // gsap.from('.project-card', {
            //     scrollTrigger: {
            //         trigger: '.projects-grid',
            //         start: 'top 80%',
            //         toggleActions: 'play none none none'
            //     },
            //     y: 50,
            //     opacity: 0,
            //     duration: 0.8,
            //     stagger: 0.2,
            //     ease: 'power3.out'
            // });
    
    // Achievements section with reveal animation
    // gsap.from('#achievements .section-header', {
    //     scrollTrigger: {
    //         trigger: '#achievements',
    //         start: 'top 80%',
    //         toggleActions: 'play none none none'
    //     },
    //     y: 50,
    //     opacity: 0,
    //     duration: 0.8,
    //     ease: 'power3.out'
    // });
    
    // gsap.from('.achievement-card', {
    //     scrollTrigger: {
    //         trigger: '.achievements-grid',
    //         start: 'top 80%',
    //         toggleActions: 'play none none none'
    //     },
    //     scale: 0.8,
    //     opacity: 0,
    //     duration: 0.6,
    //     stagger: 0.15,
    //     ease: 'back.out(1.7)'
    // });
    
    // Interests section with pop animation
    gsap.from('#interests .section-header', {
        scrollTrigger: {
            trigger: '#interests',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.interest-item', {
        scrollTrigger: {
            trigger: '.interests-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)'
    });
    
    // Contact section animations
    gsap.from('#contact .section-header', {
        scrollTrigger: {
            trigger: '#contact',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    gsap.from('.contact-item', {
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        x: -50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    gsap.from('.form-group', {
        scrollTrigger: {
            trigger: '.contact-form',
            start: 'top 80%',
            toggleActions: 'play none none none'
        },
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power3.out'
    });
    
    // Footer animation
    gsap.from('.footer-content > div', {
        scrollTrigger: {
            trigger: 'footer',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: 'power3.out'
    });
    
    // Text reveal scroll animations for paragraphs
    gsap.utils.toArray('.about-text p, .experience-content p, .project-content p').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 20,
            opacity: 0,
            duration: 0.5,
            ease: 'power3.out'
        });
    });
    
    // Parallax effect for sections - using a more gentle approach
    gsap.utils.toArray('section').forEach(section => {
        const background = section.querySelector('.container');
        if (background) {
            gsap.to(background, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 50, // Reduced from 100 to 50 for more subtle effect
                ease: 'none'
            });
        }
    });
    
    // ScrollTrigger for header background change
    ScrollTrigger.create({
        trigger: 'body',
        start: 'top -80',
        onEnter: () => gsap.to('#header', {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
            height: '70px',
            duration: 0.3
        }),
        onLeaveBack: () => gsap.to('#header', {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            height: 'auto',
            duration: 0.3
        })
    });
}