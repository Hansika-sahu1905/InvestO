document.addEventListener('DOMContentLoaded', function() {
            
            const userData = localStorage.getItem('user');
            let user;

            try {
                user = JSON.parse(userData);
            } catch (e) {
                console.error('Error parsing user data from localStorage:', e);
                user = null;
            }

            if (!user) {
                console.warn('No user data found in localStorage. Redirecting to login.');
                window.location.href = 'login.html';
            }

            
            document.getElementById('taxForm').addEventListener('input', function() {
                calculateTax();
            });

            
            document.getElementById('saveButton').addEventListener('click', function() {
                saveTaxData();
            });
        });

        function calculateTax() {
            const annualIncome = parseFloat(document.getElementById('annual_income').value) || 0;
            const investments = parseFloat(document.getElementById('investments').value) || 0;
            
           
            const sdAmount = 50000;
            const incomeAfterSD = annualIncome - sdAmount;
            const finalIncome = incomeAfterSD - investments;
            
            
            let taxPercentage = 0;
            let taxableAmount = 0;

            if (finalIncome <= 250000) {
                taxPercentage = 0;
            } else if (finalIncome <= 500000) {
                taxPercentage = 5;
            } else if (finalIncome <= 750000) {
                taxPercentage = 10;
            } else if (finalIncome <= 1000000) {
                taxPercentage = 15;
            } else if (finalIncome <= 1250000) {
                taxPercentage = 20;
            } else if (finalIncome <= 1500000) {
                taxPercentage = 25;
            } else {
                taxPercentage = 30;
            }

            taxableAmount = finalIncome * (taxPercentage / 100);

          
            document.getElementById('sd').value = incomeAfterSD.toFixed(2); 
            document.getElementById('final_income').value = finalIncome.toFixed(2);
            document.getElementById('tax_percentage').value = `${taxPercentage}%`;
            document.getElementById('taxable_amount').value = `₹${taxableAmount.toFixed(2)}`;
        }

        function saveTaxData() {
            const annualIncome = document.getElementById('annual_income').value;
            const investmentsInsurance = document.getElementById('investments').value;
            const sdValue = document.getElementById('sd').value;
            const finalIncomeValue = document.getElementById('final_income').value;
            const taxPercentage = document.getElementById('tax_percentage').value;
            const taxableAmount = document.getElementById('taxable_amount').value;

            
            localStorage.setItem('annualIncome', annualIncome);
            localStorage.setItem('investmentsInsurance', investmentsInsurance);
            localStorage.setItem('sdValue', sdValue);
            localStorage.setItem('finalIncome', finalIncomeValue);
            localStorage.setItem('taxPercentage', taxPercentage.replace('%', ''));
            localStorage.setItem('taxableAmount', taxableAmount.replace('₹', ''));

            alert('Information saved successfully!');
        }