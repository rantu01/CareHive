const SymptomsStep = ({ value, onChange }) => {
    const symptoms = [
        "Pain",
        "Swelling", 
        "Redness",
        "Itching",
        "Numbness",
        "Weakness",
        "Fever",
        "Fatigue"
    ];

    console.log("symptomps value is",value)
    return (
        <div className="space-y-3">
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
            >
                <option value="">Select a symptom</option>
                {symptoms.map((symptom) => (
                    <option key={symptom} value={symptom}>{symptom}</option>
                ))}
            </select>
        </div>
    );
};

export default SymptomsStep