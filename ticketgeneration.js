document.addEventListener('DOMContentLoaded', function() {
    // Retrieve data from localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeatNumbers'));
    const selectedDate = localStorage.getItem('selectedDate');
    const selectedTime = localStorage.getItem('selectedTime');
    const selectedScreen = localStorage.getItem('selectedScreen');
    const selectedMovie = localStorage.getItem('selectedMovie');

    // Display ticket details
    if (selectedSeats && selectedDate && selectedTime && selectedScreen && selectedMovie) {
        // Populate ticket details
        document.getElementById('movieName').textContent = selectedMovie;
        document.getElementById('screenNumber').textContent = selectedScreen;
        document.getElementById('showDate').textContent = selectedDate;
        document.getElementById('showTime').textContent = selectedTime;

        // Display selected seats
        const seatNumbers = selectedSeats.map(seat => `<td>${seat}</td>`).join('');
        document.getElementById('seatNumbers').innerHTML = `<tr>${seatNumbers}</tr>`;

        // Calculate ticket amount
        const ticketAmount = (selectedSeats.length * 10).toFixed(2); // Replace 10 with actual ticket price
        document.getElementById('ticketAmount').textContent = ticketAmount;

        // Send ticket details to the backend
        fetch('http://localhost:3000/store-booking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                showId: selectedScreen, // Assuming screen number can be mapped to showId
                seatNumbers: selectedSeats,
                ticketAmount: ticketAmount
            })
        })
        .then(response => response.text())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // Optionally clear localStorage after ticket generation
        // localStorage.removeItem('selectedSeatNumbers');
        // localStorage.removeItem('selectedDate');
        // localStorage.removeItem('selectedTime');
        // localStorage.removeItem('selectedScreen');
        // localStorage.removeItem('selectedMovie');
    } else {
        // Handle case where data is missing or not properly set
        console.error('Error: Required data not found in localStorage.');
        alert('Error: Unable to generate ticket. Please go back and make selections again.');
        window.location.href = 'index.html'; // Redirect to homepage or appropriate error page
    }
});
