let currentUser = null;

// Cookie functions
function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
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

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function showMessage(text, isError = false) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = text;
    messageDiv.className = isError ? 'error' : 'success';
}

async function updateUI() {
    const userInfo = document.getElementById('userInfo');
    const loggedInEmail = document.getElementById('loggedInEmail');
    const workspaceId = document.getElementById('workspaceId');
    const emailInput = document.getElementById('email');
    
    if (currentUser) {
        userInfo.classList.add('visible');
        loggedInEmail.textContent = currentUser;
        emailInput.value = '';

        // Fetch and display workspace ID
        try {
            const response = await fetch(`/api/users/${encodeURIComponent(currentUser)}`);
            if (response.ok) {
                const userData = await response.json();
                workspaceId.textContent = userData.airbyte_workspace_id;
            }
        } catch (error) {
            console.error('Error fetching workspace ID:', error);
            workspaceId.textContent = 'Error loading workspace ID';
        }
    } else {
        userInfo.classList.remove('visible');
        workspaceId.textContent = '';
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

        // First try to login
        const loginResponse = await fetch(`/api/users/${encodeURIComponent(email)}`);
        
        if (loginResponse.ok) {
            // User exists, log them in
            currentUser = email;
            setCookie('userEmail', email, 7);
            updateUI();
            showMessage('Login successful!');
        } else {
            // User doesn't exist, create them
            const createResponse = await fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await createResponse.json();

            if (createResponse.ok) {
                currentUser = email;
                setCookie('userEmail', email, 7);
                updateUI();
                showMessage('User created and logged in successfully!');
            } else {
                showMessage(data.error || 'Failed to create user', true);
            }
        }
    } catch (error) {
        showMessage('An error occurred', true);
    } finally {
        // Hide spinner and enable button
        spinner.classList.remove('visible');
        submitButton.disabled = false;
    }
}

function logout() {
    currentUser = null;
    eraseCookie('userEmail');
    updateUI();
    showMessage('Logged out successfully');
} 