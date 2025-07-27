document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.querySelector('.password-toggle');
    const usernameError = document.getElementById('username-error');
    const passwordError = document.getElementById('password-error');

    // --- Password Visibility Toggle ---
    if (passwordToggle) {
        passwordToggle.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);

            // Toggle eye icon
            passwordToggle.querySelector('i').classList.toggle('fa-eye');
            passwordToggle.querySelector('i').classList.toggle('fa-eye-slash');

            // Update aria-label for accessibility
            const newLabel = type === 'password' ? 'Show password' : 'Hide password';
            passwordToggle.setAttribute('aria-label', newLabel);
        });

        // Handle keyboard interaction for password toggle
        passwordToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Prevent default scroll/space behavior
                passwordToggle.click(); // Trigger click event
            }
        });
    }

    // --- Input Validation Functions ---
    const validateUsername = () => {
        const username = usernameInput.value.trim();
        if (username.length === 0) {
            usernameError.textContent = 'Username or email cannot be empty.';
            usernameInput.classList.add('invalid');
            usernameInput.classList.remove('valid');
            return false;
        } else if (username.length < 3) {
            usernameError.textContent = 'Username or email must be at least 3 characters.';
            usernameInput.classList.add('invalid');
            usernameInput.classList.remove('valid');
            return false;
        }
        // Basic email format check if it contains '@'
        if (username.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(username)) {
            usernameError.textContent = 'Please enter a valid email address.';
            usernameInput.classList.add('invalid');
            usernameInput.classList.remove('valid');
            return false;
        }
        usernameError.textContent = ''; // Clear error
        usernameInput.classList.remove('invalid');
        usernameInput.classList.add('valid');
        return true;
    };

    const validatePassword = () => {
        const password = passwordInput.value;
        if (password.length === 0) {
            passwordError.textContent = 'Password cannot be empty.';
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            return false;
        } else if (password.length < 6) {
            passwordError.textContent = 'Password must be at least 6 characters.';
            passwordInput.classList.add('invalid');
            passwordInput.classList.remove('valid');
            return false;
        }
        passwordError.textContent = ''; // Clear error
        passwordInput.classList.remove('invalid');
        passwordInput.classList.add('valid');
        return true;
    };

    // --- Real-time Validation on Input ---
    usernameInput.addEventListener('input', validateUsername);
    passwordInput.addEventListener('input', validatePassword);

    // --- Form Submission Handler ---
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            const isUsernameValid = validateUsername();
            const isPasswordValid = validatePassword();

            if (isUsernameValid && isPasswordValid) {
                // Simulate a login request
                const username = usernameInput.value.trim();
                const password = passwordInput.value;
                const rememberMe = document.getElementById('rememberMe').checked;

                console.log('Attempting login with:', { username, password: '***', rememberMe });

                // In a real application, you would send this data to a server
                // Example: fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })
                // .then(response => response.json())
                // .then(data => {
                //     if (data.success) {
                //         alert('Login Successful!');
                //         window.location.href = '/dashboard'; // Redirect to a dashboard or home page
                //     } else {
                //         alert('Login failed: ' + data.message); // Show error from server
                //     }
                // })
                // .catch(error => {
                //     console.error('Login error:', error);
                //     alert('An error occurred during login. Please try again.');
                // });

                // For this demo, simulate success after a delay
                const loginButton = loginForm.querySelector('.login-btn');
                const originalButtonText = loginButton.textContent;
                loginButton.textContent = 'Logging in...';
                loginButton.disabled = true;

                setTimeout(() => {
                    alert('Demo Login Successful! Redirecting...');
                    // In a real app, this would be a server redirect or client-side routing
                    window.location.href = 'index.html'; // Redirect to your main Kenzeuz Trends page
                }, 1500);

            } else {
                // If validation fails, scroll to the first invalid field
                if (!isUsernameValid) {
                    usernameInput.focus();
                } else if (!isPasswordValid) {
                    passwordInput.focus();
                }
                alert('Please correct the errors in the form.');
            }
        });
    }
});
