let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Load reservations from local storage

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

    // Store reservations in local storage
    localStorage.setItem('reservations', JSON.stringify(reservations));

    // Display confirmation
    const confirmation = document.getElementById('confirmation');
    const confirmationDetails = document.getElementById('confirmation-details');
    
    confirmationDetails.innerHTML = `Thank you, ${name}!<br>
        Your reservation for a ${roomType} room from ${checkIn} at ${checkInTime} to ${checkOut} at ${checkOutTime} has been confirmed.<br>
        Reservation Code: <strong>${reservationCode}</strong><br>
        A confirmation email has been sent to ${email}.`;
    
    confirmation.classList.remove('hidden');

    // Reset form
    this.reset();
});
