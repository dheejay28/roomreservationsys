let reservations = []; // Array to store reservation data

document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const checkIn = document.getElementById('check-in').value;
    const checkInTime = document.getElementById('check-in-time').value;
    const checkOut = document.getElementById('check-out').value;
    const checkOutTime = document.getElementById('check-out-time').value;
    const roomType = document.getElementById('room-type').value;

    // Generate a unique reservation code (e.g., a random number)
    const reservationCode = 'RES' + Math.floor(Math.random() * 10000);

    // Create a reservation object
    const reservation = {
        code: reservationCode,
        name: name,
        email: email,
        checkIn: `${checkIn} ${checkInTime}`,
        checkOut: `${checkOut} ${checkOutTime}`,
        roomType: roomType
    };

    // Add the reservation to the array
    reservations.push(reservation);

    // Display confirmation
    const confirmation = document.getElementById('confirmation');
    const confirmationDetails = document.getElementById('confirmation-details');
    
    confirmationDetails.innerHTML = `Thank you, ${name}!<br>
        Your reservation for a ${roomType} room from ${checkIn} at ${checkInTime} to ${checkOut} at ${checkOutTime} has been confirmed.<br>
        Reservation Code: <strong>${reservationCode}</strong><br>
        A confirmation email has been sent to ${email}.`;
    
    confirmation.classList.remove('hidden');

    // Update the reservation list display
    updateReservationList();

    // Reset form
    this.reset();
});

// Function to update the reservation list display
function updateReservationList() {
    const reservationList = document.getElementById('reservation-list');
    reservationList.innerHTML = ''; // Clear existing list

    // Populate the reservation list
    reservations.forEach(res => {
        const listItem = document.createElement('li');
        listItem.textContent = `Reservation Code: ${res.code}, Name: ${res.name}, Room Type: ${res.roomType}, Check-in: ${res.checkIn}, Check-out: ${res.checkOut}`;

        // Create a "Return Room" button
        const returnButton = document.createElement('button');
        returnButton.textContent = 'Return Room';
        returnButton.addEventListener('click', function() {
            returnRoom(res.code); // Call the returnRoom function with the reservation code
        });

        listItem.appendChild(returnButton);
        reservationList.appendChild(listItem);
    });
}

// Function to handle room return (cancellation)
function returnRoom(code) {
    // Filter out the reservation with the matching code
    reservations = reservations.filter(res => res.code !== code);

    // Update the reservation list display
    updateReservationList();
}

// Toggle visibility of the reservation list
document.getElementById('toggle-reservations').addEventListener('click', function() {
    const reservationList = document.getElementById('reservation-list');
    reservationList.classList.toggle('hidden'); // Toggle the hidden class
});
