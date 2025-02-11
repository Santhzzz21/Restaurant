import React, { useState } from "react";
import "./App.css";

const App = () => {
  const totalSeats = 20;
  const [seatsLeft, setSeatsLeft] = useState(totalSeats);
  const [reservations, setReservations] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [guestCount, setGuestCount] = useState(1);

  const handleReservationSubmit = (e) => {
    e.preventDefault();

    // Check for duplicate names
    if (reservations.some((reservation) => reservation.name === name)) {
      alert("This name has already been used for a reservation.");
      return;
    }

    // Check if enough seats are available
    if (guestCount > seatsLeft) {
      alert("Not enough seats available.");
      return;
    }

    const newReservation = {
      name,
      phone,
      guestCount,
      checkInTime: new Date().toLocaleTimeString(),
      checkOutTime: null,
    };

    setReservations([...reservations, newReservation]);
    setSeatsLeft(seatsLeft - guestCount);
    setName("");
    setPhone("");
    setGuestCount(1);
  };

  const handleCheckout = (index) => {
    const updatedReservations = [...reservations];
    updatedReservations[index].checkOutTime = new Date().toLocaleTimeString();
    setReservations(updatedReservations);
    setSeatsLeft(seatsLeft + updatedReservations[index].guestCount);
  };

  const handleDelete = (index) => {
    const updatedReservations = [...reservations];
    const guestCountToRelease = updatedReservations[index].guestCount;

    if (updatedReservations[index].checkOutTime) {
      setSeatsLeft(seatsLeft + guestCountToRelease);
    }

    updatedReservations.splice(index, 1);
    setReservations(updatedReservations);
  };

  return (
    <div className="container">
      <h1>Restaurant Reservation System</h1>

      <div className="form-container">
        <form onSubmit={handleReservationSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Guest Count"
            value={guestCount}
            onChange={(e) => setGuestCount(Number(e.target.value))}
            min="1"
            max={seatsLeft}
            required
          />
          <button type="submit">Book Table</button>
        </form>
        <p>Seats Left: {seatsLeft}</p>
      </div>

      <div className="reservations">
        <h2>Reservations</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Check-In Time</th>
              <th>Checkout</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.name}</td>
                <td>{reservation.phone}</td>
                <td>{reservation.checkInTime}</td>
                <td>
                  {reservation.checkOutTime ? (
                    reservation.checkOutTime
                  ) : (
                    <button onClick={() => handleCheckout(index)}>
                      Click to Checkout
                    </button>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
