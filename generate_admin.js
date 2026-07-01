const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'admin');
if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir, { recursive: true });
}

const adminPages = [
    { file: 'dashboard.html', title: 'Dashboard', icon: 'fa-home' },
    { file: 'users.html', title: 'Manage Users', icon: 'fa-users' },
    { file: 'classes.html', title: 'Manage Classes', icon: 'fa-spa' },
    { file: 'trainers.html', title: 'Manage Trainers', icon: 'fa-chalkboard-teacher' },
    { file: 'bookings.html', title: 'Manage Bookings', icon: 'fa-calendar-check' },
    { file: 'payments.html', title: 'Manage Payments', icon: 'fa-credit-card' },
    { file: 'attendance.html', title: 'Attendance', icon: 'fa-clipboard-user' },
    { file: 'testimonials.html', title: 'Testimonials', icon: 'fa-star' },
    { file: 'messages.html', title: 'Messages', icon: 'fa-envelope' },
    { file: 'reports.html', title: 'Reports', icon: 'fa-chart-bar' },
    { file: 'profile.html', title: 'Admin Profile', icon: 'fa-user-shield' },
    { file: 'settings.html', title: 'Settings', icon: 'fa-cog' }
];

const generateSidebar = (activeFile) => {
    let links = '';
    adminPages.forEach(page => {
        const active = page.file === activeFile ? 'active' : '';
        links += `            <a href="${page.file}" class="admin-nav-link ${active}"><i class="fas ${page.icon}"></i> ${page.title}</a>\n`;
    });
    return `
    <!-- Sidebar -->
    <aside class="admin-sidebar" id="admin-sidebar">
        <a href="dashboard.html" class="brand"><i class="fas fa-leaf me-2"></i>Yogastra Admin</a>
        <div class="nav flex-column">
${links}
            <a href="../login.html" class="admin-nav-link text-danger mt-4"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </aside>
    `;
};

const generatePage = (page) => {
    let content = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">${page.title}</h2>
            <button class="btn btn-primary"><i class="fas fa-plus me-2"></i> Add New</button>
        </div>
        <div class="table-wrapper">
            <p class="text-muted">Content for ${page.title} goes here. Manage your data efficiently.</p>
            <div class="table-responsive">
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#1001</td>
                            <td>Demo Data 1</td>
                            <td><span class="badge bg-success">Active</span></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>#1002</td>
                            <td>Demo Data 2</td>
                            <td><span class="badge bg-warning">Pending</span></td>
                            <td>
                                <button class="btn btn-sm btn-outline-primary"><i class="fas fa-edit"></i></button>
                                <button class="btn btn-sm btn-outline-danger"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    if(page.file === 'dashboard.html') {
        content = `
        <h2 class="fw-bold mb-4">Dashboard Overview</h2>
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="stat-card">
                    <div>
                        <h6 class="text-muted">Total Users</h6>
                        <h3 class="fw-bold mb-0">1,245</h3>
                    </div>
                    <div class="stat-icon primary"><i class="fas fa-users"></i></div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div>
                        <h6 class="text-muted">Total Bookings</h6>
                        <h3 class="fw-bold mb-0">856</h3>
                    </div>
                    <div class="stat-icon success"><i class="fas fa-calendar-check"></i></div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div>
                        <h6 class="text-muted">Total Revenue</h6>
                        <h3 class="fw-bold mb-0">$12,450</h3>
                    </div>
                    <div class="stat-icon warning"><i class="fas fa-dollar-sign"></i></div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="stat-card">
                    <div>
                        <h6 class="text-muted">Active Classes</h6>
                        <h3 class="fw-bold mb-0">24</h3>
                    </div>
                    <div class="stat-icon info"><i class="fas fa-spa"></i></div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="table-wrapper">
                    <h5 class="fw-bold mb-3">Recent Bookings</h5>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Class</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>John Doe</td><td>Morning Vinyasa</td><td>Today, 8:00 AM</td><td><span class="badge bg-success">Confirmed</span></td></tr>
                            <tr><td>Jane Smith</td><td>Hatha Yoga</td><td>Tomorrow, 10:00 AM</td><td><span class="badge bg-warning">Pending</span></td></tr>
                            <tr><td>Mike Johnson</td><td>Meditation</td><td>Oct 25, 6:00 PM</td><td><span class="badge bg-success">Confirmed</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="table-wrapper">
                    <h5 class="fw-bold mb-3">Class Performance</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">Morning Vinyasa <span class="badge bg-primary rounded-pill">95%</span></li>
                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">Hatha Yoga <span class="badge bg-primary rounded-pill">85%</span></li>
                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">Power Yoga <span class="badge bg-primary rounded-pill">78%</span></li>
                        <li class="list-group-item d-flex justify-content-between align-items-center px-0">Meditation <span class="badge bg-primary rounded-pill">92%</span></li>
                    </ul>
                </div>
            </div>
        </div>
        `;
    }

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${page.title} | Admin Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>

${generateSidebar(page.file)}

    <!-- Main Content -->
    <main class="admin-main">
        <!-- Top Navbar -->
        <div class="admin-navbar">
            <button class="btn btn-light d-lg-none" id="sidebar-toggle"><i class="fas fa-bars"></i></button>
            <div class="d-none d-md-block">
                <div class="input-group">
                    <span class="input-group-text bg-white border-end-0"><i class="fas fa-search text-muted"></i></span>
                    <input type="text" class="form-control border-start-0 ps-0" placeholder="Search...">
                </div>
            </div>
            <div class="d-flex align-items-center gap-3">
                <button class="btn btn-light rounded-circle"><i class="fas fa-bell"></i></button>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                        <img src="https://ui-avatars.com/api/?name=Admin+User&background=6B8F6A&color=fff" alt="Admin" class="rounded-circle me-2" width="40">
                        <span class="fw-bold d-none d-md-block">Admin User</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                        <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user me-2"></i> Profile</a></li>
                        <li><a class="dropdown-item" href="settings.html"><i class="fas fa-cog me-2"></i> Settings</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger" href="../login.html"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Page Content -->
        ${content}
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="../assets/js/admin.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(adminDir, page.file), html);
};

adminPages.forEach(generatePage);
console.log('Admin pages generated.');
