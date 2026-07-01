const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'admin');
if (!fs.existsSync(adminDir)) {
    fs.mkdirSync(adminDir);
}

const pages = [
    { file: 'dashboard.html', title: 'Dashboard', icon: 'fa-home', group: 'Main' },
    { file: 'members.html', title: 'Members', icon: 'fa-users', group: 'Management' },
    { file: 'trainers.html', title: 'Trainers', icon: 'fa-chalkboard-teacher', group: 'Management' },
    { file: 'classes.html', title: 'Yoga Classes', icon: 'fa-spa', group: 'Management' },
    { file: 'schedule.html', title: 'Schedule', icon: 'fa-calendar-alt', group: 'Management' },
    { file: 'bookings.html', title: 'Bookings', icon: 'fa-ticket-alt', group: 'Operations' },
    { file: 'attendance.html', title: 'Attendance', icon: 'fa-clipboard-check', group: 'Operations' },
    { file: 'payments.html', title: 'Payments', icon: 'fa-file-invoice-dollar', group: 'Operations' },
    { file: 'plans.html', title: 'Membership Plans', icon: 'fa-crown', group: 'Operations' },
    { file: 'events.html', title: 'Events', icon: 'fa-calendar-star', group: 'Content' },
    { file: 'testimonials.html', title: 'Testimonials', icon: 'fa-comments', group: 'Content' },
    { file: 'messages.html', title: 'Contact Messages', icon: 'fa-envelope', group: 'Content' },
    { file: 'blog.html', title: 'Blog Management', icon: 'fa-blog', group: 'Content' },
    { file: 'gallery.html', title: 'Gallery', icon: 'fa-images', group: 'Content' },
    { file: 'trainer-schedule.html', title: 'Trainers Schedule', icon: 'fa-clock', group: 'Reports' },
    { file: 'notifications.html', title: 'Notifications', icon: 'fa-bell', group: 'Reports' },
    { file: 'reports.html', title: 'Reports', icon: 'fa-chart-pie', group: 'Reports' },
    { file: 'settings.html', title: 'Settings', icon: 'fa-cog', group: 'System' },
    { file: 'profile.html', title: 'Profile', icon: 'fa-user', group: 'System' },
    { file: 'logs.html', title: 'Activity Logs', icon: 'fa-history', group: 'System' },
    { file: '404.html', title: '404 Error', icon: 'fa-exclamation-triangle', group: 'Misc' },
    { file: 'maintenance.html', title: 'Maintenance', icon: 'fa-tools', group: 'Misc' }
];

const generateSidebar = (activeFile) => {
    let sidebarContent = '';
    let currentGroup = '';

    pages.forEach(page => {
        if (page.group === 'Misc') return; // Hide misc from sidebar
        if (page.group !== currentGroup) {
            sidebarContent += `\n            <div class="text-uppercase text-muted small fw-bold px-3 py-2 mt-3">${page.group}</div>\n`;
            currentGroup = page.group;
        }
        const activeClass = page.file === activeFile ? 'active' : '';
        sidebarContent += `            <a href="${page.file}" class="menu-item ${activeClass}"><i class="fas ${page.icon} me-3"></i> ${page.title}</a>\n`;
    });

    return `
    <aside class="admin-sidebar" id="admin-sidebar">
        <a href="dashboard.html" class="sidebar-brand">
            <i class="fas fa-leaf me-2"></i>Yogastra Admin
        </a>
        <div class="sidebar-menu">
${sidebarContent}
        </div>
    </aside>
    `;
};

const generateHeader = (title) => {
    return `
    <header class="admin-header">
        <div class="d-flex align-items-center">
            <button class="mobile-toggle me-3" id="sidebar-toggle"><i class="fas fa-bars"></i></button>
            <div class="d-none d-md-block">
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb mb-0">
                        <li class="breadcrumb-item"><a href="dashboard.html" class="text-decoration-none text-muted">Admin</a></li>
                        <li class="breadcrumb-item active" aria-current="page">${title}</li>
                    </ol>
                </nav>
            </div>
        </div>
        <div class="d-flex align-items-center gap-3">
            <div class="header-search">
                <input type="text" class="form-control rounded-pill" placeholder="Search...">
            </div>
            <button class="action-btn" id="theme-toggle" aria-label="Toggle Theme">
                <i class="fas fa-moon"></i>
            </button>
            <button class="action-btn" id="rtl-toggle" aria-label="Toggle RTL">
                <i class="fas fa-language"></i>
            </button>
            <button class="action-btn">
                <i class="fas fa-bell"></i>
                <span class="badge-indicator"></span>
            </button>
            <div class="dropdown">
                <a href="#" class="admin-profile dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Admin">
                    <div class="d-none d-md-block">
                        <div class="fw-bold small">Kiran</div>
                        <div class="text-muted" style="font-size: 0.75rem;">Super Admin</div>
                    </div>
                </a>
                <ul class="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                    <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user fa-sm me-2 text-muted"></i> Profile</a></li>
                    <li><a class="dropdown-item" href="settings.html"><i class="fas fa-cog fa-sm me-2 text-muted"></i> Settings</a></li>
                    <li><hr class="dropdown-divider"></li>
                    <li><a class="dropdown-item text-danger" href="../pages/login.html"><i class="fas fa-sign-out-alt fa-sm me-2"></i> Logout</a></li>
                </ul>
            </div>
        </div>
    </header>
    `;
};

