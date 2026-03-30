import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const nav = useNavigate();

  return (
    <div className="p-6 text-white">
      <h1 className="text-4xl font-bold mb-6">Skill Swap 🚀</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Explore */}
        <div
          onClick={() => nav("/explore")}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-white/30 transition duration-300 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Explore Skills 🔍</h2>
          <p className="mt-2 text-sm">
            Find people to learn and exchange skills
          </p>
        </div>

        {/* Matches */}
        <div
          onClick={() => nav("/matches")}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-white/30 transition duration-300 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">My Matches 🤝</h2>
          <p className="mt-2 text-sm">
            View and manage your connections
          </p>
        </div>
        <div
  onClick={() => nav("/profile")}
  className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 transition cursor-pointer"
>
  <h2 className="text-xl font-semibold">My Profile 👤</h2>
  <p>Edit your skills and preferences</p>
</div>
        {/* Sessions */}
        <div
          onClick={() => nav("/sessions")}
          className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:scale-105 hover:bg-white/30 transition duration-300 cursor-pointer"
        >
          <h2 className="text-xl font-semibold">Sessions 📅</h2>
          <p className="mt-2 text-sm">
            Manage your booked sessions
          </p>
        </div>

      </div>
    </div>
  );
}