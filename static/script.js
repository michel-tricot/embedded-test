let currentUser = null;

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
        const loginResponse = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });
        
        if (loginResponse.ok) {
            // User exists, log them in
            const userData = await loginResponse.json();
            currentUser = email;
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