let currentUser = null;

function setTheme(theme) {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    
    body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'light' ? '☀️' : '🌙';
    localStorage.setItem('theme', theme);
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
}

function showToast(text, isError = false) {
    const toastDiv = document.getElementById('toast');
    toastDiv.textContent = text;
    toastDiv.className = isError ? 'error' : 'success';
    toastDiv.style.display = 'block';
    
    // Clear any existing timeout
    if (toastDiv.timeoutId) {
        clearTimeout(toastDiv.timeoutId);
    }
    
    // Set timeout to hide toast after 5 seconds
    toastDiv.timeoutId = setTimeout(() => {
        toastDiv.style.display = 'none';
    }, 5000);
}

async function updateUI() {
    const userInfo = document.getElementById('userInfo');
    const loggedInEmail = document.getElementById('loggedInEmail');
    const emailInput = document.getElementById('email');
    const loginForm = document.getElementById('loginForm');
    const airbyteHint = document.getElementById('airbyteHint');
    
    if (currentUser) {
        userInfo.classList.add('visible');
        loggedInEmail.textContent = currentUser;
        emailInput.value = '';
        loginForm.style.display = 'none';
        airbyteHint.style.display = 'block';
    } else {
        userInfo.classList.remove('visible');
        loginForm.style.display = 'block';
        airbyteHint.style.display = 'none';
    }
}

async function handleUserAction() {
    const email = document.getElementById('email').value;
    const spinner = document.getElementById('spinner');
    const submitButton = document.querySelector('.action-btn');
    const toastDiv = document.getElementById('toast');
    
    if (!email) {
        showToast('Please enter an email address', true);
        return;
    }

    try {
        // Show spinner and disable button, hide toast
        spinner.classList.add('visible');
        submitButton.disabled = true;
        toastDiv.textContent = '';
        toastDiv.className = '';

        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            currentUser = email;
            updateUI();
            showToast(response.status === 201 ? 'User created and logged in successfully!' : 'Login successful!');
        } else {
            showToast(data.error || 'Failed to process request', true);
        }
    } catch (error) {
        showToast('An error occurred', true);
    } finally {
        // Hide spinner and enable button
        spinner.classList.remove('visible');
        submitButton.disabled = false;
    }
}

async function logout() {
    try {
        await fetch('/api/logout', { method: 'POST' });
        currentUser = null;
        updateUI();
        showToast('Logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
        showToast('Error during logout', true);
    }
} 