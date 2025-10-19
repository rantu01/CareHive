import jsPDF from "jspdf";

export const pdfGenerator = (payment, sl) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Modern Minimal Color Palette
    const colors = {
        primary: [59, 130, 246],      // Blue-600
        secondary: [107, 114, 128],   // Gray-500
        accent: [239, 68, 68],        // Red-500
        success: [16, 185, 129],      // Emerald-500
        dark: [31, 41, 55],           // Gray-800
        light: [249, 250, 251],       // Gray-50
        border: [229, 231, 235],      // Gray-200
        white: [255, 255, 255]
    };

    // Clean Header
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 35, 'F');

    // Title
    doc.setTextColor(...colors.white);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT RECEIPT", pageWidth / 2, 22, { align: 'center' });

    // Amount Card - Compact
    const amountY = 45;
    doc.setFillColor(...colors.white);
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.5);
    doc.roundedRect(20, amountY, pageWidth - 40, 25, 5, 5, 'FD');

    // Amount label
    doc.setTextColor(...colors.secondary);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL AMOUNT", pageWidth / 2, amountY + 10, { align: 'center' });

    // Amount value
    doc.setTextColor(...colors.dark);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(
        `${(payment.amount_total / 100).toFixed(2)} ${payment.currency.toUpperCase()}`,
        pageWidth / 2,
        amountY + 19,
        { align: 'center' }
    );

    let yPos = 80;

    // Combined Information Section
    doc.setFillColor(...colors.light);
    doc.roundedRect(20, yPos, pageWidth - 40, 12, 3, 3, 'F');

    doc.setTextColor(...colors.dark);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("INFORMATION", 26, yPos + 8);

    yPos += 18;

    // All details in one compact table
    const allDetails = [
        { label: 'Patient Name', value: payment.metadata.patientName },
        { label: 'Email', value: payment.metadata.patientEmail },
        { label: 'Payment Method', value: payment.payment_method_types?.[0]?.toUpperCase() || "N/A" },
        { label: 'Doctor', value: payment.metadata.doctorName || "N/A" },
        { label: 'Hospital', value: payment.metadata.hospitalName || "N/A" },
        { label: 'Time Slot', value: payment.metadata.bookedSlot || "N/A" },
        { label: 'Booked On', value: payment.metadata.bookedAt ? new Date(payment.metadata.bookedAt).toLocaleDateString() : "N/A" }
    ];

    allDetails.forEach((detail, index) => {
        const isEven = index % 2 === 0;

        if (isEven) {
            doc.setFillColor(...colors.light);
            doc.roundedRect(20, yPos, pageWidth - 40, 10, 2, 2, 'F');
        }

        // Label
        doc.setTextColor(...colors.secondary);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text(detail.label.toUpperCase(), 26, yPos + 6);

        // Value
        doc.setTextColor(...colors.dark);
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(detail.value, 100, yPos + 6, { maxWidth: pageWidth - 110 });

        yPos += 10;
    });

    yPos += 8;

    // Status & Serial Section - Side by Side Cards
    const cardHeight = 28;
    const cardSpacing = 5;
    const leftCardWidth = (pageWidth - 40 - cardSpacing) / 2;
    const rightCardWidth = leftCardWidth;

    // Serial Number Card
    doc.setFillColor(...colors.light);
    doc.roundedRect(20, yPos, leftCardWidth, cardHeight, 4, 4, 'F');

    doc.setTextColor(...colors.secondary);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("SERIAL NUMBER", 26, yPos + 9);

    doc.setTextColor(...colors.primary);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text(`#${sl || '—'}`, 26, yPos + 21);

    // Status Card - No border, colored background
    const statusColor = payment.payment_status === 'succeeded' ? colors.success : colors.accent;
    doc.setFillColor(...statusColor);
    doc.roundedRect(20 + leftCardWidth + cardSpacing, yPos, rightCardWidth, cardHeight, 4, 4, 'F');

    doc.setTextColor(...colors.white);
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.text("PAYMENT STATUS", 20 + leftCardWidth + cardSpacing + 6, yPos + 9);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
        payment.payment_status.toUpperCase(),
        20 + leftCardWidth + cardSpacing + 6,
        yPos + 21
    );

    yPos += cardHeight + 8;

    // Session ID (if space)
    if (yPos < 250) {
        doc.setFillColor(...colors.light);
        doc.roundedRect(20, yPos, pageWidth - 40, 15, 3, 3, 'F');

        doc.setTextColor(...colors.secondary);
        doc.setFontSize(7);
        doc.setFont("helvetica", "bold");
        doc.text("SESSION ID", 26, yPos + 7);

        doc.setTextColor(...colors.dark);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.text(payment.id, 26, yPos + 12, { maxWidth: pageWidth - 50 });
    }

    // Compact Footer
    const footerY = 270;
    doc.setDrawColor(...colors.border);
    doc.setLineWidth(0.3);
    doc.line(20, footerY, pageWidth - 20, footerY);

    doc.setTextColor(...colors.secondary);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your payment", pageWidth / 2, footerY + 6, { align: 'center' });

    doc.setFontSize(6);
    doc.text("Automated receipt • " + new Date().toLocaleDateString(), pageWidth / 2, footerY + 10, { align: 'center' });

    doc.save("payment_receipt.pdf");
};
