const TopPerformers = () => {
  const topUsers = [
    { id: 1, name: "David Miller", points: "18,500 points", rank: 2, badge: "🥈" },
    { id: 2, name: "Ethan Hunt", points: "21,432 points", rank: 1, badge: "🥇" },
    { id: 3, name: "Sarah Chen", points: "16,200 points", rank: 3, badge: "🥉" },
  ];

  const getRankStyle = (rank) => {
    if (rank === 1) return "border-4 border-yellow-400";
    if (rank === 2) return "border-4 border-gray-300";
    if (rank === 3) return "border-4 border-orange-400";
    return "";
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-6">Top Performers</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {topUsers
          .sort((a, b) => a.rank - b.rank)
          .map((user) => (
            <div
              key={user.id}
              className={`bg-[var(--color-secondary)] bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center transition-transform hover:scale-105 ${
                user.rank === 1 ? 'md:order-2' : user.rank === 2 ? 'md:order-1' : 'md:order-3'
              }`}
            >
              <div className="relative inline-block mb-4">
                <div className={`w-20 h-20 rounded-full bg-[var(--color-primary)] bg-opacity-20 ${getRankStyle(user.rank)} overflow-hidden`}>
                  <img
                    src={`https://i.pravatar.cc/150?u=${user.id}`}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 text-2xl bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                  {user.badge}
                </span>
              </div>
              <h3 className="font-bold text-lg mb-1">{user.name}</h3>
              <p className="text-[var(--color-primary)] font-semibold">
                {user.points}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopPerformers;