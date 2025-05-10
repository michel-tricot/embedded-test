let currentUser = null;

function showMessage(text, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = isError ? 'error' : 'success';
    messageDiv.style.display = 'block';
    
    // Clear any existing timeout
    if (messageDiv.timeoutId) {
        clearTimeout(messageDiv.timeoutId);
    }
    
    // Set timeout to hide message after 5 seconds
    messageDiv.timeoutId = setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

async function updateUI() {
    const userInfo = document.getElementById('userInfo');
    const loggedInEmail = document.getElementById('loggedInEmail');
    const emailInput = document.getElementById('email');
    const loginForm = document.getElementById('loginForm');
    
    if (currentUser) {
        userInfo.classList.add('visible');
        loggedInEmail.textContent = currentUser;
        emailInput.value = '';
        loginForm.style.display = 'none';
    } else {
        userInfo.classList.remove('visible');
        loginForm.style.display = 'block';
    }
}

async function handleUserAction() {
    const email = document.getElementById('email').value;
    const spinner = document.getElementById('spinner');
    const submitButton = document.querySelector('.action-btn');
    const messageDiv = document.getElementById('message');
    
    if (!email) {
        showMessage('Please enter an email address', true);
        return;
    }

    try {
        // Show spinner and disable button, hide message
        spinner.classList.add('visible');
        submitButton.disabled = true;
        messageDiv.textContent = '';
        messageDiv.className = '';

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
            showMessage(response.status === 201 ? 'User created and logged in successfully!' : 'Login successful!');
        } else {
            showMessage(data.error || 'Failed to process request', true);
        }
    } catch (error) {
        showMessage('An error occurred', true);
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
        showMessage('Logged out successfully');
    } catch (error) {
        console.error('Error during logout:', error);
        showMessage('Error during logout', true);
    }
} 