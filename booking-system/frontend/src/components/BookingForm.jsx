import { useForm } from "react-hook-form";
import { useState } from "react";

function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  // State
  const [status, setStatus] = useState("");
  const [bookingId, setBookingId] = useState(null);
  const [history, setHistory] = useState([]);

  // Create booking ---
  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      setStatus(result.status);
      setBookingId(result.bookingId);
      setHistory([]); // reset history on new booking
    } catch (error) {
      alert("Booking failed");
    }
  };

  // Then the  Provider accepts
  const acceptBooking = async () => {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/accept`,
      { method: "POST" }
    );
    const result = await res.json();
    setStatus(result.status);
  };

  // when the Provider rejects
  const rejectBooking = async () => {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/reject`,
      { method: "POST" }
    );
    const result = await res.json();
    setStatus(result.status);
  };

  // when  Customer cancels
  const cancelBooking = async () => {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/cancel`,
      { method: "POST" }
    );
    const result = await res.json();
    setStatus(result.status);
  };

  //  View booking history 
  const fetchHistory = async () => {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/history`
    );
    const data = await res.json();
    setHistory(data);
  };

  //  Admin override
  const adminComplete = async () => {
    const res = await fetch(
      `http://localhost:5000/api/bookings/${bookingId}/admin`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "COMPLETED" }),
      }
    );
    const result = await res.json();
    setStatus(result.status);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Booking System</h3>

      <div>
        <label>Name</label><br />
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div>
        <label>Email</label><br />
        <input {...register("email", { required: "Email is required" })} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label>Date</label><br />
        <input type="date" {...register("date", { required: true })} />
      </div>

      <div>
        <label>Time</label><br />
        <select {...register("time", { required: true })}>
          <option value="">Select</option>
          <option value="10AM">10 AM</option>
          <option value="12PM">12 PM</option>
          <option value="2PM">2 PM</option>
        </select>
      </div>

      <br />
      <button type="submit">Create Booking</button>

      {/* STATUS */}
      {status && (
        <p><strong>Booking Status:</strong> {status}</p>
      )}

      {/* PROVIDER / CUSTOMER ACTIONS */}
      {bookingId && status === "PENDING" && (
        <>
          <button type="button" onClick={acceptBooking}>
            Accept (Provider)
          </button>
          <button type="button" onClick={rejectBooking}>
            Reject (Provider)
          </button>
          <button type="button" onClick={cancelBooking}>
            Cancel (Customer)
          </button>
        </>
      )}

      {/* ADMIN */}
      {bookingId && (
        <>
          <br /><br />
          <button type="button" onClick={adminComplete}>
            Admin: Mark Completed
          </button>
        </>
      )}

      {/* OBSERVABILITY */}
      {bookingId && (
        <>
          <br /><br />
          <button type="button" onClick={fetchHistory}>
            View Booking History
          </button>

          <ul>
            {history.map((h, i) => (
              <li key={i}>
                {h.status} at {new Date(h.time).toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      )}
    </form>
  );
}

export default BookingForm;
