import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Matches() {
  const [matches, setMatches] = useState([]);
  const nav = useNavigate();

  const myId = localStorage.getItem("userId");

  useEffect(() => {
    fetchMatches();
  }, []);

  // Fetch matches
  const fetchMatches = async () => {
    try {
      const res = await API.get("/match/my");
      setMatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Accept / Reject
  const respond = async (matchId, action) => {
    try {
      await API.post("/match/respond", {
        matchId,
        action,
      });
      fetchMatches();
    } catch {
      alert("Error updating request");
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      <h1 className="text-4xl font-bold mb-6">My Matches 🤝</h1>

      {matches.length === 0 ? (
        <p>No matches yet 😔</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {matches.map((m) => {
            const otherUser =
              m.user1._id === myId ? m.user2 : m.user1;

            return (
              <div
                key={m._id}
                className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition duration-300"
              >
                {/* User Info */}
                <h2 className="text-xl font-semibold">
                  {otherUser?.name || "User"}
                </h2>
                <p className="text-sm text-gray-200">
                  {otherUser?.email}
                </p>

                {/* Status */}
                <p className="mt-3">
                  Status:{" "}
                  <span
                    className={`font-bold ${
                      m.status === "accepted"
                        ? "text-green-400"
                        : m.status === "rejected"
                        ? "text-red-400"
                        : "text-yellow-300"
                    }`}
                  >
                    {m.status}
                  </span>
                </p>

                {/* Actions */}
                {m.status === "pending" && (
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => respond(m._id, "accept")}
                      className="bg-green-500 hover:bg-green-700 px-4 py-2 rounded-lg"
                    >
                      Accept ✅
                    </button>

                    <button
                      onClick={() => respond(m._id, "reject")}
                      className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded-lg"
                    >
                      Reject ❌
                    </button>
                  </div>
                )}

                {/* Chat Button */}
                {m.status === "accepted" && (
                  <button
                    onClick={() => nav(`/chat/${otherUser._id}`)}
                    className="mt-4 w-full bg-blue-500 hover:bg-blue-700 py-2 rounded-lg"
                  >
                    Chat 💬
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}