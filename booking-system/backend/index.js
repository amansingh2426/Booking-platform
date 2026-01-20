const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// In-memory storage (sufficient for assignment)
let bookings = [];

// Health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

/**
 * 1️⃣ Create booking → PENDING
 */
app.post("/api/bookings", (req, res) => {
  const booking = {
    id: Date.now(),
    name: req.body.name,
    email: req.body.email,
    date: req.body.date,
    time: req.body.time,
    status: "PENDING",
    provider: null,
    history: [
      { status: "PENDING", time: new Date() }
    ]
  };

  bookings.push(booking);

  console.log("New booking:", booking);

  res.json({
    message: "Booking created",
    bookingId: booking.id,
    status: booking.status
  });
});

/**
 * 2️⃣ Provider accepts → ASSIGNED
 */
app.post("/api/bookings/:id/accept", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "ASSIGNED";
  booking.provider = "Provider A";
  booking.history.push({ status: "ASSIGNED", time: new Date() });

  res.json({ status: booking.status });
});

/**
 * 3️⃣ Provider rejects → REJECTED
 */
app.post("/api/bookings/:id/reject", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "REJECTED";
  booking.history.push({ status: "REJECTED", time: new Date() });

  res.json({ status: booking.status });
});

/**
 * 4️⃣ Customer cancels → CANCELLED
 */
app.post("/api/bookings/:id/cancel", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  booking.status = "CANCELLED";
  booking.history.push({ status: "CANCELLED", time: new Date() });

  res.json({ status: booking.status });
});

/**
 * 5️⃣ Admin override → any state
 */
app.post("/api/bookings/:id/admin", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  const { status } = req.body;
  booking.status = status;
  booking.history.push({ status, time: new Date() });

  res.json({ status: booking.status });
});

/**
 * 6️⃣ Booking history (observability)
 */
app.get("/api/bookings/:id/history", (req, res) => {
  const booking = bookings.find(b => b.id == req.params.id);
  if (!booking) return res.status(404).json({ message: "Booking not found" });

  res.json(booking.history);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
