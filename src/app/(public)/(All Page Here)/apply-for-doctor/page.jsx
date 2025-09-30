"use client"
import { Hospital } from "lucide-react";
import { useForm } from "react-hook-form"

const page = () => {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <div className='text-black pt-34'>
            <header className="flex justify-center items-center gap-5 bg-[var(--color-light-green)] py-3">
                <span><Hospital size={35} /></span>   <span className="text-2xl md:text-4xl font-bold text-[var(--fourground-color)]">Doctor Registration Form</span>
            </header>

            <form onSubmit={handleSubmit(onSubmit)}>



                <div>
                    <p className="text-center">Personal Info section</p>
                    <div className="grid grid-cols-6 items-center gap-4">
                        <div className="col-span-1">
                            <div className="avatar">
                                <div className="ring-primary ring-offset-base-100 w-34 rounded-full ring-2 ring-offset-2">
                                    <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-5">

                            <div>
                                <input type="text" placeholder="Full Name" {...register("fullName", { required: true })} />
                                <input type="date" {...register("dateOfBirth", { required: true })} />
                                <select {...register("gender")}>
                                    <option value="Female">female</option>
                                    <option value="Male">male</option>
                                </select>

                            </div>

                            <div>
                                <input type="tel" {...register("mobileNumber", { required: true, maxLength: 11 })} placeholder="Mobile Number" />
                                <input type="tel" {...register("mobileNumber", { required: true, maxLength: 11 })} placeholder="Whats App" />
                                <input type="email" {...register("email", { required: true })} placeholder="Enter your email" />
                            </div>


                            <div>
                                <select {...register("meritialStatus", { required: true })}>
                                    <option value="Married">Married</option>
                                    <option value="Unmarried">Unmarried</option>
                                    <option value="Engaged">Engaged</option>
                                </select>

                                <select {...register("residentalStatus", { required: true })}>
                                    <option value="Residence">Residence</option>
                                    <option value="Non-Residence">Non-Residence</option>
                                </select>

                                <input type="text"  {...register("nationality", { required: true })} placeholder="Nationality" />
                            </div>

                            <div>
                                <input type="text" {...register("nationalId", { required: true })} placeholder="National Id No" />
                                <input type="text" {...register("presentAddress", { required: true })} placeholder="Present Address" />
                                <input type="text" {...register("permanentAddress", { required: true })} placeholder="Present Address" />
                            </div>

                        </div>
                    </div>
                </div>

                <input type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default page;