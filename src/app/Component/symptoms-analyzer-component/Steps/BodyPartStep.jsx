const BodyPartStep = ({ value, onChange }) => {
    const bodyParts = [
        "head",
        "eyes",
        "ears",
        "nose",
        "throat",
        "neck",
        "shoulders",
        "arms",
        "elbows",
        "wrists",
        "hands",
        "fingers",
        "chest",
        "back",
        "stomach",
        "hips",
        "legs",
        "knees",
        "calves",
        "ankles",
        "feet",
        "toes"
    ];

    return (
        <div className="space-y-3">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
                <option value="">Select a body part</option>
                {bodyParts.map((part) => (
                    <option key={part} value={part}>{part}</option>
                ))}
            </select>
        </div>
    );
};

export default BodyPartStep