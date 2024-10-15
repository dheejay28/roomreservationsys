let rooms = JSON.parse(localStorage.getItem('rooms')) || []; // Load rooms from local storage
let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Load reservations from local storage

// Show or hide the add room button based on admin status
function checkAdminStatus() {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') {
        document.getElementById('add-room-button').classList.remove('hidden');
    }
}

// Show or hide the add room form
function toggleAddRoomForm() {
    const form = document.getElementById('add-room-form');
    form.classList.toggle('hidden');
}

// Add room to local storage
document.getElementById('add-room-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const roomTypeInput = document.getElementById('room-type-input').value;

    // Check if the room type already exists
    if (!rooms.includes(roomTypeInput)) {
        rooms.push(roomTypeInput); // Add the room type to the array
        localStorage.setItem('rooms', JSON.stringify(rooms)); // Store in local storage

        // Update room select dropdown
        const roomSelect = document.getElementById('room-select');
        const option = document.createElement('option');
        option.value = roomTypeInput;
        option.textContent = roomTypeInput;
        roomSelect.appendChild(option);

        alert(`Room type "${roomTypeInput}" added successfully!`);
    } else {
        alert('This room type already exists.');
    }

    this.reset();
});

// Populate room select dropdown on page load
function populateRoomSelect() {
    const roomSelect = document.getElementById('room-select');
    rooms.forEach(roomType => {
        const option = document.createElement('option');
        option.value = roomType;
        option.textContent = roomType;
        roomSelect.appendChild(option);
    });
}

// Reservation form submission
document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const checkInTime = document.getElementById('check-in-time').value;
    const checkOut = document.getElementById('check-out').value;
    const checkOutTime = document.getElementById('check-out-time').value;
    const roomType = document.getElementById('room-select').value;

    // Generate a unique reservation code (e.g., a random number)
    const reservationCode = 'RES' + Math.floor(Math.random() * 10000);

    // Create a date object for check-in and check-out
    const checkInDateTime = new Date(`${checkOut} ${checkInTime}`);
    const checkOutDateTime = new Date(`${checkOut} ${checkOutTime}`);

    // Check for overlapping reservations
    const isAvailable = reservations.every(res => {
        const existingCheckInDateTime = new Date(res.checkIn);
        const existingCheckOutDateTime = new Date(res.checkOut);
        return (
            checkInDateTime >= existingCheckOutDateTime || 
            checkOutDateTime <= existingCheckInDateTime
        );
    });

    if (!isAvailable) {
        alert('The room is not available at this time. Please choose another time.');
        return; // Stop the reservation process
    }

    // Create a reservation object
    const reservation = {
        code: reservationCode,
        name: name,
        email: email,
        checkIn: `${checkOut} ${checkInTime}`, // Store combined check-in information
        checkOut: `${checkOut} ${checkOutTime}`, // Store combined check-out information
        roomType: roomType
    };

    // Add the reservation to the array
    reservations.push(reservation);

    // Store reservations in local storage
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Display confirmation
    const confirmation = document.getElementById('confirmation');
    const confirmationDetails = document.getElementById('confirmation-details');
    
    confirmationDetails.innerHTML = `Thank you, ${name}!<br>
        Your reservation for a ${roomType} room from ${checkOut} at ${checkInTime} to ${checkOut} at ${checkOutTime} has been confirmed.<br>
        Reservation Code: <strong>${reservationCode}</strong><br>
        A confirmation email has been sent to ${email}.`;
    
    confirmation.classList.remove('hidden');

    // Reset form
    this.reset();
});

// Populate room select dropdown on page load
window.onload = function() {
    populateRoomSelect(); // Populate available rooms
    checkAdminStatus(); // Check if the user is an admin
};
