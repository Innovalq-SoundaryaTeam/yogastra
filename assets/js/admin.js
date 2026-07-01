document.addEventListener('DOMContentLoaded', () => {
    // 1. Remove Page Loader
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500); // Wait for transition
        }, 500);
    }

    // 2. Sidebar Toggle (Mobile)
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('admin-sidebar');
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('show');
        });
    }

    // Close sidebar if clicking outside on mobile
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 992 && sidebar && sidebar.classList.contains('show')) {
            if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
                sidebar.classList.remove('show');
            }
        }
    });

    // 3. Dark Mode Toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Check local storage or system preference
        const savedTheme = localStorage.getItem('adminTheme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('adminTheme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }

    // 4. RTL Toggle
    const rtlToggle = document.getElementById('rtl-toggle');
    if (rtlToggle) {
        const savedDir = localStorage.getItem('adminDir');
        if (savedDir === 'rtl') {
            document.documentElement.setAttribute('dir', 'rtl');
        }

        rtlToggle.addEventListener('click', () => {
            const currentDir = document.documentElement.getAttribute('dir');
            if (currentDir === 'rtl') {
                document.documentElement.setAttribute('dir', 'ltr');
                localStorage.setItem('adminDir', 'ltr');
            } else {
                document.documentElement.setAttribute('dir', 'rtl');
                localStorage.setItem('adminDir', 'rtl');
            }
        });
    }

    // 5. Data table pagination (client-side)
    // Works on any "Page navigation" nav whose linked table rows carry a
    // data-page attribute, e.g. <tr data-page="2" class="d-none">.
    document.querySelectorAll('nav[aria-label="Page navigation"]').forEach(nav => {
        const card = nav.closest('.admin-card');
        if (!card) return;

        const rows = card.querySelectorAll('tbody > tr[data-page]');
        if (rows.length === 0) return;

        const pageLinks = nav.querySelectorAll('[data-page-link]');
        if (pageLinks.length === 0) return;

        const pageItems = nav.querySelectorAll('.page-item');
        const prevItem = pageItems[0];
        const nextItem = pageItems[pageItems.length - 1];
        const prevBtn = prevItem.querySelector('.page-link');
        const nextBtn = nextItem.querySelector('.page-link');
        const totalPages = pageLinks.length;
        let currentPage = 1;

        function showPage(page) {
            if (page < 1 || page > totalPages) return;
            currentPage = page;

            rows.forEach(row => {
                row.classList.toggle('d-none', Number(row.dataset.page) !== page);
            });

            pageLinks.forEach(link => {
                link.closest('.page-item').classList.toggle('active', Number(link.dataset.pageLink) === page);
            });

            prevItem.classList.toggle('disabled', page === 1);
            nextItem.classList.toggle('disabled', page === totalPages);
        }

        pageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                showPage(Number(link.dataset.pageLink));
            });
        });

        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(currentPage - 1);
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(currentPage + 1);
        });

        showPage(1);
    });
});

// Function for dummy CRUD actions (Delete confirmation)
function confirmDelete(id) {
    if(confirm('Are you sure you want to delete this record?')) {
        alert('Record deleted successfully (Demo).');
        // In a real app, you would make an AJAX call here and remove the row from DOM
    }
}
