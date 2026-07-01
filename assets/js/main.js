/**
 * YOGASTRA - MAIN JS
 * Handles generic interactions, dark mode, and form validation.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle (Dark/Light Mode)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage for preference, default to light
    const savedTheme = localStorage.getItem('yogastra-theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    const rtlToggleBtn = document.getElementById('rtl-toggle');
    const savedDirection = localStorage.getItem('yogastra-dir') || 'ltr';
    htmlElement.setAttribute('dir', savedDirection);
    updateRtlState(savedDirection);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('yogastra-theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    if (rtlToggleBtn) {
        rtlToggleBtn.addEventListener('click', () => {
            const currentDir = htmlElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'ltr' ? 'rtl' : 'ltr';

            htmlElement.setAttribute('dir', newDir);
            localStorage.setItem('yogastra-dir', newDir);
            updateRtlState(newDir);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    function updateRtlState(dir) {
        if (!rtlToggleBtn) return;
        const icon = rtlToggleBtn.querySelector('i');
        if (dir === 'rtl') {
            rtlToggleBtn.classList.add('active');
            rtlToggleBtn.setAttribute('aria-label', 'Switch to LTR Mode');
        } else {
            rtlToggleBtn.classList.remove('active');
            rtlToggleBtn.setAttribute('aria-label', 'Switch to RTL Mode');
        }
        icon.classList.toggle('fa-flip', dir === 'rtl');
    }

    // 2. Form Validation (Client-side)
    const forms = document.querySelectorAll('.needs-validation');
    
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });

    // 3. Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('shadow-sm');
            } else {
                navbar.classList.remove('shadow-sm');
            }
        });
    }

    // 4. Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

});
