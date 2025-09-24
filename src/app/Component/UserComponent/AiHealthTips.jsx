import React from "react";

const AiHealthTips = () => {
  const userStats = [
    {
      title: "bp",
      value: 120,
    },
    {
      title: "daily-step",
      value: 535,
      target: 34534,
    },
    {
      title: "heart-rate",
      value: 30,
    },
    {
      title: "weight",
      value: 60,
    },
  ];

  const AiTips = [
    "Your heart rate seems unusually low (30 bpm). Please double-check the measurement, and consult a doctor if accurate.",
    "You have taken 535 steps today, which is far below your target (34,534). Aim for at least 5,000–7,000 steps as a realistic daily goal.",
    "Your blood pressure reading (120) is within the normal range — maintain it with balanced diet and stress management.",
    "Your weight (60 kg) looks healthy; keep supporting it with regular exercise and proper nutrition.",
  ];

  return (
    <div className=" bg-[var(--dashboard-bg)] text-[var(--fourground-color)] py-6">
      <h2 className="text-2xl font-bold mb-4">AI Health Tips</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {AiTips.map((tip, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl border shadow-sm"
            style={{
              borderColor: "var(--dashboard-border)",
              backgroundColor: "var(--sidebar-bg)",
            }}
          >
            <h3 className="text-lg font-semibold text-[var(--dashboard-blue)] mb-2">
              Tip {index + 1}
            </h3>
            <p className="text-sm leading-relaxed">{tip}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiHealthTips;
