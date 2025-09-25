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
    } else {
        // Display age
        const age = calculateAge(user.date_of_birth);
        document.getElementById('user-age').textContent = age;

        // Display taxable amount
        const taxableAmount = getTaxableAmount();
        document.getElementById('taxable-amount').value = taxableAmount.toFixed(2); // Set the taxable amount

        // Show investment options based on age and tax percentage
        showInvestmentOptions(age, getTaxPercentage());
    }
});

// Keep the existing functions below this point (calculateAge, getTaxPercentage, getTaxableAmount, etc.)


function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
function getTaxPercentage() {
    // Fetch taxPercentage from localStorage and remove the '%' symbol if present
    let taxPercentage = localStorage.getItem('taxPercentage');
    
    // Convert it to an integer after removing the percentage symbol
    taxPercentage = parseInt(taxPercentage.replace('%', ''), 10);

    if (isNaN(taxPercentage) || taxPercentage < 0 || taxPercentage > 30) {
        console.error('Invalid tax percentage in localStorage. Defaulting to 0%.');
        return 0; // Default value if the value in localStorage is invalid
    }

    return taxPercentage;
}

function getTaxableAmount() {
    // Fetch taxableAmount from localStorage and remove the '₹' symbol if present
    let taxableAmount = localStorage.getItem('taxableAmount');

    // Convert it to a float after removing the currency symbol
    taxableAmount = parseFloat(taxableAmount.replace('₹', ''));

    if (isNaN(taxableAmount)) {
        console.error('Invalid taxable amount in localStorage. Defaulting to 0.');
        return 0; // Default value if the value in localStorage is invalid
    }

    return taxableAmount;
}

function getOptionsForUpTo60(taxPercentage) {
    switch (taxPercentage) {
        case 5:
            return [
                { name: 'Public Provident Fund', percentage: '10-20%', priority: 1 },
                { name: 'Employee Provident Fund', percentage: '5-10%', priority: 2 },
                { name: 'Eduguard Plan', percentage: '10-20%', priority: 3 },
                { name: 'Life Insurance Premiums', percentage: '10-20%', priority: 4 },
                { name: 'Leave Travel Allowance', percentage: '10-20%', priority: 5 },
            ];
        case 10:
            return [
                { name: 'Fixed Deposit', percentage: '10-20%', priority: 1 },
                { name: 'Family Health Insurance', percentage: '5-10%', priority: 2 },
                { name: 'Leave Travel Allowance', percentage: '10-20%', priority: 3 },
                { name: 'Eduguard Plan', percentage: '10-20%', priority: 4 },
                { name: 'Life Insurance Premiums', percentage: '10-20%', priority: 5 },
            ];
        case 15:
            return [
                { name: 'Voluntary Provident Fund', percentage: '10-20%', priority: 1 },
                { name: 'Unit Linked Insurance Plan', percentage: '10-20%', priority: 2 },
                { name: 'Eduguard Plans', percentage: '5-10%', priority: 3 },
                { name: 'Family Health Insurance', percentage: '5-10%', priority: 4 },
                { name: 'Leave Travel Allowance', percentage: '10-20%', priority: 5 },
            ];
        case 20:
            return [
                { name: 'Fixed Deposit', percentage: '10-20%', priority: 1 },
                { name: 'Life Insurance Premiums', percentage: '10-20%', priority: 2 },
                { name: 'Public Provident Fund', percentage: '10-20%', priority: 3 },
                { name: 'Employee Provident Fund', percentage: '5-10%', priority: 4 },
                { name: 'Real Estate', percentage: '5%', priority: 5 }, 
            ];
        case 25:
            return [
                { name: 'Emergency Funds - Bonds', percentage: '10-20%', priority: 1 },
                { name: 'Equity Linked Saving Scheme', percentage: '10-20%', priority: 2 },
                { name: 'Unit Linked Insurance Plan', percentage: '10-20%', priority: 3 },
                { name: 'National Pension Scheme', percentage: '5-10%', priority: 4 },
                { name: 'Gold Bonds', percentage: '10-20%', priority: 5 },
            ];
        case 30:
            return [
                { name: 'Real Estate', percentage: '5%', priority: 1 }, 
                { name: 'Equity Linked Saving Scheme', percentage: '10-20%', priority: 2 },
                { name: 'Health Insurance Premiums', percentage: '5-10%', priority: 3 },
                { name: 'Gold Bonds', percentage: '10-20%', priority: 4 },
                { name: 'Voluntary Provident Fund', percentage: '10-20%', priority: 5 },
            ];
        default:
            return [];
    }
}


function getOptionsFor60to80() {
    return [
        { name: 'Senior Citizen Saving Scheme', percentage: '15%', priority: 1 },
        { name: 'Fixed Deposit', percentage: '10%', priority: 2 },
        { name: 'Health Insurance Premiums', percentage: '5-10%', priority: 3 },
        { name: 'Gold Bonds', percentage: '10%', priority: 4 },
        { name: 'Post Office MIS or PMVVY', percentage: '5%', priority: 5 },
    ];
}

function showInvestmentOptions(age, taxPercentage) {
    let options;
    if (age <= 60) {
        options = getOptionsForUpTo60(taxPercentage);
    } else {
        options = getOptionsFor60to80();
    }

    const taxableAmount = parseFloat(localStorage.getItem('taxableAmount')) || 0;
    renderInvestmentOptions(options, taxableAmount);
}

function renderInvestmentOptions(options, taxableAmount) {
    const container = document.getElementById('investment-container');
    container.innerHTML = ''; 

    const initialTotal = taxableAmount;
    const sliderValues = {};

    options.forEach(option => {
        const div = document.createElement('div');
        div.className = 'investment-option';

        const [minPercent, maxPercent] = option.percentage.split('-').map(p => parseFloat(p) || 0);
        const initialValue = (minPercent + maxPercent) / 2;

        sliderValues[option.name] = taxableAmount * (initialValue / 100);

        div.innerHTML = `
            <label for="${option.name}-slider">${option.name} (${option.percentage}):</label>
            <input type="range" id="${option.name}-slider" class="slider" min="0" max="${taxableAmount}" value="${sliderValues[option.name]}" step="1000">
            <input type="text" id="${option.name}-value" class="value" value="${sliderValues[option.name].toFixed(2)}" readonly>
        `;

        container.appendChild(div);

        document.getElementById(`${option.name}-slider`).addEventListener('input', function() {
            sliderValues[option.name] = parseFloat(this.value);
            updateSliders(sliderValues, taxableAmount, options);
        });
    });
}

function updateSliders(sliderValues, totalAmount, options) {
    let totalSliderValue = 0;
    Object.values(sliderValues).forEach(value => totalSliderValue += value);

    const remainingAmount = totalAmount - totalSliderValue;

    if (remainingAmount < 0) {
        const priorities = options.sort((a, b) => a.priority - b.priority);
        for (let option of priorities) {
            if (sliderValues[option.name] + remainingAmount > 0) {
                sliderValues[option.name] += remainingAmount;
                break;
            } else {
                remainingAmount += sliderValues[option.name];
                sliderValues[option.name] = 0;
            }
        }
    }

    options.forEach(option => {
        document.getElementById(`${option.name}-slider`).value = sliderValues[option.name];
        document.getElementById(`${option.name}-value`).value = sliderValues[option.name].toFixed(2);
    });
}
