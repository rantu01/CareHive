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

export const daysMap = {
    "0": "Sunday",
    "1": "Monday",
    "2": "Tuesday",
    "3": "Wednesday",
    "4": "Thursday",
    "5": "Friday",
    "6": "Saturday"
};

export const generatePDF = async (daysMap,medicines) => {
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margin = 20;
    let yPosition = margin;

    const checkPageBreak = (requiredSpace) => {
        if (yPosition + requiredSpace > pageHeight - margin) {
            pdf.addPage();
            yPosition = margin;
            return true;
        }
        return false;
    };

    const drawHeader = () => {
        // Header background with gradient effect
        pdf.setFillColor(79, 70, 229);
        pdf.roundedRect(margin, yPosition, pageWidth - 2 * margin, 40, 3, 3, 'F');

        // Title
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(26);
        pdf.setFont(undefined, 'bold');
        pdf.text("MEDICINE PRESCRIPTION", pageWidth / 2, yPosition + 17, { align: "center" });

        // Date and line
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');
        const date = new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        pdf.text(`Date: ${date}`, pageWidth / 2, yPosition + 30, { align: "center" });

        yPosition += 50;
    };

    drawHeader();

    // Table setup
    const tableStartX = margin;
    const tableWidth = pageWidth - 2 * margin;
    const colWidths = {
        no: 15,
        medicine: 50,
        days: 45,
        time: 25,
        pills: 25
    };

    // Table header
    const drawTableHeader = () => {
        // Header background
        pdf.setFillColor(99, 102, 241); // Indigo
        pdf.rect(tableStartX, yPosition, tableWidth, 12, 'F');

        // Header text
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(11);
        pdf.setFont(undefined, 'bold');

        let xPos = tableStartX + 5;
        pdf.text("No.", xPos, yPosition + 8);
        xPos += colWidths.no;
        pdf.text("Medicine Name", xPos, yPosition + 8);
        xPos += colWidths.medicine;
        pdf.text("Days", xPos, yPosition + 8);
        xPos += colWidths.days;
        pdf.text("Time", xPos, yPosition + 8);
        xPos += colWidths.time;
        pdf.text("Quantity", xPos, yPosition + 8);

        yPosition += 12;
    };

    drawTableHeader();

    // Table content
    medicines.forEach((medicine, index) => {
        const timeEntries = Object.keys(medicine.medicineTakingTime);
        const days = medicine.medicineTakingDays.map(d => daysMap[d]).join(", ");

        // Calculate row height based on content
        const maxLines = Math.max(
            Math.ceil(medicine.medicineName.length / 25),
            Math.ceil(days.length / 20),
            timeEntries.length
        );
        const rowHeight = Math.max(10, maxLines * 7 + 4);

        // Check if we need a new page
        if (checkPageBreak(rowHeight + 15)) {
            drawHeader();
            drawTableHeader();
        }

        // Alternating row colors
        if (index % 2 === 0) {
            pdf.setFillColor(249, 250, 251); // Light gray
        } else {
            pdf.setFillColor(255, 255, 255); // White
        }
        pdf.rect(tableStartX, yPosition, tableWidth, rowHeight, 'F');

        // Row border
        pdf.setDrawColor(229, 231, 235);
        pdf.setLineWidth(0.3);
        pdf.rect(tableStartX, yPosition, tableWidth, rowHeight);

        // Cell content
        pdf.setTextColor(31, 41, 55);
        pdf.setFontSize(10);
        pdf.setFont(undefined, 'normal');

        let xPos = tableStartX + 5;
        const textY = yPosition + 7;

        // Number with badge
        pdf.setFillColor(79, 70, 229);
        pdf.circle(xPos + 4, textY - 1, 4, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'bold');
        pdf.text(`${index + 1}`, xPos + 4, textY + 1, { align: "center" });

        xPos += colWidths.no;

        // Medicine name
        pdf.setTextColor(31, 41, 55);
        pdf.setFontSize(11);
        pdf.setFont(undefined, 'bold');
        const medicineLines = pdf.splitTextToSize(medicine.medicineName, colWidths.medicine - 5);
        pdf.text(medicineLines, xPos, textY);

        xPos += colWidths.medicine;

        // Days
        pdf.setFontSize(9);
        pdf.setFont(undefined, 'normal');
        pdf.setTextColor(75, 85, 99);
        const daysLines = pdf.splitTextToSize(days, colWidths.days - 5);
        pdf.text(daysLines, xPos, textY);

        xPos += colWidths.days;

        // Time and Pills (combined)
        let timeY = textY;
        timeEntries.forEach((timeKey) => {
            const timeIdx = timeKey.split('-')[1];
            const time = medicine.medicineTakingTime[timeKey];
            const pills = medicine.numberOfPill[`pill-${timeIdx}`];

            // Time
            pdf.setFontSize(10);
            pdf.setFont(undefined, 'bold');
            pdf.setTextColor(79, 70, 229);
            pdf.text(time, xPos, timeY);

            // Pills
            pdf.setFont(undefined, 'normal');
            pdf.setTextColor(107, 114, 128);
            pdf.setFontSize(9);
            pdf.text(`${pills} pill${pills > 1 ? 's' : ''}`, xPos + colWidths.time, timeY);

            timeY += 7;
        });

        yPosition += rowHeight;
    });

    // Summary section
    yPosition += 10;
    if (checkPageBreak(30)) {
        yPosition = margin;
    }

    // Summary box
    pdf.setFillColor(240, 253, 244); // Light green
    pdf.setDrawColor(74, 222, 128);
    pdf.setLineWidth(0.5);
    pdf.roundedRect(margin, yPosition, tableWidth, 25, 2, 2, 'FD');

    pdf.setTextColor(22, 101, 52);
    pdf.setFontSize(11);
    pdf.setFont(undefined, 'bold');
    pdf.text("Important Instructions:", margin + 5, yPosition + 8);

    pdf.setFontSize(9);
    pdf.setFont(undefined, 'normal');
    pdf.text("• Take medicines at the prescribed times", margin + 5, yPosition + 15);
    pdf.text("• Complete the full course as directed", margin + 5, yPosition + 20);

    // Footer
    yPosition = pageHeight - 20;
    pdf.setDrawColor(229, 231, 235);
    pdf.setLineWidth(0.3);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);

    yPosition += 5;
    pdf.setFontSize(8);
    pdf.setTextColor(107, 114, 128);
    pdf.setFont(undefined, 'italic');
    pdf.text("This is a computer-generated prescription. Please consult your doctor for any changes.",
        pageWidth / 2, yPosition, { align: "center" });

    pdf.setFontSize(7);
    pdf.text(`Generated on: ${new Date().toLocaleString('en-US')}`,
        pageWidth / 2, yPosition + 5, { align: "center" });

    pdf.save("medicine-prescription.pdf");
};