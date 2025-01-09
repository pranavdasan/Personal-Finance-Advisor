// Wait for the DOM to load before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Select the form element
    const form = document.querySelector('.expense-form');

    // Add an event listener for form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submission

        // Collect form data
        const formData = new FormData(form);
        let dataStr = '';

        // Loop through each form element and prepare data string
        formData.forEach((value, key) => {
            dataStr += `${key}: ${value}\n`;
        });

        // Create a Blob object with the form data as plain text
        const blob = new Blob([dataStr], { type: 'text/plain' });

        // Create a temporary anchor element for downloading
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'form_data.txt';  // Specify the filename for the download
        link.click();  // Trigger the download automatically

        // Optional: Display a message to the user
        alert('Form data has been saved as a text file.');
    });
});
