// Fetch data from form_data.json
fetch('form_data.json') // Ensure the correct path
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Convert to JSON format
    })
    .then(data => {
        console.log(data); // Check if the data is being logged correctly

        // Get the container where the data will be injected
        const personalInfoContainer = document.querySelector('#personal-info .data-container');
        const incomeContainer = document.querySelector('#income .data-container');
        const expensesContainer = document.querySelector('#expenses .data-container');
        const liabilitiesContainer = document.querySelector('#liabilities .data-container');
        const savingsGoalsContainer = document.querySelector('#savings-goals .data-container');

        // Insert personal information data
        insertData(personalInfoContainer, ['first-name', 'last-name', 'email', 'phone', 'dob']);

        // Insert income-related data
        insertData(incomeContainer, ['income-source', 'monthly-salary', 'additional-income']);

        // Insert expenses data
        insertData(expensesContainer, ['rent-mortgage', 'utilities-bills', 'groceries', 'transportation', 'insurance-premiums']);

        // Insert liabilities data
        insertData(liabilitiesContainer, ['outstanding-loans', 'credit-card-debt', 'mortgage-balance', 'other-liabilities']);

        // Insert savings goals data
        insertData(savingsGoalsContainer, ['retirement-goal', 'current-retirement-savings', 'emergency-fund-goal', 'current-emergency-fund']);

        // Utility function to insert data into the container
        function insertData(container, keys) {
            keys.forEach(key => {
                const div = document.createElement('div');
                div.classList.add('data-item');
                div.innerHTML = `<strong>${formatKey(key)}:</strong> ${data[key] ? data[key] : 'N/A'}`;
                container.appendChild(div);
            });
        }

        // Utility function to format keys (e.g., "first-name" becomes "First Name")
        function formatKey(key) {
            return key
                .replace(/-/g, ' ') // Replace dashes with spaces
                .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize the first letter of each word
        }
    })
    .catch(error => {
        console.error('Error fetching the JSON file:', error); // Log any errors
    });
