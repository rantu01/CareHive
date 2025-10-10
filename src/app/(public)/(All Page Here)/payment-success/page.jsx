"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import jsPDF from "jspdf";
import { CheckCircle, Download, User, Mail, CreditCard, MapPin, Calendar, Clock, Building2, Stethoscope, FileText, BadgeCheck } from "lucide-react";

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (sessionId) {
      axios
        .get(`/api/payment-session/${sessionId}`)
        .then((res) => setPayment(res.data))
        .catch((err) => console.error(err));
    }
  }, [sessionId]);

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

  // ✅ Generate Styled PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Header Background (Green)
    doc.setFillColor(144, 238, 144); // Light Green
    doc.rect(0, 0, pageWidth, 45, 'F');

    // Success Checkmark Circle
    doc.setFillColor(255, 255, 255);
    doc.circle(pageWidth / 2, 18, 8, 'F');
    doc.setDrawColor(144, 238, 144);
    doc.setLineWidth(2);
    doc.circle(pageWidth / 2, 18, 8, 'S');

    // Title
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text("PAYMENT RECEIPT", pageWidth / 2, 38, { align: 'center' });

    // Amount Paid Section (Blue Box)
    doc.setFillColor(70, 130, 180); // Calm Blue
    doc.roundedRect(15, 55, pageWidth - 30, 28, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text("AMOUNT PAID", pageWidth / 2, 65, { align: 'center' });
    doc.setFontSize(22);
    doc.setFont(undefined, 'bold');
    doc.text(
      `${(payment.amount_total / 100).toFixed(2)} ${payment.currency.toUpperCase()}`,
      pageWidth / 2,
      77,
      { align: 'center' }
    );

    let yPos = 95;

    // Customer Information Section
    doc.setFillColor(70, 130, 180); // Calm Blue
    doc.rect(15, yPos, 3, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("Customer Information", 22, yPos + 6);
    yPos += 12;

    // Customer Details with styling
    const customerDetails = [
      { label: 'Name', value: payment.customer_details.name },
      { label: 'Email', value: payment.customer_details.email },
      { label: 'Payment Method', value: payment.payment_method_types?.[0]?.toUpperCase() || "-" },
      { label: 'Address', value: payment.customer_details.address?.line1 || "-" },
      { label: 'Country', value: payment.customer_details.address?.country || "-" },
      { label: 'Postal Code', value: payment.customer_details.address?.postal_code || "-" }
    ];

    customerDetails.forEach((detail) => {
      doc.setFillColor(243, 243, 243);
      doc.roundedRect(15, yPos, pageWidth - 30, 12, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text(detail.label.toUpperCase(), 20, yPos + 4);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(detail.value, 20, yPos + 9);
      yPos += 14;
    });

    yPos += 3;

    // Appointment Details Section
    doc.setFillColor(144, 238, 144); // Light Green
    doc.rect(15, yPos, 3, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont(undefined, 'bold');
    doc.text("Appointment Details", 22, yPos + 6);
    yPos += 12;

    const appointmentDetails = [
      { label: 'Doctor Name', value: payment.metadata.doctor_name || "-" },
      { label: 'Hospital Name', value: payment.metadata.hospital_name || "-" },
      { label: 'Booked Slot', value: payment.metadata.booked_slot || "-" },
      { label: 'Booked At', value: payment.metadata.booked_at || "-" }
    ];

    appointmentDetails.forEach((detail) => {
      doc.setFillColor(243, 243, 243);
      doc.roundedRect(15, yPos, pageWidth - 30, 12, 2, 2, 'F');
      doc.setFontSize(9);
      doc.setFont(undefined, 'bold');
      doc.setTextColor(100, 100, 100);
      doc.text(detail.label.toUpperCase(), 20, yPos + 4);
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      doc.setTextColor(0, 0, 0);
      doc.text(detail.value, 20, yPos + 9);
      yPos += 14;
    });

    yPos += 3;

    // Session & Status
    doc.setFillColor(243, 243, 243);
    doc.roundedRect(15, yPos, pageWidth - 30, 18, 2, 2, 'F');
    doc.setFontSize(8);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(100, 100, 100);
    doc.text("SESSION ID", 20, yPos + 5);
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(0, 0, 0);
    doc.text(payment.id, 20, yPos + 10, { maxWidth: pageWidth - 40 });

    // Status Badge
    doc.setFillColor(144, 238, 144);
    doc.roundedRect(pageWidth - 50, yPos + 3, 35, 8, 2, 2, 'F');
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text(payment.payment_status.toUpperCase(), pageWidth - 32.5, yPos + 8, { align: 'center' });

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.setFont(undefined, 'italic');
    doc.text("Thank you for your payment!", pageWidth / 2, 285, { align: 'center' });

    doc.save("payment_receipt.pdf");
  };


  return (
    <div className="min-h-screen px-4 py-12 md:py-16">
      <div className="max-w-5xl mx-auto">
        {/* Success Header Card */}
        <div className="bg-gradient-to-br from-[var(--color-light-green)] via-[#7FE87F] to-[var(--color-light-green)] rounded-3xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-transform duration-300">
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
                      <p className="text-[var(--fourground-color)] font-semibold text-lg">{payment.customer_details.name}</p>
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
                      <p className="text-[var(--fourground-color)] font-semibold break-all">{payment.customer_details.email}</p>
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
                      <p className="text-[var(--fourground-color)] font-semibold">{payment.customer_details.address.line1}</p>
                      <p className="text-[var(--fourground-color)] font-semibold mt-1">{payment.customer_details.address.country} - {payment.customer_details.address.postal_code}</p>
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
                      <p className="text-[var(--fourground-color)] font-semibold text-lg">{payment.metadata.doctor_name}</p>
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
                      <p className="text-[var(--fourground-color)] font-semibold text-lg">{payment.metadata.hospital_name}</p>
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
                      <p className="text-[var(--fourground-color)] font-semibold">{payment.metadata.booked_slot}</p>
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
                      <p className="text-[var(--fourground-color)] font-semibold">{payment.metadata.booked_at}</p>
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