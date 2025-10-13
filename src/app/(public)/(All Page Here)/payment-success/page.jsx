"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { CheckCircle, Download, User, Mail, CreditCard, MapPin, Calendar, Clock, Building2, Stethoscope, FileText, BadgeCheck } from "lucide-react";
import { pdfGenerator } from "@/app/utils/generatePdf";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [payment, setPayment] = useState(null);

  const [patientSerial, setPatientSerial] = useState(0)

  useEffect(() => {
    if (sessionId) {
      axios
        .get(`/api/payment-session/${sessionId}`)
        .then((res) => setPayment(res.data))
        .catch((err) => console.error(err));
    }
  }, [sessionId]);


  useEffect(() => {

    const paymentSucess = async () => {
      const response = await axios.post('/api/appointments', payment?.metadata)
      setPatientSerial(response?.data?.serialNo)
    }


    if (payment) {
      paymentSucess()
    }
  }, [payment]);



  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-white)]">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-calm-blue)] mb-4"></div>
          <p className="text-[var(--fourground-color)] text-lg">Loading payment info...</p>
        </div>
      </div>
    );
  }




  const handleDownloadPDF = () => {
    pdfGenerator(payment, patientSerial)
  }

  return (
    <div className="min-h-screen px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Success Header Card */}
        <div className="bg-gradient-to-br from-[var(--color-light-green)] via-[#7FE87F] to-[var(--color-light-green)] rounded-3xl shadow-2xl overflow-hidden mb-8 transform">
          <div className="px-8 py-12 md:py-16 text-center relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <div className="absolute top-10 left-10 w-32 h-32 bg-[var(--color-white)] rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-[var(--color-white)] rounded-full"></div>
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center bg-[var(--color-white)] rounded-full w-24 h-24 mb-6 shadow-xl animate-bounce">
                <CheckCircle size={56} className="text-[var(--color-light-green)]" strokeWidth={2.5} />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-black)] mb-3">
                Payment Successful!
              </h1>
              <p className="text-[var(--color-black)] text-lg md:text-xl opacity-90 flex items-center justify-center gap-2">
                <BadgeCheck size={24} />
                Your appointment has been confirmed
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className=" rounded-3xl shadow-xl overflow-hidden border border-[var(--gray-color)]">
          {/* Amount Section */}
          <div className="bg-gradient-to-r from-[var(--color-calm-blue)] to-[#5A9FD4] px-8 py-8 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <FileText className="text-[var(--color-white)]" size={28} />
              <p className="text-sm text-[var(--color-white)] uppercase tracking-widest font-semibold">
                Total Amount Paid
              </p>
            </div>
            <p className="text-5xl md:text-6xl font-bold text-[var(--color-white)] mb-1">
              {(payment.amount_total / 100).toFixed(2)}
            </p>
            <p className="text-2xl text-[var(--color-white)] opacity-90 font-medium uppercase">
              {payment.currency}
            </p>
          </div>

          <div className="p-8 md:p-10">
            {/* Payment Details Grid */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Customer Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[var(--color-calm-blue)] rounded-full"></div>
                  <h3 className="text-2xl font-bold text-[var(--fourground-color)]">
                    Customer Information
                  </h3>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-calm-blue)] bg-opacity-10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <User size={24} className="text-[var(--color-white)]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Name</p>
                      <p className="text-[var(--fourground-color)] font-semibold text-lg">{payment.metadata.patientName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-calm-blue)] bg-opacity-10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Mail size={24} className="text-[var(--color-white)]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Email</p>
                      <p className="text-[var(--fourground-color)] font-semibold break-all">{payment.metadata.patientEmail}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-calm-blue)] bg-opacity-10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <CreditCard size={24} className="text-[var(--color-white)]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Payment Method</p>
                      <p className="text-[var(--fourground-color)] font-semibold capitalize">{payment.payment_method_types[0]}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-calm-blue)] bg-opacity-10 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <MapPin size={24} className="text-[var(--color-white)]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Address</p>
                      <p className="text-[var(--fourground-color)] font-semibold">BD</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Appointment Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-[var(--color-light-green)] rounded-full"></div>
                  <h3 className="text-2xl font-bold text-[var(--fourground-color)]">
                    Appointment Details
                  </h3>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-light-green)] bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Stethoscope size={24} className="text-[#2D8F2D]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Doctor Name</p>
                      <p className="text-[var(--fourground-color)] font-semibold text-lg">{payment.metadata.doctorName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-light-green)] bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Building2 size={24} className="text-[#2D8F2D]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Hospital Name</p>
                      <p className="text-[var(--fourground-color)] font-semibold text-lg">{payment.metadata.hospitalName}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-light-green)] bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Calendar size={24} className="text-[#2D8F2D]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Booked Slot</p>
                      <p className="text-[var(--fourground-color)] font-semibold">{payment.metadata.bookedSlot.toUpperCase()}</p>
                    </div>
                  </div>
                </div>

                <div className="group hover:bg-[var(--gray-color)] p-4 rounded-xl transition-all duration-200 cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="bg-[var(--color-light-green)] bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                      <Clock size={24} className="text-[#2D8F2D]" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">Booked At</p>
                      <p className="text-[var(--fourground-color)] font-semibold">{payment.metadata.bookedAt ? new Date(payment.metadata.bookedAt).toLocaleString() : "-"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Session & Status Bar */}
            <div className="bg-[var(--gray-color)] rounded-2xl p-6 mb-8 border-l-4 border-[var(--color-calm-blue)]">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-2">Session ID</p>
                  <p className="text-[var(--fourground-color)] font-mono text-sm break-all font-semibold">{payment.id}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-2">Payment Status</p>
                  <span className="inline-flex items-center gap-2 bg-[var(--color-light-green)] text-[var(--color-black)] px-5 py-2 rounded-full text-sm font-bold capitalize shadow-md">
                    <CheckCircle size={16} />
                    {payment.payment_status}
                  </span>
                </div>
              </div>
            </div>
            {/* Patient Serial Number Card */}
            <div className="group bg-gradient-to-r from-[var(--color-light-green)]/20 to-[#7FE87F]/20 border border-[var(--color-light-green)] rounded-2xl p-6 mb-8 transition-all duration-300 hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--color-light-green)] bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition-transform duration-200">
                  <User size={24} className="text-[#2D8F2D]" strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-[var(--fourground-color)] opacity-60 uppercase tracking-wider font-semibold mb-1">
                    Your Serial Number
                  </p>
                  <p className="text-[var(--fourground-color)] font-bold text-3xl md:text-4xl">
                    #{patientSerial || '—'}
                  </p>
                  <p className="text-sm text-[var(--fourground-color)] opacity-70 mt-2">
                    Please arrive early and mention this number at the reception.
                  </p>
                </div>
              </div>
            </div>
            {/* Download Button */}
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-gradient-to-r from-[var(--color-calm-blue)] to-[#5A9FD4] hover:from-[#5A9FD4] hover:to-[var(--color-calm-blue)] text-[var(--color-white)] font-bold py-5 px-8 rounded-2xl transition-all duration-300 flex items-center justify-center gap-4 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] cursor-pointer group"
            >
              <Download size={28} className="group-hover:animate-bounce" />
              <span className="text-xl">Download PDF Receipt</span>
            </button>
            {/* Footer Note */}
            <div className="mt-8 text-center bg-[var(--gray-color)] rounded-xl p-6">
              <p className="text-[var(--fourground-color)] opacity-70 text-sm leading-relaxed">
                Thank you for your payment! A confirmation email has been sent to <span className="font-semibold text-[var(--color-calm-blue)]">{payment.customer_details.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}