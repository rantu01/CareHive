const CompletionSummary = ({ formData }) => {
    if (!formData.symptoms) return null;
    
    return (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <h3 className="font-medium text-green-800 mb-2">Form Completed!</h3>
            <div className="text-sm text-green-700 space-y-1">
                <div>Gender: {formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}</div>
                <div>Age: {formData.age}</div>
                <div>Body Part: {formData.bodyPart}</div>
                <div>Symptom: {formData.symptoms}</div>
            </div>
        </div>
    );
};

export default CompletionSummary