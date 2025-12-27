document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();


    // 2. Typewriter Effect
    const typeTarget = document.getElementById('typewriter');
    if (typeTarget) {
        const phrases = [
            "digital experiences.",
            "web applications.",
            "interactive interfaces.",
            "software solutions."
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typeTarget.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typeTarget.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentPhrase.length) {
                isDeleting = true;
                setTimeout(type, 2000); // Wait before deleting
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, 500); // Wait before typing next
            } else {
                setTimeout(type, isDeleting ? 50 : 100);
            }
        };

        type();
    }

    // 3. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Mobile Menu Toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-item');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Toggle icon
            const icon = menuBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('ri-menu-line');
                icon.classList.add('ri-close-line');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
                document.body.style.overflow = 'auto';
            }
        });

        // Close menu when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('ri-close-line');
                icon.classList.add('ri-menu-line');
                document.body.style.overflow = 'auto';
            });
        });
    }

    // 5. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'light' && themeIcon) {
            themeIcon.classList.remove('ri-moon-line');
            themeIcon.classList.add('ri-sun-line');
        }
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Toggle Icon
            if (newTheme === 'light') {
                themeIcon.classList.remove('ri-moon-line');
                themeIcon.classList.add('ri-sun-line');
            } else {
                themeIcon.classList.remove('ri-sun-line');
                themeIcon.classList.add('ri-moon-line');
            }
        });
    }

    // 6. Contact Form Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            const statusMsg = document.getElementById('form-status');

            // Loading State
            btn.innerHTML = 'Sending... <i class="ri-loader-4-line ri-spin"></i>';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate Network Request
            setTimeout(() => {
                btn.innerHTML = 'Message Sent! <i class="ri-check-line"></i>';
                btn.style.backgroundColor = '#10b981';
                btn.style.opacity = '1';

                statusMsg.textContent = "Thanks for reaching out! I'll get back to you shortly.";
                statusMsg.className = 'form-status success';

                contactForm.reset();

                // Reset Button after 3 seconds
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                    statusMsg.textContent = '';
                }, 3000);
            }, 1500);
        });
    }
});
