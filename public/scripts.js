document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded event fired');
    
    // Fetch user data from localStorage
    const userData = localStorage.getItem('user');
    let user;

    try {
        user = JSON.parse(userData);
        console.log('Parsed user data:', user);

        const protectedPages = ["/dashboard.html", "/index.html"]; 
        if (!user && protectedPages.includes(window.location.pathname)) {
            console.log("No user found, redirecting to login...");
            window.location.href = 'login.html';
        }

        if (user) {
            // Pre-fill the profile form with user data
            document.getElementById('username').value = user.username || '';
            document.getElementById('name').value = user.name || '';
            document.getElementById('email').value = user.email || '';

            // Date formatting
            const dob = new Date(user.date_of_birth);
            console.log('Original date of birth:', user.date_of_birth);
            const dobFormatted = dob.toISOString().split('T')[0];
            console.log('Formatted date of birth:', dobFormatted);
            document.getElementById('dob').value = dobFormatted || '';

            // Calculate and display age
            calculateAge(user.date_of_birth);
        } else {
            console.log('No user data found');
            window.location.href = 'login.html';
        }
    } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
    }
});

function calculateAge(dobString) {
    if (!dobString) return;

    const dob = new Date(dobString);
    console.log('Date of birth object:', dob);

    const diff = Date.now() - dob.getTime();
    const ageDate = new Date(diff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    console.log('Calculated age:', age);

    document.getElementById("age").value = age;
}

// Handle form submission
document.getElementById('create-account-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const username = document.getElementById('username').value;
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date_of_birth = document.getElementById('dob').value;
    const password = document.getElementById('password').value;

    // Send form data to the server
    fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, name, email, date_of_birth, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'User registered successfully') {
            window.location.href = 'account_created.html';
        } else {
            console.error('Registration failed:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
});
