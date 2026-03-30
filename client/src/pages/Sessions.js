import { useEffect, useState } from "react";
import API from "../api/api";

export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [form, setForm] = useState({
    userId: "",
    topic: "",
    mode: "free",
    date: "",
  });

  useEffect(() => {
    fetchSessions();
  }, []);

  // Fetch sessions
  const fetchSessions = async () => {
    try {
      const res = await API.get("/session/my");
      setSessions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Book session
  const bookSession = async (e) => {
    e.preventDefault();

    try {
      await API.post("/session/book", form);
      alert("Session booked 🎉");
      fetchSessions();
    } catch {
      alert("Error booking session");
    }
  };

  // Mock payment
  const makePayment = async (id) => {
    try {
      await API.post("/session/mock-payment", {
        sessionId: id,
      });
      fetchSessions();
    } catch {
      alert("Payment failed");
    }
  };

  // Update status
  const updateStatus = async (id, status) => {
    try {
      await API.post("/session/update", {
        sessionId: id,
        status,
      });
      fetchSessions();
    } catch {
      alert("Error updating status");
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Sessions 📅</h1>

      {/* Booking Form */}
      <form
        onSubmit={bookSession}
        className="bg-white/20 backdrop-blur-lg p-6 rounded-xl mb-6"
      >
        <h2 className="text-xl mb-4">Book Session</h2>

        <input
          placeholder="User ID"
          className="p-2 w-full mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, userId: e.target.value })
          }
        />

        <input
          placeholder="Topic"
          className="p-2 w-full mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, topic: e.target.value })
          }
        />

        <input
          type="date"
          className="p-2 w-full mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
        />

        <select
          className="p-2 w-full mb-3 rounded bg-white/30"
          onChange={(e) =>
            setForm({ ...form, mode: e.target.value })
          }
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
          <option value="swap">Swap</option>
        </select>

        <button className="bg-green-500 px-4 py-2 rounded">
          Book Session 🚀
        </button>
      </form>

      {/* Sessions List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sessions.map((s) => (
          <div
            key={s._id}
            className="bg-white/20 backdrop-blur-lg p-5 rounded-xl shadow-lg"
          >
            <h2 className="text-xl font-semibold">{s.topic}</h2>
            <p>Date: {new Date(s.date).toDateString()}</p>

            <p>
              Mode:{" "}
              <span className="font-bold">{s.mode}</span>
            </p>

            <p>
              Payment:{" "}
              <span className="font-bold">
                {s.paymentStatus}
              </span>
            </p>

            <p>
              Status:{" "}
              <span className="font-bold">{s.status}</span>
            </p>

            {/* Payment */}
            {s.mode === "paid" && s.paymentStatus === "pending" && (
              <button
                onClick={() => makePayment(s._id)}
                className="mt-3 bg-yellow-500 px-3 py-1 rounded"
              >
                Pay Now 💳
              </button>
            )}

            {/* Complete */}
            {s.status === "scheduled" && (
              <button
                onClick={() =>
                  updateStatus(s._id, "completed")
                }
                className="mt-3 ml-2 bg-blue-500 px-3 py-1 rounded"
              >
                Mark Complete ✅
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}