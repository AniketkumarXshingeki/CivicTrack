// CivicTrack JavaScript

// Global variables
let currentUser = null;
let issues = [
    {
        id: 1,
        title: "Streetlight not working",
        description: "Street light not working since last 2 days",
        category: "Infrastructure",
        status: "Reported",
        location: "via bridge ahmedabad-gujarat",
        distance: "2.8 km",
        reportedBy: "Anonymous",
        reportedAt: "Jun 02, 2025 - 10:34 AM",
        image: "streetlight.jpg"
    },
    {
        id: 2,
        title: "Pothole on main road",
        description: "Big pothole created a big road obstruction. It should be filled with cement and sand",
        category: "Roads",
        status: "In Progress",
        location: "CG road, ahmedabad-gujarat",
        distance: "1.1 km",
        reportedBy: "Anonymous",
        reportedAt: "Jun 02, 2025 - 10:34 AM",
        image: "pothole.jpg"
    },
    {
        id: 3,
        title: "Garbage not collected",
        description: "Garbage is not collected since last week and very difficult to leave here",
        category: "Sanitation",
        status: "Reported",
        location: "SV society, ahmedabad-gujarat",
        distance: "1.7 km",
        reportedBy: "Anonymous",
        reportedAt: "Jun 02, 2025 - 10:34 AM",
        image: "garbage.jpg"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if user is logged in
    checkUserSession();
    
    // Setup event listeners
    setupEventListeners();
    
    // Load page-specific functionality
    loadPageFunctionality();
}

function checkUserSession() {
    // Simulate checking user session
    const savedUser = getCookie('civictrack_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    }
}

function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Registration form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegistration);
    }
    
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-input');
    searchInputs.forEach(input => {
        input.addEventListener('input', handleSearch);
    });
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilter);
    });
    
    // Issue card clicks
    const issueCards = document.querySelectorAll('.issue-card');
    issueCards.forEach(card => {
        card.addEventListener('click', handleIssueClick);
    });
    
    // Pagination
    const pageNumbers = document.querySelectorAll('.page-number');
    pageNumbers.forEach(page => {
        page.addEventListener('click', handlePagination);
    });
}

function loadPageFunctionality() {
    const currentPage = getCurrentPage();
    
    switch(currentPage) {
        case 'home':
            loadHomePageData();
            break;
        case 'login':
            setupLoginPage();
            break;
        case 'register':
            setupRegisterPage();
            break;
        case 'dashboard':
            loadDashboardData();
            break;
        case 'issue-detail':
            loadIssueDetail();
            break;
    }
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('login')) return 'login';
    if (path.includes('register')) return 'register';
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('issue-detail')) return 'issue-detail';
    return 'home';
}

