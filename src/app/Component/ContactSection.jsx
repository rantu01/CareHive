import React from 'react';
const ContactSection = () => {
    return (
        <section className="bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    Contact Us
                </h2>
                <p className="text-gray-600 mb-8">
                    Have questions or need support? Send us a message and we’ll get back to you soon.
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
                <form className="grid grid-cols-1 gap-6">
                    {/* Name */}
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        />
                    </div>

                    {/* Message */}
                    <div>
                        <label className="block text-left text-gray-700 font-medium mb-2">
                            Message
                        </label>
                        <textarea
                            rows="4"
                            placeholder="Write your message..."
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                        ></textarea>
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="bg-teal-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-teal-700 transition"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ContactSection;
