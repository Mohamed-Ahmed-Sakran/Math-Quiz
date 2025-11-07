document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    let isValid = true;
    
    //validation for the first name, only letters
    //regular expression
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(firstName)) {
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('firstNameError').style.display = 'none';
    }
    
    // Validation for last name
    if (!nameRegex.test(lastName)) {
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('lastNameError').style.display = 'none';
    }
    
    // Validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }
    
    // Validate password length
    if (password.length < 8) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('passwordError').style.display = 'none';
    }
    
    // Validate password match
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('confirmPasswordError').style.display = 'none';
    }
    
    if (isValid) {
        // Store user data locally
        const userData = {
            firstName,
            lastName,
            email,
            password
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('isRegistered', 'true');
        
        // Redirect to sign in page
        window.location.href = 'signin.html';
    }
});