// Login functionality
function handleLogin(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    
    // Simulate login validation
    if (username && password) {
        // Create user session
        currentUser = {
            id: generateId(),
            username: username,
            email: username + '@example.com',
            loginTime: new Date().toISOString()
        };
        
        // Save user session
        setCookie('civictrack_user', JSON.stringify(currentUser), 7);
        
        // Show success message
        showNotification('Login successful!', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showNotification('Please fill in all fields', 'error');
    }
}

// Registration functionality
function handleRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const phone = formData.get('phone');
    const password = formData.get('password');
    
    // Validate form data
    if (!username || !email || !phone || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate registration
    const newUser = {
        id: generateId(),
        username: username,
        email: email,
        phone: phone,
        registrationDate: new Date().toISOString()
    };
    
    // Save user data (in real app, this would be sent to server)
    setCookie('civictrack_user', JSON.stringify(newUser), 7);
    currentUser = newUser;
    
    showNotification('Registration successful!', 'success');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 1000);
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const issueCards = document.querySelectorAll('.issue-card');
    
    issueCards.forEach(card => {
        const title = card.querySelector('.issue-details h4').textContent.toLowerCase();
        const description = card.querySelector('.issue-details p').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Filter functionality
function handleFilter(event) {
    const filterType = event.target.className;
    const filterValue = event.target.value;
    
    console.log(`Filtering by ${filterType}: ${filterValue}`);
    // Implement filtering logic based on category, status, or distance
    applyFilters();
}

function applyFilters() {
    const categoryFilter = document.querySelector('.filter-select:nth-child(1)').value;
    const statusFilter = document.querySelector('.filter-select:nth-child(2)').value;
    const distanceFilter = document.querySelector('.filter-select:nth-child(3)').value;
    
    // Filter issues based on selected criteria
    // This is a simplified implementation
    console.log('Applying filters:', { categoryFilter, statusFilter, distanceFilter });
}

// Issue card click functionality
function handleIssueClick(event) {
    const issueCard = event.currentTarget;
    const issueTitle = issueCard.querySelector('.issue-details h4').textContent;
    
    // In a real application, you would pass the issue ID
    console.log('Opening issue:', issueTitle);
    
    // Simulate navigation to issue detail page
    if (confirm('Open issue details?')) {
        window.location.href = 'issue-detail.html?id=' + encodeURIComponent(issueTitle);
    }
}

// Pagination functionality
function handlePagination(event) {
    const pageNumber = event.target.textContent;
    
    // Remove active class from all page numbers
    document.querySelectorAll('.page-number').forEach(page => {
        page.classList.remove('active');
    });
    
    // Add active class to clicked page
    event.target.classList.add('active');
    
    console.log('Loading page:', pageNumber);
    // Implement pagination logic here
}

// Load home page data
function loadHomePageData() {
    console.log('Loading home page data...');
    // In a real app, this would fetch data from an API
}

// Setup login page
function setupLoginPage() {
    console.log('Setting up login page...');
    // Add any login-specific functionality
}

// Setup register page
function setupRegisterPage() {
    console.log('Setting up register page...');
    // Add any registration-specific functionality
}

// Load dashboard data
function loadDashboardData() {
    console.log('Loading dashboard data...');
    // Load user-specific issues and data
    if (currentUser) {
        updateUIForLoggedInUser();
    }
}

// Load issue detail
function loadIssueDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const issueId = urlParams.get('id');
    
    console.log('Loading issue detail for:', issueId);
    // Load specific issue details
}

// Update UI for logged in user
function updateUIForLoggedInUser() {
    const userTitles = document.querySelectorAll('.user-title');
    userTitles.forEach(title => {
        if (currentUser) {
            title.textContent = currentUser.username;
        }
    });
    
    // Show user-specific menu items
    const loginBtns = document.querySelectorAll('.login-btn');
    loginBtns.forEach(btn => {
        btn.textContent = 'Logout';
        btn.onclick = logout;
    });
}

// Logout functionality
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        deleteCookie('civictrack_user');
        window.location.href = 'index.html';
    }
}

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '5px',
        color: 'white',
        fontWeight: 'bold',
        zIndex: '1000',
        backgroundColor: type === 'success' ? '#10b981' : '#dc2626'
    });
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Issue management functions
function reportNewIssue() {
    // This would open a modal or navigate to a new issue form
    alert('Report New Issue functionality would be implemented here');
}

function viewMyIssues() {
    // Filter and show only current user's issues
    alert('My Issues functionality would be implemented here');
}

// Animation and interaction enhancements
function addHoverEffects() {
    const cards = document.querySelectorAll('.issue-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0,0,0,0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

// Initialize hover effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addHoverEffects, 100);
});

// Add smooth scrolling for internal links
document.addEventListener('click', function(e) {
    if (e.target.tagName === 'A' && e.target.getAttribute('href').startsWith('#')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Form validation helpers
function validateForm(formElement) {
    const inputs = formElement.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            input.style.borderColor = '#6b7280';
        }
    });
    
    return isValid;
}

// Real-time form validation
document.addEventListener('input', function(e) {
    if (e.target.tagName === 'INPUT') {
        if (e.target.value.trim()) {
            e.target.style.borderColor = '#10b981';
        } else {
            e.target.style.borderColor = '#6b7280';
        }
    }
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.classList.contains('issue-card')) {
        e.target.click();
    }
});

// Console log for debugging
console.log('CivicTrack JavaScript loaded successfully!');