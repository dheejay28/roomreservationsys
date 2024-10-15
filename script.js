let reservations = JSON.parse(localStorage.getItem('reservations')) || []; // Load reservations from local storage

document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const checkInTime = document.getElementById('check-in-time').value;
    const checkOut = document.getElementById('check-out').value;
    const checkOutTime = document.getElementById('check-out-time').value;
    const roomType = document.getElementById('room-type').value;

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
