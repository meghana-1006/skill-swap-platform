import { useEffect, useState } from "react";
import API from "../api/api";

export default function Explore() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendRequest = async (id) => {
    try {
      await API.post("/match/request", { userId: id });
      alert("Request Sent 🚀");
    } catch {
      alert("Error sending request");
    }
  };

  return (
    <div className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Explore Skills 🔍</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white/20 backdrop-blur-lg p-5 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm">{user.email}</p>

            <div className="mt-3">
              <p className="text-sm font-semibold">Skills Offered:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {user.skillsOffered?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-purple-500 px-2 py-1 rounded text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => sendRequest(user._id)}
              className="mt-4 w-full bg-green-500 hover:bg-green-700 py-2 rounded-lg transition"
            >
              Send Match Request 🤝
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}