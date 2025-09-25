document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');

    loginForm.addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent default form submission

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const contentType = response.headers.get('content-type');
            let responseData;

            if (contentType && contentType.includes('application/json')) {
                responseData = await response.json(); // Parse JSON response
            } else {
                responseData = await response.text(); // Parse text response
            }

            
            if (response.ok) {
                console.log('Full server response:', responseData);
                
                if (responseData && responseData.user) {
                    // Save user data in localStorage
                    localStorage.setItem('user', JSON.stringify(responseData.user));
                    console.log('User data stored:', responseData.user);
                } else {
                    console.error('User object not found in response');
                }

                // Redirect to the Overview page after login
                window.location.href = 'index.html';
            } else {
                alert(`Login failed: ${responseData.message}`);
            }
        } catch (error) {
            console.error('An error occurred during login:', error.message || error);
            alert('An error occurred. Please try again.');
        }
    });

 });