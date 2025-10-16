import React from 'react';
import { useFormContext } from 'react-hook-form';

const EducationSection = () => {
    const { register, formState: { errors } } = useFormContext();
    return (
        <section>
            <h2
                className="text-xl md:text-2xl font-semibold text-center mb-6"
                style={{ color: "var(--dashboard-blue)" }}
            >
                Educational Qualification
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Degree Name */}
                <div>
                    <input
                        type="text"
                        placeholder="Degree Name *"
                        {...register("degreeName", { required: "Degree name is required" })}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                        style={{
                            borderWidth: "2px",
                            borderColor: "var(--dashboard-border)",
                            color: "var(--text-color-all)",
                        }}
                    />
                    {errors.degreeName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.degreeName.message}
                        </p>
                    )}
                </div>

                {/* Post Graduate */}
                <div>
                    <input
                        type="text"
                        placeholder="Post Graduate *"
                        {...register("postGraduate", { required: "Post graduate info is required" })}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                        style={{
                            borderWidth: "2px",
                            borderColor: "var(--dashboard-border)",
                            color: "var(--text-color-all)",
                        }}
                    />
                    {errors.postGraduate && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.postGraduate.message}
                        </p>
                    )}
                </div>

                {/* Graduation Year */}
                <div>
                    <input
                        type="text"
                        placeholder="Graduation Year *"
                        {...register("graduationYear", {
                            required: "Graduation year is required",
                            pattern: {
                                value: /^[0-9]{4}$/,
                                message: "Enter a valid year (e.g., 2020)",
                            },
                        })}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                        style={{
                            borderWidth: "2px",
                            borderColor: "var(--dashboard-border)",
                            color: "var(--text-color-all)",
                        }}
                    />
                    {errors.graduationYear && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.graduationYear.message}
                        </p>
                    )}
                </div>

                {/* Specialization */}
                <div>
                    <input
                        type="text"
                        placeholder="Specialization *"
                        {...register("specialization", {
                            required: "Specialization is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                        style={{
                            borderWidth: "2px",
                            borderColor: "var(--dashboard-border)",
                            color: "var(--text-color-all)",
                        }}
                    />
                    {errors.specialization && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.specialization.message}
                        </p>
                    )}
                </div>

                {/* University Name */}
                <div>
                    <input
                        type="text"
                        placeholder="University Name *"
                        {...register("universityName", {
                            required: "University name is required",
                        })}
                        className="w-full px-4 py-3 rounded-lg focus:outline-none"
                        style={{
                            borderWidth: "2px",
                            borderColor: "var(--dashboard-border)",
                            color: "var(--text-color-all)",
                        }}
                    />
                    {errors.universityName && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.universityName.message}
                        </p>
                    )}
                </div>
            </div>
        </section>

    );
};

export default EducationSection;