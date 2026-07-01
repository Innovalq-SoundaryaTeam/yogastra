/**
 * YOGASTRA - DASHBOARD JS
 * Handles interactions specific to the member dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Simulate Loading State (Skeleton Loaders)
    const skeletonElements = document.querySelectorAll('.skeleton-content');
    const realElements = document.querySelectorAll('.real-content');

    if (skeletonElements.length > 0) {
        // Show skeletons initially, hide real content
        realElements.forEach(el => {
            el.style.opacity = '0';
            el.style.display = 'none';
        });

        // Simulate network request delay
        setTimeout(() => {
            skeletonElements.forEach(el => el.style.display = 'none');
            
            realElements.forEach(el => {
                el.style.display = ''; // restore to default
                // small delay for transition
                setTimeout(() => {
                    el.style.transition = 'opacity 0.5s ease';
                    el.style.opacity = '1';
                }, 50);
            });
        }, 800); // 800ms dummy load time
    }

    // Sidebar Toggle for Mobile Dashboard
    const sidebarToggleBtn = document.getElementById('sidebar-toggle');
    const sidebarCloseBtn = document.getElementById('sidebar-close');
    const dashboardSidebar = document.getElementById('dashboard-sidebar');
    const dashboardOverlay = document.getElementById('dashboard-overlay');

    function closeSidebar() {
        if (dashboardSidebar) {
            dashboardSidebar.classList.remove('show');
        }
        if (dashboardOverlay) {
            dashboardOverlay.classList.remove('show');
        }
    }

    if (sidebarToggleBtn && dashboardSidebar) {
        sidebarToggleBtn.addEventListener('click', () => {
            dashboardSidebar.classList.toggle('show');
            if (dashboardOverlay) {
                dashboardOverlay.classList.toggle('show');
            }
        });
    }

    if (dashboardOverlay) {
        dashboardOverlay.addEventListener('click', closeSidebar);
    }

    if (sidebarCloseBtn) {
        sidebarCloseBtn.addEventListener('click', closeSidebar);
    }

    // Booking Confirmation Modal Logic
    const bookButtons = document.querySelectorAll('.btn-book-now');
    const confirmBookBtn = document.getElementById('confirmBookBtn');
    
    if (bookButtons.length > 0 && confirmBookBtn) {
        bookButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                // In a real app, populate modal with class details here
                // e.g., using dataset attributes: this.dataset.classId
            });
        });

        confirmBookBtn.addEventListener('click', function() {
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Booking...';
            this.disabled = true;

            // Simulate booking API call
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check me-2"></i>Booked!';
                this.classList.remove('btn-primary');
                this.classList.add('btn-success');
                
                setTimeout(() => {
                    // Close modal (Bootstrap 5 way)
                    const modalEl = document.getElementById('bookingModal');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                    
                    // Reset button
                    this.innerHTML = originalText;
                    this.classList.remove('btn-success');
                    this.classList.add('btn-primary');
                    this.disabled = false;
                }, 1000);
            }, 1000);
        });
    }
});
