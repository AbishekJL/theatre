let selectedDate = '';
let selectedDateLabel = '';
let selectedScreen = '';
let selectedTime = '';

// Initial mappings
let dateMapping = {
    'date-1': '13-6-24',
    'date-2': '14-6-24',
    'date-3': '15-6-24',
    'date-4': '16-6-24',
    'date-5': '17-6-24',
    'date-6': '18-6-24',
    'date-7': '19-6-24'
};

let screenMapping = {
    'time-1': { screen: '1', times: ['1:05 PM', '4:00 PM', '9:00 PM'] }, // Screen 1
    'time-2': { screen: '1', times: ['3:00 PM'] }, // Screen 2
    'time-3': { screen: '3', times: ['9:05 AM', '10:00 PM'] }, // Screen 3
    'time-4': { screen: '4', times: ['9:05 AM', '11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM', '11:00 PM'] }, // Screen 4
    'time-5': { screen: '5', times: ['9:05 AM', '12:00 PM', '1:00 PM', '3:00 PM'] } // Screen 5
};

function populateDates() {
    const dateContainer = document.getElementById('date-container');
    dateContainer.innerHTML = ''; // Clear existing dates

    Object.keys(dateMapping).forEach((key, index) => {
        const dateId = key;
        const dateLabel = dateMapping[key];

        const dateDiv = document.createElement('div');
        dateDiv.classList.add('carousel-cell');
        dateDiv.id = dateId;
        dateDiv.setAttribute('onclick', `selectDate('${dateId}', '${dateLabel}')`);

        const dateNumericDiv = document.createElement('div');
        dateNumericDiv.classList.add('date-numeric');
        dateNumericDiv.textContent = dateLabel.split('-')[0];

        const dateDayDiv = document.createElement('div');
        dateDayDiv.classList.add('date-day');
        dateDayDiv.textContent = dateLabel.split('-')[1];

        dateDiv.appendChild(dateNumericDiv);
        dateDiv.appendChild(dateDayDiv);
        dateContainer.appendChild(dateDiv);
    });
}

function populateTimes(dateId) {
    const timeContainer = document.getElementById('time-container');
    timeContainer.innerHTML = ''; // Clear existing times

    const selectedDateLabel = dateMapping[dateId];
    const selectedScreenTimes = screenMapping[dateId];

    if (selectedScreenTimes && selectedScreenTimes.times) {
        selectedScreenTimes.times.forEach((time, index) => {
            const timeId = `time-${index + 1}`;
            const timeButton = document.createElement('button');
            timeButton.id = timeId;
            timeButton.classList.add('screen-time');
            timeButton.textContent = time;
            timeButton.setAttribute('onclick', `selectTime('${timeId}', '${time}')`);
            timeContainer.appendChild(timeButton);
        });
    }
}

function selectDate(dateId, dateLabel) {
    selectedDate = dateId;
    selectedDateLabel = dateLabel;

    // Highlight selected date
    const allDates = document.querySelectorAll('.carousel-cell');
    allDates.forEach(date => date.classList.remove('selected-date-orange'));
    document.getElementById(dateId).classList.add('selected-date-orange');

    populateTimes(dateId);
}

function selectTime(timeId, time) {
    selectedScreen = timeId;
    selectedTime = time;

    // Highlight selected time
    const allTimes = document.querySelectorAll('.screen-time');
    allTimes.forEach(timeButton => timeButton.classList.remove('selected-time-orange'));
    document.getElementById(timeId).classList.add('selected-time-orange');

    enableContinueButton();
}

function enableContinueButton() {
    const button = document.getElementById('screen-next-btn');
    button.disabled = !(selectedDate && selectedScreen && selectedTime);
}

function continueBooking() {
    if (selectedDate && selectedScreen && selectedTime) {
        const screenNumber = screenMapping[selectedScreen].screen;

        localStorage.setItem('selectedDate', selectedDateLabel);
        localStorage.setItem('selectedTime', selectedTime);
        localStorage.setItem('selectedScreen', screenNumber);

        window.location.href = 'seatselection.html';
    } else {
        alert('Please select both date and time to continue.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    populateDates(); // Populate initial dates
    document.getElementById('screen-next-btn').disabled = true;
});
