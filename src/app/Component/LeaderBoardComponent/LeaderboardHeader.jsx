const LeaderboardHeader = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
          Leaderboard
        </h1>
        <p className="text-sm md:text-base opacity-70 mt-1">
          See where you stand among the challengers.
        </p>
      </div>
      <button className="px-4 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white rounded-lg transition-colors font-medium">
        My Rank
      </button>
    </div>
  );
};
export default LeaderboardHeader;