const getPageSpecificContent = (page) => {
    if (page.file === 'dashboard.html') {
        return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold m-0">Dashboard Overview</h2>
            <button class="btn btn-primary"><i class="fas fa-download me-2"></i> Download Report</button>
        </div>
        
        <div class="row g-4 mb-4">
            <div class="col-md-6 col-xl-3">
                <div class="admin-card">
                    <div class="stat-card">
                        <div>
                            <p class="text-muted mb-1 fw-bold">Total Members</p>
                            <h3 class="fw-bold mb-0">1,248</h3>
                            <small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 12% this month</small>
                        </div>
                        <div class="stat-icon primary"><i class="fas fa-users"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="admin-card">
                    <div class="stat-card">
                        <div>
                            <p class="text-muted mb-1 fw-bold">Monthly Revenue</p>
                            <h3 class="fw-bold mb-0">$24,500</h3>
                            <small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 8% this month</small>
                        </div>
                        <div class="stat-icon success"><i class="fas fa-dollar-sign"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="admin-card">
                    <div class="stat-card">
                        <div>
                            <p class="text-muted mb-1 fw-bold">Yoga Classes</p>
                            <h3 class="fw-bold mb-0">86</h3>
                            <small class="text-muted">Active classes this week</small>
                        </div>
                        <div class="stat-icon info"><i class="fas fa-spa"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-6 col-xl-3">
                <div class="admin-card">
                    <div class="stat-card">
                        <div>
                            <p class="text-muted mb-1 fw-bold">Attendance Rate</p>
                            <h3 class="fw-bold mb-0">92%</h3>
                            <small class="text-success fw-bold"><i class="fas fa-arrow-up"></i> 2% this week</small>
                        </div>
                        <div class="stat-icon warning"><i class="fas fa-clipboard-check"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-lg-8">
                <div class="admin-card">
                    <h5 class="fw-bold mb-4">Recent Bookings</h5>
                    <div class="table-responsive">
                        <table class="admin-table">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Class</th>
                                    <th>Date & Time</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="https://ui-avatars.com/api/?name=Michael+Doe&background=random" class="rounded-circle me-2" width="32" height="32" alt="Avatar">
                                            <span class="fw-bold">Michael Doe</span>
                                        </div>
                                    </td>
                                    <td>Vinyasa Flow</td>
                                    <td>Oct 24, 08:00 AM</td>
                                    <td><span class="status-badge status-active">Confirmed</span></td>
                                    <td>
                                        <button class="btn-icon"><i class="fas fa-eye"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="https://ui-avatars.com/api/?name=Sarah+Smith&background=random" class="rounded-circle me-2" width="32" height="32" alt="Avatar">
                                            <span class="fw-bold">Sarah Smith</span>
                                        </div>
                                    </td>
                                    <td>Hatha Yoga</td>
                                    <td>Oct 24, 10:00 AM</td>
                                    <td><span class="status-badge status-pending">Pending</span></td>
                                    <td>
                                        <button class="btn-icon"><i class="fas fa-eye"></i></button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div class="d-flex align-items-center">
                                            <img src="https://ui-avatars.com/api/?name=David+Jones&background=random" class="rounded-circle me-2" width="32" height="32" alt="Avatar">
                                            <span class="fw-bold">David Jones</span>
                                        </div>
                                    </td>
                                    <td>Meditation</td>
                                    <td>Oct 25, 06:00 PM</td>
                                    <td><span class="status-badge status-active">Confirmed</span></td>
                                    <td>
                                        <button class="btn-icon"><i class="fas fa-eye"></i></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="admin-card">
                    <h5 class="fw-bold mb-4">Class Popularity</h5>
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="fw-bold">Vinyasa Flow</span>
                            <span class="text-muted">85%</span>
                        </div>
                        <div class="css-chart-bar">
                            <div class="css-chart-progress" style="width: 85%;"></div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="fw-bold">Hatha Yoga</span>
                            <span class="text-muted">70%</span>
                        </div>
                        <div class="css-chart-bar">
                            <div class="css-chart-progress" style="width: 70%; background-color: #3498db;"></div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="fw-bold">Meditation</span>
                            <span class="text-muted">90%</span>
                        </div>
                        <div class="css-chart-bar">
                            <div class="css-chart-progress" style="width: 90%; background-color: #f1c40f;"></div>
                        </div>
                    </div>
                    <div class="mb-4">
                        <div class="d-flex justify-content-between mb-1">
                            <span class="fw-bold">Yin Yoga</span>
                            <span class="text-muted">65%</span>
                        </div>
                        <div class="css-chart-bar">
                            <div class="css-chart-progress" style="width: 65%; background-color: #e74c3c;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    if (page.file === 'members.html') {
        return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold m-0">Manage Members</h2>
            <button class="btn btn-primary"><i class="fas fa-plus me-2"></i> Add Member</button>
        </div>
        
        <div class="admin-card">
            <div class="row mb-4">
                <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Search members...">
                </div>
                <div class="col-md-3">
                    <select class="form-select">
                        <option>All Plans</option>
                        <option>Basic</option>
                        <option>Standard</option>
                        <option>Premium</option>
                    </select>
                </div>
                <div class="col-md-3">
                    <select class="form-select">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
            </div>
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Member ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Plan</th>
                            <th>Status</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-muted fw-bold">#MEM-001</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="https://ui-avatars.com/api/?name=Emma+Watson&background=random" class="rounded-circle me-2" width="32" height="32" alt="Avatar">
                                    <span class="fw-bold">Emma Watson</span>
                                </div>
                            </td>
                            <td>emma@example.com</td>
                            <td><span class="badge bg-primary">Premium</span></td>
                            <td><span class="status-badge status-active">Active</span></td>
                            <td>Jan 15, 2026</td>
                            <td>
                                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete" onclick="confirmDelete(1)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted fw-bold">#MEM-002</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="https://ui-avatars.com/api/?name=James+Bond&background=random" class="rounded-circle me-2" width="32" height="32" alt="Avatar">
                                    <span class="fw-bold">James Bond</span>
                                </div>
                            </td>
                            <td>james@example.com</td>
                            <td><span class="badge bg-secondary">Standard</span></td>
                            <td><span class="status-badge status-active">Active</span></td>
                            <td>Feb 02, 2026</td>
                            <td>
                                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete" onclick="confirmDelete(2)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted fw-bold">#MEM-003</td>
                            <td>
                                <div class="d-flex align-items-center">
                                    <img src="https://ui-avatars.com/api/?name=Lucy+Liu&background=random" class="rounded-circle me-2" width="32" height="32" alt="Avatar">
                                    <span class="fw-bold">Lucy Liu</span>
                                </div>
                            </td>
                            <td>lucy@example.com</td>
                            <td><span class="badge bg-dark">Basic</span></td>
                            <td><span class="status-badge status-inactive">Inactive</span></td>
                            <td>Mar 10, 2026</td>
                            <td>
                                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete" onclick="confirmDelete(3)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <!-- Add more rows for demo -->
                    </tbody>
                </table>
            </div>
            
            <nav aria-label="Page navigation" class="mt-4">
              <ul class="pagination justify-content-end mb-0">
                <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
        </div>
        `;
    }

    if (page.file === 'settings.html' || page.file === 'profile.html') {
        return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold m-0">${page.title}</h2>
            <button class="btn btn-primary"><i class="fas fa-save me-2"></i> Save Changes</button>
        </div>
        
        <div class="row g-4">
            <div class="col-lg-4">
                <div class="admin-card text-center text-md-start">
                    <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Profile" class="rounded-circle mb-3 border" style="width:120px; height:120px; object-fit:cover;">
                    <h5 class="fw-bold">Kiran Rani</h5>
                    <p class="text-muted mb-3">Super Admin</p>
                    <button class="btn btn-outline-primary btn-sm w-100 mb-2">Change Photo</button>
                    <button class="btn btn-outline-danger btn-sm w-100">Remove Photo</button>
                </div>
            </div>
            <div class="col-lg-8">
                <div class="admin-card">
                    <h5 class="fw-bold mb-4">Basic Information</h5>
                    <form>
                        <div class="row g-3">
                            <div class="col-md-6">
                                <label class="form-label">First Name</label>
                                <input type="text" class="form-control" value="Kiran">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Last Name</label>
                                <input type="text" class="form-control" value="Rani">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Email Address</label>
                                <input type="email" class="form-control" value="admin@yogastra.com">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Phone Number</label>
                                <input type="tel" class="form-control" value="+1 234 567 890">
                            </div>
                            <div class="col-12 mt-4">
                                <h5 class="fw-bold mb-3">Change Password</h5>
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">New Password</label>
                                <input type="password" class="form-control" placeholder="••••••••">
                            </div>
                            <div class="col-md-6">
                                <label class="form-label">Confirm Password</label>
                                <input type="password" class="form-control" placeholder="••••••••">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        `;
    }

    if (page.file === '404.html' || page.file === 'maintenance.html') {
        const errorType = page.file === '404.html' ? '404 - Page Not Found' : 'Maintenance Mode';
        const errorMsg = page.file === '404.html' ? 'The page you are looking for does not exist.' : 'We are currently updating the system. Please check back later.';
        return `
        <div class="d-flex flex-column align-items-center justify-content-center h-100 text-center" style="min-height: 60vh;">
            <i class="fas ${page.icon} text-primary mb-4" style="font-size: 5rem; opacity: 0.5;"></i>
            <h1 class="display-4 fw-bold">${errorType}</h1>
            <p class="text-muted lead mb-4">${errorMsg}</p>
            <a href="dashboard.html" class="btn btn-primary"><i class="fas fa-arrow-left me-2"></i> Back to Dashboard</a>
        </div>
        `;
    }

    // Default generic page content
    return `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold m-0">${page.title}</h2>
            <button class="btn btn-primary"><i class="fas fa-plus me-2"></i> Create New</button>
        </div>
        
        <div class="admin-card">
            <div class="d-flex justify-content-between align-items-center mb-4">
                <h5 class="m-0 fw-bold">${page.title} Data List</h5>
                <div class="d-flex gap-2">
                    <input type="text" class="form-control form-control-sm" placeholder="Search...">
                    <button class="btn btn-sm btn-outline-primary"><i class="fas fa-filter"></i></button>
                </div>
            </div>
            
            <div class="table-responsive">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title / Name</th>
                            <th>Date Added</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="text-muted fw-bold">#001</td>
                            <td class="fw-bold">Sample Record A</td>
                            <td>Oct 20, 2026</td>
                            <td><span class="status-badge status-active">Active</span></td>
                            <td>
                                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete" onclick="confirmDelete(1)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted fw-bold">#002</td>
                            <td class="fw-bold">Sample Record B</td>
                            <td>Oct 21, 2026</td>
                            <td><span class="status-badge status-pending">Draft</span></td>
                            <td>
                                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete" onclick="confirmDelete(2)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td class="text-muted fw-bold">#003</td>
                            <td class="fw-bold">Sample Record C</td>
                            <td>Oct 22, 2026</td>
                            <td><span class="status-badge status-inactive">Archived</span></td>
                            <td>
                                <button class="btn-icon"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon delete" onclick="confirmDelete(3)"><i class="fas fa-trash"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <nav aria-label="Page navigation" class="mt-4">
              <ul class="pagination justify-content-end mb-0">
                <li class="page-item disabled"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
              </ul>
            </nav>
        </div>
    `;
};

const compilePage = (page) => {
    // If it's a layout-less page (like login - though login isn't explicitly requested as an admin page, 
    // we'll apply layout to all requested 22 pages. 404 and maintenance will have the sidebar but can be used as standalone)
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Yogastra Premium Admin Panel">
    <title>${page.title} | Yogastra Admin</title>

    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
    
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    
    <!-- Custom CSS -->
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/admin.css">
</head>
<body>

    <!-- Page Loader -->
    <div class="page-loader" id="page-loader">
        <div class="spinner"></div>
    </div>

    <div class="admin-layout">
        ${generateSidebar(page.file)}

        <div class="admin-main">
            ${generateHeader(page.title)}

            <main class="admin-content">
                ${getPageSpecificContent(page)}
            </main>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    
    <!-- Admin JS -->
    <script src="../assets/js/admin.js"></script>
</body>
</html>`;
};

pages.forEach(page => {
    const filePath = path.join(adminDir, page.file);
    fs.writeFileSync(filePath, compilePage(page));
    console.log(`Generated ${page.file}`);
});

console.log('All 22 premium admin pages generated successfully!');
