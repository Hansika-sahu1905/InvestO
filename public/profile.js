document.addEventListener('DOMContentLoaded', function() {
    // Fetch user data from localStorage
    const userData = localStorage.getItem('user');
    let user;

    try {
        user = JSON.parse(userData);
    } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        user = null;
    }

    if (user) {
        // Pre-fill the profile form with user data
        document.getElementById('username').value = user.username || '';
        document.getElementById('name').value = user.name || '';
        document.getElementById('email').value = user.email || '';
        document.getElementById('date_of_birth').value = formatDate(user.date_of_birth) || ''; 

        // Calculate and display age based on DOB
        calculateAge(user.date_of_birth); 
    } else {
        // Redirect to login if no user data is found
        console.warn('No user data found in localStorage. Redirecting to login.');
        window.location.href = 'login.html';
    }
});

// Function to format date as YYYY-MM-DD
function formatDate(date) {
    if (!date) return '';
    const [year, month, day] = new Date(date).toISOString().split('T')[0].split('-');
    return `${year}-${month}-${day}`;
}

// Function to calculate and display user's age
function calculateAge(date_of_birth) {
    if (!date_of_birth) return; 

    const dobDate = new Date(date_of_birth);
    const diff = Date.now() - dobDate.getTime();
    const ageDate = new Date(diff);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    
    document.getElementById('age').value = age;
}



const logoutLink = document.getElementById('logout');
const logoutDialog = document.getElementById('logoutDialog');
const confirmLogout = document.getElementById('confirmLogout');
const cancelLogout = document.getElementById('cancelLogout');
const bodyElement = document.body;


logoutLink.addEventListener('click', function(event) {
    event.preventDefault();  
    logoutDialog.showModal();  
    bodyElement.classList.add('blur-background');  
});


confirmLogout.addEventListener('click', function() {
    bodyElement.classList.remove('blur-background');  
    localStorage.removeItem('user');  
    window.location.href = 'login.html';  
});


cancelLogout.addEventListener('click', function() {
    logoutDialog.close();  
    bodyElement.classList.remove('blur-background');  
});
