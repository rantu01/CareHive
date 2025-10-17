import { useState } from "react";
import AgeStep from "./Steps/AgeStep";
import BodyPartStep from "./Steps/BodyPartStep";
import GenderStep from "./Steps/GenderStep";
import SymptomsStep from "./Steps/SymptomsStep";
import TimelineStep from "./Steps/TimelineStep";
import NavigationButtons from "./Steps/NavigationButtons";
import CompletionSummary from "./Summary/CompletionSummary";

const TimeLineBar = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        bodyPart: '',
        symptoms: ''
    });

    const steps = [
        "Select Gender",
        "Age",
        "Body Part",
        "Symptoms",
    ];

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const isNextDisabled = () => {
        switch (currentStep) {
            case 0:
                return !formData.gender;
            case 1:
                return !formData.age || formData.age <= 0 || formData.age > 120;
            case 2:
                return !formData.bodyPart;
            case 3:
                return !formData.symptoms;
            default:
                return false;
        }
    };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 0:
                return <GenderStep value={formData.gender} onChange={(value) => handleInputChange('gender', value)} />;
            case 1:
                return <AgeStep value={formData.age} onChange={(value) => handleInputChange('age', value)} />;
            case 2:
                return <BodyPartStep value={formData.bodyPart} onChange={(value) => handleInputChange('bodyPart', value)} />;
            case 3:
                return <SymptomsStep value={formData.bodyPart} onChange={(value) => handleInputChange('symptoms', value)} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex justify-center min-h-screen p-4 gap-5">
            <div className="w-full max-w-md flex-1">
                <div className="relative border-l-2 text-[var(--fourgroud-color)]">
                    {steps.map((step, index) => (
                        <TimelineStep
                            key={index}
                            step={step}
                            index={index}
                            currentStep={currentStep}
                            formData={formData}
                        />
                    ))}
                </div>
            </div>

            <div className="flex-1">
                <div className="mt-6 p-4 rounded-lg shadow-sm border">
                    {renderCurrentStep()}
                </div>

                <NavigationButtons
                    currentStep={currentStep}
                    steps={steps}
                    onPrev={handlePrev}
                    onNext={handleNext}
                    isNextDisabled={isNextDisabled()}
                />
            </div>

            <CompletionSummary formData={formData} />
        </div>
    );
};

export default TimeLineBar;