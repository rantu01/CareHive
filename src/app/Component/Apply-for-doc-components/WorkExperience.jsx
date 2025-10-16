import React from 'react';
import { useFormContext } from 'react-hook-form';

const WorkExperience = () => {

    const { register, formState: { errors } } = useFormContext();
    return (
        <section>
            <h2
                className="text-xl md:text-2xl font-semibold text-center mb-6"
                style={{ color: "var(--dashboard-blue)" }}
            >
                Work Experience
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Previous */}
                <div
                    className="p-6 rounded-xl shadow-sm"
                    style={{
                        borderWidth: "2px",
                        borderColor: "var(--dashboard-border)",
                        backgroundColor: "var(--bg-color-all)",
                    }}
                >
                    <h3
                        className="font-semibold mb-4 text-lg"
                        style={{ color: "var(--text-color-all)" }}
                    >
                        Previous
                    </h3>

                    {/* Hospital Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Hospital Name *"
                            {...register("previousHospital", {
                                required: "Previous hospital name is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-border)",
                                color: "var(--text-color-all)",
                            }}
                        />
                        {errors.previousHospital && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.previousHospital.message}
                            </p>
                        )}
                    </div>

                    {/* Position */}
                    <div>
                        <input
                            type="text"
                            placeholder="Position *"
                            {...register("previousPosition", {
                                required: "Previous position is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-border)",
                                color: "var(--text-color-all)",
                            }}
                        />
                        {errors.previousPosition && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.previousPosition.message}
                            </p>
                        )}
                    </div>

                    {/* From & To */}
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="From *"
                                {...register("previousFrom", { required: "Start year is required" })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--text-color-all)",
                                }}
                            />
                            {errors.previousFrom && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.previousFrom.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="To *"
                                {...register("previousTo", { required: "End year is required" })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--text-color-all)",
                                }}
                            />
                            {errors.previousTo && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.previousTo.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Current */}
                <div
                    className="p-6 rounded-xl shadow-sm"
                    style={{
                        borderWidth: "2px",
                        borderColor: "var(--dashboard-blue)",
                        backgroundColor: "var(--bg-color-all)",
                    }}
                >
                    <h3
                        className="font-semibold mb-4 text-lg"
                        style={{ color: "var(--text-color-all)" }}
                    >
                        Current
                    </h3>

                    {/* Hospital Name */}
                    <div>
                        <input
                            type="text"
                            placeholder="Hospital Name *"
                            {...register("currentHospital", {
                                required: "Current hospital name is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-border)",
                                color: "var(--text-color-all)",
                            }}
                        />
                        {errors.currentHospital && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.currentHospital.message}
                            </p>
                        )}
                    </div>

                    {/* Position */}
                    <div>
                        <input
                            type="text"
                            placeholder="Position *"
                            {...register("currentPosition", {
                                required: "Current position is required",
                            })}
                            className="w-full px-4 py-3 rounded-lg focus:outline-none mb-3"
                            style={{
                                borderWidth: "2px",
                                borderColor: "var(--dashboard-border)",
                                color: "var(--text-color-all)",
                            }}
                        />
                        {errors.currentPosition && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.currentPosition.message}
                            </p>
                        )}
                    </div>

                    {/* From & To */}
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="From *"
                                {...register("currentFrom", { required: "Start year is required" })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--text-color-all)",
                                }}
                            />
                            {errors.currentFrom && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.currentFrom.message}
                                </p>
                            )}
                        </div>
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="To *"
                                {...register("currentTo", { required: "End year is required" })}
                                className="w-full px-4 py-3 rounded-lg focus:outline-none"
                                style={{
                                    borderWidth: "2px",
                                    borderColor: "var(--dashboard-border)",
                                    color: "var(--text-color-all)",
                                }}
                            />
                            {errors.currentTo && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.currentTo.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkExperience;