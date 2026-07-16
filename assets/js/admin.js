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

        // Is this a pure date column (not a "Date & Time" column, which
        // needs its full string kept intact)?
        function isDateHeader(header) {
            return /date/i.test(header) && !/time/i.test(header);
        }
        function isPlanHeader(header) {
            return /plan/i.test(header);
        }

        // Reads every existing row's cell at column `index` to find the
        // distinct values already in use (for building a Plan dropdown) and
        // any badge class each value is displayed with (e.g. Premium ->
        // "bg-primary"), so edits/adds stay visually consistent with rows
        // that were already there.
        function getColumnValues(index) {
            const values = [];
            const badgeClasses = {};
            Array.from(tbody.children).forEach(tr => {
                const cell = tr.children[index];
                if (!cell) return;
                const text = cell.textContent.trim();
                if (!text || values.includes(text)) return;
                values.push(text);
                const badge = cell.querySelector('.badge');
                if (badge) {
                    badgeClasses[text] = Array.from(badge.classList).filter(c => c !== 'badge').join(' ');
                }
            });
            return { values, badgeClasses };
        }

        // Converts a human-readable date ("Jan 15, 2026") into the
        // yyyy-mm-dd format <input type="date"> requires.
        function toISODate(str) {
            if (!str) return '';
            const d = new Date(str);
            if (isNaN(d.getTime())) return '';
            const yyyy = d.getFullYear();
            const mm = String(d.getMonth() + 1).padStart(2, '0');
            const dd = String(d.getDate()).padStart(2, '0');
            return `${yyyy}-${mm}-${dd}`;
        }

        // Converts a date-input's yyyy-mm-dd value back to the "Jan 15,
        // 2026" style already used across the admin tables.
        function formatDisplayDate(iso) {
            if (!iso) return '';
            const [y, m, d] = iso.split('-').map(Number);
            if (!y || !m || !d) return iso;
            return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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

                if (isDateHeader(header)) {
                    return `<div class="mb-3"><label class="form-label">${header}</label><input type="date" class="form-control" data-field-index="${i}" value="${toISODate(value)}"></div>`;
                }

                if (isPlanHeader(header)) {
                    const { values: planOptions } = getColumnValues(i);
                    const needsPlaceholder = !value || !planOptions.includes(value);
                    const optionsHtml = (needsPlaceholder ? `<option value="" disabled ${!value ? 'selected' : ''}>Select ${header}</option>` : '') +
                        planOptions.map(opt => `<option value="${opt.replace(/"/g, '&quot;')}" ${opt === value ? 'selected' : ''}>${opt}</option>`).join('');
                    return `<div class="mb-3"><label class="form-label">${header}</label><select class="form-select" data-field-index="${i}">${optionsHtml}</select></div>`;
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
                    } else if (isDateHeader(header)) {
                        cell.textContent = formatDisplayDate(val);
                    } else if (isPlanHeader(header)) {
                        const { badgeClasses } = getColumnValues(i);
                        const cls = badgeClasses[val];
                        cell.innerHTML = cls ? `<span class="badge ${cls}">${val}</span>` : val;
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

    // 6. Notification bell: turn the static bell icon into a working
    // Bootstrap dropdown showing recent alerts, and clear its unread dot
    // once opened. Present in the header on every admin page.
    document.querySelectorAll('.action-btn').forEach(btn => {
        if (!btn.querySelector('i.fa-bell')) return;

        const badge = btn.querySelector('.badge-indicator');
        const wrapper = document.createElement('div');
        wrapper.className = 'dropdown';
        btn.parentNode.insertBefore(wrapper, btn);
        wrapper.appendChild(btn);

        btn.setAttribute('data-bs-toggle', 'dropdown');
        btn.setAttribute('aria-expanded', 'false');

        const menu = document.createElement('ul');
        menu.className = 'dropdown-menu dropdown-menu-end shadow border-0 mt-2 p-2';
        menu.style.width = '320px';
        menu.innerHTML = `
            <li class="px-2 py-1 fw-bold border-bottom mb-2">Notifications</li>
            <li><a class="dropdown-item small py-2 white-space-normal" href="notifications.html">New Power Yoga class added to the schedule</a></li>
            <li><a class="dropdown-item small py-2 white-space-normal" href="notifications.html">Your membership renews in 3 days</a></li>
            <li><a class="dropdown-item small py-2 white-space-normal" href="notifications.html">Payment failed for invoice #INV-3006</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item small text-center text-primary fw-bold" href="notifications.html">View all notifications</a></li>
        `;
        wrapper.appendChild(menu);

        btn.addEventListener('click', () => {
            if (badge) badge.style.display = 'none';
        });
    });

    // 7. Download/Export Report: generates a real text-file summary from
    // whatever stat cards are on the page. Matches both "Download Report"
    // (Dashboard) and "Export Report" (Reports) by the download icon, plus
    // any table on the page, so it works generically on either page.
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (!btn.querySelector('i.fa-download')) return;
        if (!/report/i.test(btn.textContent)) return;

        btn.addEventListener('click', () => {
            const pageTitle = document.querySelector('main h2')?.textContent.trim() || 'Report';

            const stats = Array.from(document.querySelectorAll('.stat-card')).map(card => {
                const label = card.querySelector('p')?.textContent.trim() || '';
                const value = card.querySelector('h3')?.textContent.trim() || '';
                const note = card.querySelector('small')?.textContent.trim() || '';
                return `${label}: ${value}${note ? ' (' + note + ')' : ''}`;
            });

            const tableRows = Array.from(document.querySelectorAll('.admin-table')).flatMap(t => {
                const headers = Array.from(t.querySelectorAll('thead th')).map(th => th.textContent.trim());
                const rows = Array.from(t.querySelectorAll('tbody tr')).map(tr =>
                    Array.from(tr.children).map(td => td.textContent.trim()).join(' | ')
                );
                return rows.length ? [headers.join(' | '), ...rows] : [];
            });

            const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            const sections = [`Yogastra Admin - ${pageTitle}`, `Generated: ${today}`, ''];
            if (stats.length) sections.push(stats.join('\n'), '');
            if (tableRows.length) sections.push(tableRows.join('\n'), '');
            const content = sections.join('\n');

            const blob = new Blob([content], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `Yogastra-${pageTitle.replace(/\s+/g, '-')}-${new Date().toISOString().slice(0, 10)}.txt`;
            document.body.appendChild(link);
            link.click();
            link.remove();
            URL.revokeObjectURL(url);
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
