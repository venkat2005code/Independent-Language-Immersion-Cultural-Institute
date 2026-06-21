document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle (Dark/Light)
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Check for saved user preference, if any, on load of the website
    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
        htmlElement.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    // 2. Direction Toggle (RTL/LTR)
    // Display only the active mode: show 'LTR' when in LTR mode, and 'RTL' when in RTL mode.
    // Wait, the prompt says: "Display only the active mode in the RTL/LTR toggle — show 'LTR' when in LTR mode and 'RTL' when in RTL mode"
    const dirToggleBtn = document.getElementById('dir-toggle');
    
    // Check saved preference
    const currentDir = localStorage.getItem('dir') || 'ltr';
    htmlElement.setAttribute('dir', currentDir);
    dirToggleBtn.textContent = currentDir.toUpperCase();

    dirToggleBtn.addEventListener('click', () => {
        const currentDir = htmlElement.getAttribute('dir');
        const targetDir = currentDir === 'ltr' ? 'rtl' : 'ltr';
        htmlElement.setAttribute('dir', targetDir);
        localStorage.setItem('dir', targetDir);
        dirToggleBtn.textContent = targetDir.toUpperCase();
    });

    // 3. Wizard Interactivity (Placeholder)
    const nextStepBtn = document.getElementById('next-step');
    if (nextStepBtn) {
        let currentStep = 1;
        const steps = document.querySelectorAll('.step');
        
        nextStepBtn.addEventListener('click', () => {
            if (currentStep < steps.length) {
                steps[currentStep].classList.add('active');
                currentStep++;
            } else {
                // Reset or Finish
                alert('Placement Test Completed! Redirecting to results...');
                steps.forEach((step, index) => {
                    if (index !== 0) step.classList.remove('active');
                });
                currentStep = 1;
            }
        });
    }

    // 4. LMS Dashboard ScrollSpy & Navigation
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-target]');
    const dashboardContent = document.querySelector('.dashboard-content');
    
    if (sidebarItems.length > 0 && dashboardContent) {
        // Click to scroll
        sidebarItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetId = item.getAttribute('data-target');
                if (!targetId) return;
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // ScrollSpy using IntersectionObserver
        const sections = document.querySelectorAll('.lms-section');
        const observerOptions = {
            root: dashboardContent,
            rootMargin: '0px 0px -40% 0px', // Adjusted to trigger closer to top
            threshold: 0.2
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    sidebarItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('data-target') === id) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // Hamburger Menu Toggle
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('.nav-menu');
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const icon = hamburgerBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Dashboard Sidebar Hamburger Toggle
    const sidebarToggles = document.querySelectorAll('.sidebar-hamburger');
    const sidebar = document.querySelector('.sidebar');
    if (sidebarToggles.length > 0 && sidebar) {
        sidebarToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
                const icon = toggle.querySelector('i');
                if (sidebar.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-xmark');
                } else {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
});
