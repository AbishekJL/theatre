document.addEventListener('DOMContentLoaded', function() {
    const billDetailsSection = document.getElementById('bill-details');
    const paymentSection = document.getElementById('payment-section');
    const paymentForm = document.getElementById('payment-form');
    const viewTicketsSection = document.getElementById('view-tickets-section');
    
    // Retrieve the selected show details from localStorage
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTime = localStorage.getItem('selectedTime');
    const selectedScreen = localStorage.getItem('selectedScreen');
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatNumbers'));
    const selectedMovie = localStorage.getItem('selectedMovie'); // Retrieve selected movie name

    // Calculate total amount based on number of seats
    const seatPrice = 200; // Replace with actual seat price
    const totalAmount = selectedSeats.length * seatPrice;

    // Display the bill details
    document.getElementById('movieName').textContent = selectedMovie;
    document.getElementById('screenNumber').textContent = selectedScreen;
    document.getElementById('showDate').textContent = selectedDate;
    document.getElementById('showTime').textContent = selectedTime;
    document.getElementById('selected-seats').textContent = selectedSeats.join(', ');
    document.getElementById('ticket-amount').textContent = totalAmount.toFixed(2);

    // Function to show the payment form
    window.showPaymentForm = function() {
        billDetailsSection.style.display = 'none';
        paymentSection.style.display = 'block';
    };

    // Function to cancel payment
    window.cancelPayment = function() {
        window.location.href = 'index.html'; // Redirect to the home page or any other page as needed
    };

    // Function to view tickets
    window.viewTickets = function() {
        window.location.href = 'ticketgeneration.html';
    };

    // Function to handle form submission
    paymentForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const cardNumber = document.getElementById('card').value;
        const expiryDate = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        const cardHolderName = document.getElementById('name').value;
        
        // Ensure all fields are filled
        if (cardNumber && expiryDate && cvv && cardHolderName) {
            // Save payment details to the backend
            fetch('http://localhost:3000/store-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    movieName: selectedMovie,
                    screenNumber: selectedScreen,
                    showDate: selectedDate,
                    showTime: selectedTime,
                    cardNumber: cardNumber,
                    cardHolderName: cardHolderName,
                    ticketAmount: totalAmount
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to save payment details');
                }
                return response.text();
            })
            .then(data => {
                console.log('Success:', data);
                // Hide the payment form
                paymentSection.style.display = 'none';
                // Navigate to view tickets page
                viewTickets();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Error saving payment details. Please try again.');
            });
        } else {
            alert('Please fill in all the required details.');
        }
    });
});
