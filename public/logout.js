

document.addEventListener('DOMContentLoaded', function() {
   
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
});
