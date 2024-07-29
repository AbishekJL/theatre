const container = document.querySelector('.container');
const count = document.getElementById('count');
const amount = document.getElementById('amount');
const seats = document.querySelectorAll('.seat:not(.reserved)');
const continueBookingBtn = document.getElementById('continueBookingBtn');

// Load selected seats from local storage if available
getFromLocalStorage();
calculateTotal();

container.addEventListener('click', function(e) {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('reserved')) {
        e.target.classList.toggle('selected');
        calculateTotal();
    }
});

continueBookingBtn.addEventListener('click', function() {
    const selectedSeats = container.querySelectorAll('.seat.selected');

    if (selectedSeats.length > 0) {
        saveToLocalStorage();
        const totalAmount = parseInt(amount.innerText);
        window.location.href = `payment.html?amount=${totalAmount}`;
    } else {
        alert('Please select at least one seat.');
    }
});

function calculateTotal() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatCount = selectedSeats.length;
    const seatPrice = 200; // Rs 200 per seat

    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * seatPrice;

    // Store total amount in localStorage
    localStorage.setItem('totalAmount', amount.innerText);

    // Store selected seats in localStorage
    const selectedSeatIndices = Array.from(selectedSeats).map(seat => Array.from(seats).indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndices));
    localStorage.setItem('selectedSeatNumbers', JSON.stringify(Array.from(selectedSeats).map(seat => seat.innerText)));
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
}

function saveToLocalStorage() {
    const selectedSeats = container.querySelectorAll('.seat.selected');
    const selectedSeatIndices = Array.from(selectedSeats).map(seat => Array.from(seats).indexOf(seat));
    const selectedSeatNumbers = Array.from(selectedSeats).map(seat => seat.innerText);

    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndices));
    localStorage.setItem('selectedSeatNumbers', JSON.stringify(selectedSeatNumbers));

    // Save additional details
    localStorage.setItem('showDate', '4/13/21'); // Replace with actual show date
    localStorage.setItem('showTime', '19:30'); // Replace with actual show time
}
