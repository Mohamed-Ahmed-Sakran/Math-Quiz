document.getElementById('signinForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Get stored user data
    const storedData = localStorage.getItem('userData');
    
    if (!storedData) {
        document.getElementById('emailError').textContent = 'No registered user found. Please register first.';
        document.getElementById('emailError').style.display = 'block';
        return;
    }
    
    const userData = JSON.parse(storedData);
    
    let isValid = true;
    
    // Validate credentials
    if (email !== userData.email) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
    
    if (password !== userData.password) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
    
    if (isValid) {
        // Store login status
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Redirect to exam page
        window.location.href = 'question.html';
    }
});

// Redirect to exam if already logged in
if (localStorage.getItem('isLoggedIn') === 'true') {
    window.location.href = 'question.html';
}