const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Abishek@3204',
    database: 'movie_booking'
});

// Connect to MySQL
db.connect(err => {
    if (err) {
        console.error('MySQL connection error:', err);
        process.exit(1); // Exit the process if connection fails
    }
    console.log('MySQL connected...');
});

// Route to store show details
app.post('/store-show', (req, res) => {
    const show = req.body;
    const query = 'INSERT INTO shows (movie_name, screen_number, show_date, show_time) VALUES (?, ?, ?, ?)';
    db.query(query, [show.movieName, show.screenNumber, show.showDate, show.showTime], (err, result) => {
        if (err) {
            console.error('Error saving show details:', err);
            return res.status(500).send('Error saving show details');
        }
        res.status(200).send('Show details saved');
    });
});

// Route to store booking details
app.post('/store-booking', (req, res) => {
    const booking = req.body;
    try {
        const query = 'INSERT INTO bookings (show_id, seat_numbers, ticket_amount) VALUES (?, ?, ?)';
        db.query(query, [booking.showId, JSON.stringify(booking.seatNumbers), booking.ticketAmount], (err, result) => {
            if (err) {
                console.error('Error saving booking details:', err);
                return res.status(500).send('Error saving booking details');
            }
            res.status(200).send('Booking details saved');
        });
    } catch (err) {
        console.error('Error parsing JSON:', err);
        res.status(400).send('Invalid data format');
    }
});

// Route to store payment details
app.post('/store-payment', (req, res) => {
    const payment = req.body;
    const query = 'INSERT INTO payments (show_id, card_number, card_holder_name, ticket_amount) VALUES (?, ?, ?, ?)';
    db.query(query, [payment.showId, payment.cardNumber, payment.cardHolderName, payment.ticketAmount], (err, result) => {
        if (err) {
            console.error('Error saving payment details:', err);
            return res.status(500).send('Error saving payment details');
        }
        res.status(200).send('Payment details saved');
    });
});

// Route to fetch all shows
app.get('/get-shows', (req, res) => {
    const query = 'SELECT * FROM shows';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching shows:', err);
            return res.status(500).send('Error fetching shows');
        }
        res.json(results);
    });
});

// Route to fetch all bookings
app.get('/get-bookings', (req, res) => {
    const query = 'SELECT * FROM bookings';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching bookings:', err);
            return res.status(500).send('Error fetching bookings');
        }
        res.json(results);
    });
});

// Route to fetch all payments
app.get('/get-payments', (req, res) => {
    const query = 'SELECT * FROM payments';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching payments:', err);
            return res.status(500).send('Error fetching payments');
        }
        res.json(results);
    });
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
