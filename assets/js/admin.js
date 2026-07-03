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

    // 5. Data tables: pagination + live search + Add/Edit/Delete (client-side demo)
    // Works generically across every admin list page (Members, Trainers,
    // Classes, Bookings, etc.) by reading each .admin-card's own table
    // headers/rows, rather than needing bespoke code per page.

    // Shared Add/Edit modal, injected once and reused by every table.
    if (!document.getElementById('genericRecordModal')) {
        document.body.insertAdjacentHTML('beforeend', `
            <div class="modal fade" id="genericRecordModal" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="genericRecordModalTitle">Add Record</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body" id="genericRecordModalBody"></div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                    <button type="button" class="btn btn-primary" id="genericRecordSaveBtn">Save</button>
                  </div>
                </div>
              </div>
            </div>
        `);
    }

    document.querySelectorAll('.admin-card').forEach(card => {
        const table = card.querySelector('table.admin-table');
        if (!table) return;
        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        const nav = card.querySelector('nav[aria-label="Page navigation"]');
        const searchInput = card.querySelector('input[placeholder^="Search"]');

        let currentPage = 1;
        let pageLinks = [];
        let prevItem, nextItem, prevBtn, nextBtn;
        let totalPages = 1;

        if (nav) {
            pageLinks = Array.from(nav.querySelectorAll('[data-page-link]'));
            const pageItems = nav.querySelectorAll('.page-item');
            prevItem = pageItems[0];
            nextItem = pageItems[pageItems.length - 1];
            prevBtn = prevItem ? prevItem.querySelector('.page-link') : null;
            nextBtn = nextItem ? nextItem.querySelector('.page-link') : null;
            totalPages = pageLinks.length || 1;
        }

        function render() {
            const rows = Array.from(tbody.children);
            const term = searchInput ? searchInput.value.trim().toLowerCase() : '';
            const isSearching = term.length > 0;

            if (nav) nav.classList.toggle('d-none', isSearching);

            rows.forEach(row => {
                if (isSearching) {
                    row.classList.toggle('d-none', !row.textContent.toLowerCase().includes(term));
                } else if (row.dataset.page) {
                    row.classList.toggle('d-none', Number(row.dataset.page) !== currentPage);
                } else {
                    row.classList.remove('d-none');
                }
            });

            if (nav && !isSearching) {
                pageLinks.forEach(link => {
                    link.closest('.page-item').classList.toggle('active', Number(link.dataset.pageLink) === currentPage);
                });
                if (prevItem) prevItem.classList.toggle('disabled', currentPage === 1);
                if (nextItem) nextItem.classList.toggle('disabled', currentPage === totalPages);
            }
        }

        if (nav) {
            pageLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = Number(link.dataset.pageLink);
                    render();
                });
            });
            if (prevBtn) {
                prevBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage > 1) { currentPage--; render(); }
                });
            }
            if (nextBtn) {
                nextBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) { currentPage++; render(); }
                });
            }
        }

        if (searchInput) {
            searchInput.addEventListener('input', render);
        }

        render();

        // --- Add / Edit wiring for this table ---
        const theadThs = Array.from(table.querySelectorAll('thead th')).map(th => th.textContent.trim());
        const actionsIndex = theadThs.findIndex(h => h.toLowerCase() === 'actions');
        const fieldHeaders = actionsIndex === -1 ? theadThs : theadThs.slice(0, actionsIndex);

        // The "+ Add X" button lives in the header row just above this card.
        let addBtn = null;
        const headerRow = card.previousElementSibling;
        if (headerRow) {
            const candidate = headerRow.querySelector('button.btn-primary');
            if (candidate && candidate.querySelector('i.fa-plus')) {
                addBtn = candidate;
            }
        }

        function openModal(mode, row) {
            const modalEl = document.getElementById('genericRecordModal');
            const modalTitle = document.getElementById('genericRecordModalTitle');
            const modalBody = document.getElementById('genericRecordModalBody');
            const saveBtn = document.getElementById('genericRecordSaveBtn');

            modalTitle.textContent = mode === 'add' ? 'Add Record' : 'Edit Record';
            modalBody.innerHTML = fieldHeaders.map((header, i) => {
                let value = '';
                if (row && row.children[i]) {
                    value = row.children[i].textContent.trim();
                }
                return `<div class="mb-3"><label class="form-label">${header}</label><input type="text" class="form-control" data-field-index="${i}" value="${value.replace(/"/g, '&quot;')}"></div>`;
            }).join('');

            const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

            saveBtn.onclick = () => {
                const inputs = modalBody.querySelectorAll('[data-field-index]');
                const values = Array.from(inputs).map(inp => inp.value.trim());
                let targetRow = row;

                if (!targetRow) {
                    targetRow = document.createElement('tr');
                    targetRow.dataset.page = '1';
                    const existingRow = tbody.querySelector('tr');
                    const actionsCell = existingRow && actionsIndex !== -1 ? existingRow.children[actionsIndex] : null;
                    targetRow.innerHTML = fieldHeaders.map(() => '<td></td>').join('') +
                        (actionsCell ? `<td>${actionsCell.innerHTML}</td>` : '');
                    tbody.prepend(targetRow);

                    if (actionsIndex !== -1) {
                        const newId = Date.now();
                        const delBtn = targetRow.querySelector('.btn-icon.delete');
                        if (delBtn) delBtn.setAttribute('onclick', `confirmDelete(${newId})`);
                    }
                }

                fieldHeaders.forEach((header, i) => {
                    const cell = targetRow.children[i];
                    if (!cell) return;
                    const val = values[i] || '';

                    if (/status/i.test(header)) {
                        const lower = val.toLowerCase();
                        const activeWords = ['active', 'published', 'paid', 'completed', 'sent', 'read', 'confirmed'];
                        const cls = activeWords.some(w => lower.includes(w)) ? 'status-active' : 'status-pending';
                        cell.innerHTML = `<span class="status-badge ${cls}">${val}</span>`;
                    } else {
                        cell.textContent = val;
                    }
                });

                render();
                modal.hide();
            };

            modal.show();
        }

        if (addBtn) {
            addBtn.addEventListener('click', () => openModal('add', null));
        }

        // Delegated so Edit works on rows added later via the Add modal too.
        tbody.addEventListener('click', (e) => {
            const editBtn = e.target.closest('.btn-icon:not(.delete)');
            if (!editBtn) return;
            openModal('edit', editBtn.closest('tr'));
        });
    });
});

// Delete confirmation — removes the row the clicked button belongs to.
function confirmDelete(id) {
    if (confirm('Are you sure you want to delete this record?')) {
        const trigger = window.event && window.event.target ? window.event.target.closest('tr') : null;
        if (trigger) trigger.remove();
    }
}
