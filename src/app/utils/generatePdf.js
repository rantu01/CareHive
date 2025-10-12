import jsPDF from "jspdf";

export const pdfGenerator = (payment) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;

    // Modern Color Palette
    const colors = {
        primary: [99, 102, 241],      // Indigo
        secondary: [139, 92, 246],    // Purple
        accent: [236, 72, 153],       // Pink
        success: [34, 197, 94],       // Green
        dark: [15, 23, 42],           // Slate Dark
        light: [248, 250, 252],       // Slate Light
        gray: [148, 163, 184],        // Slate Gray
        white: [255, 255, 255]
    };

    // Gradient-style Header with diagonal split
    doc.setFillColor(...colors.primary);
    doc.rect(0, 0, pageWidth, 50, 'F');

    // Accent triangle overlay
    doc.setFillColor(...colors.secondary);
    doc.triangle(pageWidth, 0, pageWidth, 50, pageWidth - 40, 0, 'F');

    // Modern success icon circle
    doc.setFillColor(...colors.white);
    doc.circle(pageWidth / 2, 20, 10, 'F');

    // Inner success circle with shadow effect
    doc.setFillColor(...colors.success);
    doc.circle(pageWidth / 2, 20, 7, 'F');

    // Checkmark
    doc.setDrawColor(...colors.white);
    doc.setLineWidth(1.5);
    doc.line(pageWidth / 2 - 3, 20, pageWidth / 2 - 1, 22);
    doc.line(pageWidth / 2 - 1, 22, pageWidth / 2 + 3, 18);

    // Title with shadow effect
    doc.setTextColor(30, 30, 40);
    doc.setFontSize(26);
    doc.setFont(undefined, 'bold');
    doc.text("PAYMENT RECEIPT", pageWidth / 2 + 0.3, 41.3, { align: 'center' });
    doc.setTextColor(...colors.white);
    doc.text("PAYMENT RECEIPT", pageWidth / 2, 41, { align: 'center' });

    // Modern Amount Card with gradient effect
    const cardY = 60;
    doc.setFillColor(...colors.primary);
    doc.roundedRect(20, cardY, pageWidth - 40, 35, 5, 5, 'F');

    // Accent bar on amount card
    doc.setFillColor(...colors.accent);
    doc.roundedRect(20, cardY, 4, 35, 2, 2, 'F');

    // Amount label
    doc.setTextColor(...colors.white);
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text("TOTAL AMOUNT PAID", pageWidth / 2, cardY + 12, { align: 'center' });

    // Amount value
    doc.setFontSize(28);
    doc.setFont(undefined, 'bold');
    doc.text(
        `${(payment.amount_total / 100).toFixed(2)} ${payment.currency.toUpperCase()}`,
        pageWidth / 2,
        cardY + 26,
        { align: 'center' }
    );

    let yPos = 105;

    // Customer Information Section with modern header
    doc.setFillColor(...colors.dark);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Customer Information", 26, yPos + 6.5);
    yPos += 15;

    const customerDetails = [
        { label: 'Name', value: payment.metadata.patientName },
        { label: 'Email', value: payment.metadata.patientEmail },
        { label: 'Payment Method', value: payment.payment_method_types?.[0]?.toUpperCase() || "-" },
    ];

    customerDetails.forEach((detail, index) => {
        // Alternating subtle backgrounds
        if (index % 2 === 0) {
            doc.setFillColor(...colors.light);
            doc.roundedRect(20, yPos, pageWidth - 40, 13, 2, 2, 'F');
        }

        // Border accent
        doc.setDrawColor(...colors.primary);
        doc.setLineWidth(0.3);
        doc.line(20, yPos + 13, pageWidth - 20, yPos + 13);

        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.gray);
        doc.text(detail.label.toUpperCase(), 26, yPos + 5);

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.dark);
        doc.text(detail.value, 26, yPos + 10);
        yPos += 13;
    });

    yPos += 8;

    // Appointment Details Section
    doc.setFillColor(...colors.primary);
    doc.roundedRect(20, yPos, pageWidth - 40, 10, 3, 3, 'F');
    doc.setTextColor(...colors.white);
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text("Appointment Details", 26, yPos + 6.5);
    yPos += 15;

    const appointmentDetails = [
        { label: 'Doctor Name', value: payment.metadata.doctorName || "-" },
        { label: 'Hospital Name', value: payment.metadata.hospitalName || "-" },
        { label: 'Booked Slot', value: payment.metadata.bookedSlot.toUpperCase() || "-" },
        { label: 'Booked At', value: payment.metadata.bookedAt ? new Date(payment.metadata.bookedAt).toLocaleString() : "-" }
    ];

    appointmentDetails.forEach((detail, index) => {
        if (index % 2 === 0) {
            doc.setFillColor(...colors.light);
            doc.roundedRect(20, yPos, pageWidth - 40, 13, 2, 2, 'F');
        }

        doc.setDrawColor(...colors.primary);
        doc.setLineWidth(0.3);
        doc.line(20, yPos + 13, pageWidth - 20, yPos + 13);

        doc.setFontSize(8);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(...colors.gray);
        doc.text(detail.label.toUpperCase(), 26, yPos + 5);

        doc.setFontSize(11);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(...colors.dark);
        doc.text(detail.value, 26, yPos + 10);
        yPos += 13;
    });

    yPos += 8;

    // Session ID & Status Card
    doc.setFillColor(...colors.light);
    doc.roundedRect(20, yPos, pageWidth - 40, 20, 3, 3, 'F');

    // Left border accent
    doc.setFillColor(...colors.secondary);
    doc.roundedRect(20, yPos, 3, 20, 1.5, 1.5, 'F');

    doc.setFontSize(7);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.gray);
    doc.text("SESSION ID", 28, yPos + 6);

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...colors.dark);
    doc.text(payment.id, 28, yPos + 11, { maxWidth: pageWidth - 80 });

    // Modern status badge
    doc.setFillColor(...colors.success);
    doc.roundedRect(pageWidth - 58, yPos + 5, 38, 10, 5, 5, 'F');
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...colors.white);
    doc.text(payment.payment_status.toUpperCase(), pageWidth - 39, yPos + 11, { align: 'center' });

    // Modern Footer with decorative line
    yPos = 280;
    doc.setDrawColor(...colors.primary);
    doc.setLineWidth(0.5);
    doc.line(pageWidth / 2 - 30, yPos, pageWidth / 2 + 30, yPos);

    doc.setFontSize(10);
    doc.setTextColor(...colors.gray);
    doc.setFont(undefined, 'normal');
    doc.text("Thank you for your payment!", pageWidth / 2, yPos + 6, { align: 'center' });

    doc.setFontSize(8);
    doc.text("This is an automated receipt", pageWidth / 2, yPos + 11, { align: 'center' });

    doc.save("payment_receipt.pdf");
};