const fs = require('fs');
const path = require('path');

const userDir = path.join(__dirname, 'user');
if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
}

const userPages = [
    { file: 'dashboard.html', title: 'User Dashboard', icon: 'fa-home' },
    { file: 'profile.html', title: 'My Profile', icon: 'fa-user' },
    { file: 'classes.html', title: 'Yoga Classes', icon: 'fa-spa' },
    { file: 'bookings.html', title: 'My Bookings', icon: 'fa-calendar-check' },
    { file: 'attendance.html', title: 'My Attendance', icon: 'fa-clipboard-user' },
    { file: 'payments.html', title: 'Payment History', icon: 'fa-credit-card' },
    { file: 'trainers.html', title: 'Trainers', icon: 'fa-chalkboard-teacher' },
    { file: 'notifications.html', title: 'Notifications', icon: 'fa-bell' },
    { file: 'support.html', title: 'Support & Contact', icon: 'fa-headset' },
    { file: 'settings.html', title: 'Settings', icon: 'fa-cog' }
];

const generateSidebar = (activeFile) => {
    let links = '';
    userPages.forEach(page => {
        const active = page.file === activeFile ? 'active' : '';
        links += `            <a href="${page.file}" class="user-nav-link ${active}"><i class="fas ${page.icon}"></i> ${page.title}</a>\n`;
    });
    return `
    <!-- Sidebar -->
    <aside class="user-sidebar" id="sidebar">
        <a href="dashboard.html" class="brand"><i class="fas fa-leaf me-2"></i>Yogastra</a>
        <div class="nav flex-column">
${links}
            <a href="../login.html" class="user-nav-link text-danger mt-4"><i class="fas fa-sign-out-alt"></i> Logout</a>
        </div>
    </aside>
    `;
};

const generatePage = (page) => {
    let content = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="fw-bold">${page.title}</h2>
        </div>
        <div class="bg-white p-4 rounded-4 shadow-sm">
            <p class="text-muted">Content for ${page.title} goes here.</p>
            <div class="alert alert-info border-0 bg-primary bg-opacity-10 text-primary">
                <i class="fas fa-info-circle me-2"></i> This section is currently under development. Check back later!
            </div>
        </div>
    `;

    if(page.file === 'dashboard.html') {
        content = `
        <h2 class="fw-bold mb-4">Welcome back, Sarah! <i class="fas fa-hand-sparkles text-warning ms-2"></i></h2>
        <div class="row g-4 mb-4">
            <div class="col-md-3">
                <div class="bg-white p-4 rounded-4 shadow-sm border border-light h-100">
                    <h6 class="text-muted mb-3"><i class="fas fa-calendar-check me-2 text-primary"></i>Upcoming Class</h6>
                    <h5 class="fw-bold">Morning Vinyasa</h5>
                    <p class="small text-muted mb-0">Tomorrow, 8:00 AM</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="bg-white p-4 rounded-4 shadow-sm border border-light h-100">
                    <h6 class="text-muted mb-3"><i class="fas fa-clipboard-user me-2 text-success"></i>Attendance</h6>
                    <h5 class="fw-bold">92%</h5>
                    <p class="small text-muted mb-0">Great job!</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="bg-white p-4 rounded-4 shadow-sm border border-light h-100">
                    <h6 class="text-muted mb-3"><i class="fas fa-check-circle me-2 text-info"></i>Completed</h6>
                    <h5 class="fw-bold">45 Classes</h5>
                    <p class="small text-muted mb-0">Since Jan 2026</p>
                </div>
            </div>
            <div class="col-md-3">
                <div class="bg-white p-4 rounded-4 shadow-sm border border-light h-100">
                    <h6 class="text-muted mb-3"><i class="fas fa-credit-card me-2 text-warning"></i>Payment Status</h6>
                    <h5 class="fw-bold text-success">Paid</h5>
                    <p class="small text-muted mb-0">Valid till Oct 2026</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-8">
                <div class="bg-white p-4 rounded-4 shadow-sm mb-4">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h5 class="fw-bold mb-0">Recommended For You</h5>
                        <a href="classes.html" class="text-primary text-decoration-none small">View All</a>
                    </div>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <div class="course-card">
                                <div class="course-img" style="background-image: url('https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
                                <div class="course-body">
                                    <h6 class="fw-bold">Hatha Yoga Basics</h6>
                                    <p class="small text-muted mb-3"><i class="fas fa-clock me-1"></i> 60 mins • Beginner</p>
                                    <button class="btn btn-outline-primary btn-sm w-100">Book Class</button>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="course-card">
                                <div class="course-img" style="background-image: url('https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80')"></div>
                                <div class="course-body">
                                    <h6 class="fw-bold">Guided Meditation</h6>
                                    <p class="small text-muted mb-3"><i class="fas fa-clock me-1"></i> 30 mins • All Levels</p>
                                    <button class="btn btn-outline-primary btn-sm w-100">Book Class</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="bg-white p-4 rounded-4 shadow-sm">
                    <h5 class="fw-bold mb-3">Latest Notifications</h5>
                    <div class="d-flex mb-3 border-bottom pb-3">
                        <div class="bg-primary bg-opacity-10 text-primary rounded-circle p-2 me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div>
                            <h6 class="mb-1 fw-bold fs-6">Booking Confirmed</h6>
                            <p class="small text-muted mb-0">Your class for tomorrow is booked.</p>
                            <span class="small text-muted" style="font-size: 0.75rem;">2 hours ago</span>
                        </div>
                    </div>
                    <div class="d-flex mb-3">
                        <div class="bg-warning bg-opacity-10 text-warning rounded-circle p-2 me-3" style="width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                            <i class="fas fa-star"></i>
                        </div>
                        <div>
                            <h6 class="mb-1 fw-bold fs-6">New Class Added</h6>
                            <p class="small text-muted mb-0">Try out our new Power Yoga session.</p>
                            <span class="small text-muted" style="font-size: 0.75rem;">1 day ago</span>
                        </div>
                    </div>
                    <a href="notifications.html" class="btn btn-light btn-sm w-100 mt-2">View All</a>
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
    <title>${page.title} | User Panel</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/style.css">
    <link rel="stylesheet" href="../assets/css/user.css">
</head>
<body>

${generateSidebar(page.file)}

    <!-- Main Content -->
    <main class="user-main">
        <!-- Top Navbar -->
        <div class="user-navbar">
            <button class="btn btn-light d-lg-none" id="sidebar-toggle"><i class="fas fa-bars"></i></button>
            <div class="d-none d-md-block">
                <h5 class="mb-0 text-dark fw-bold">Yogastra User Portal</h5>
            </div>
            <div class="d-flex align-items-center gap-3">
                <button class="btn btn-light rounded-circle"><i class="fas fa-bell"></i></button>
                <div class="dropdown">
                    <a href="#" class="d-flex align-items-center text-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown">
                        <img src="https://ui-avatars.com/api/?name=Sarah+Smith&background=E8DCC8&color=2D2D2D" alt="User" class="rounded-circle me-2" width="40">
                        <span class="fw-bold d-none d-md-block">Sarah Smith</span>
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end shadow border-0">
                        <li><a class="dropdown-item" href="profile.html"><i class="fas fa-user me-2"></i> My Profile</a></li>
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
    <script src="../assets/js/user.js"></script>
</body>
</html>`;
    
    fs.writeFileSync(path.join(userDir, page.file), html);
};

userPages.forEach(generatePage);
console.log('User pages generated.');
