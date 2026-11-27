import type { StudentProfile } from '../types';

interface ReceiptData {
  receiptNo: string;
  date: string;
  semester: string;
  amount: number;
  mode: string;
  description: string;
}

const ESCAPE = (value: string) => value.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');

const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten',
  'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

const twoDigits = (n: number): string => {
  if (n < 20) return ONES[n];
  return `${TENS[Math.floor(n / 10)]}${n % 10 ? ` ${ONES[n % 10]}` : ''}`;
};

export const amountInWords = (amount: number): string => {
  const parts: string[] = [];
  const push = (value: number, label: string) => {
    if (value > 0) parts.push(`${twoDigits(value)} ${label}`.trim());
  };
  push(Math.floor(amount / 10000000), 'Crore');
  push(Math.floor(amount / 100000) % 100, 'Lakh');
  push(Math.floor(amount / 1000) % 100, 'Thousand');
  push(Math.floor(amount / 100) % 10, 'Hundred');
  const rest = amount % 100;
  if (rest) parts.push(twoDigits(rest));
  return `${parts.join(' ')} Only`;
};

const money = (amount: number) =>
  `Rs. ${amount.toLocaleString('en-IN')}/-`;

export const buildFeeReceiptPdf = (fee: ReceiptData, student: StudentProfile): Blob => {
  const content: string[] = [];
  const text = (x: number, y: number, size: number, str: string, bold = false, gray = 0) => {
    content.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf ${gray.toFixed(2)} ${gray.toFixed(2)} ${gray.toFixed(2)} rg ${x} ${y} Td (${ESCAPE(str)}) Tj ET`);
  };
  const whiteText = (x: number, y: number, size: number, str: string, bold = false) => {
    content.push(`BT /${bold ? 'F2' : 'F1'} ${size} Tf 1 1 1 rg ${x} ${y} Td (${ESCAPE(str)}) Tj ET`);
  };
  const rule = (x1: number, y: number, x2: number) => {
    content.push(`0.85 0.80 0.72 RG 7 w ${x1} ${y} m ${x2} ${y} l S`);
  };

  const txnRef = `HDFC${fee.receiptNo.replace(/[^0-9]/g, '').slice(-10)}`;

  content.push('0.45 0.11 0.15 rg 0 772 595 70 re f');
  whiteText(48, 812, 18, 'GM UNIVERSITY', true);
  whiteText(48, 795, 8, 'Post Box No. 4, P.B. Road, Davanagere - 577006, Karnataka, India');
  whiteText(48, 782, 8, 'Approved by UGC  |  NAAC A+ Accredited  |  erpsupport@gmu.ac.in  |  +91 8192 233344');

  text(48, 742, 15, 'FEE RECEIPT', true);
  text(48, 726, 8, 'Office of the Finance Officer - Student Fee Accounts', false, 0.35);
  text(48, 700, 9, `Receipt No: ${fee.receiptNo}`, true);
  text(330, 700, 9, `Date: ${fee.date}`, true);
  text(48, 686, 8, `Academic Year: ${student.academicYear}`, false, 0.3);
  text(330, 686, 8, 'Status: PAID', false, 0.3);
  rule(48, 676, 547);

  text(48, 658, 8, 'STUDENT DETAILS', true, 0.45);
  const rows: Array<[string, string]> = [
    ['Student Name', student.name],
    ['University Seat No. (USN)', student.usn],
    ['Programme', student.program],
    ['Semester / Section', `${fee.semester} / Section ${student.section}`],
    ['Category / Quota', student.category],
    ["Father's Name", student.fatherName],
    ['Contact No.', student.phone],
  ];
  let y = 642;
  rows.forEach(([label, value]) => {
    text(48, y, 8.5, label, false, 0.35);
    text(190, y, 9, String(value), true);
    y -= 16;
  });

  rule(48, 534, 547);
  text(48, 518, 8, 'PAYMENT DETAILS', true, 0.45);

  content.push('0.98 0.96 0.92 rg 48 464 499 44 re f');
  text(60, 497, 8.5, 'Particulars', true, 0.35);
  text(60, 484, 9.5, fee.description);
  text(60, 471, 8.5, `Payment Mode: ${fee.mode}`, false, 0.3);
  text(330, 471, 8.5, `Transaction Ref: ${txnRef}`, false, 0.3);

  text(48, 444, 8.5, 'Amount Paid', true, 0.35);
  text(48, 422, 20, money(fee.amount), true);
  text(48, 404, 8.5, `Amount in words: Rupees ${amountInWords(fee.amount)}`, false, 0.25);

  content.push('0.13 0.55 0.30 RG 2 w 455 412 92 40 re S');
  content.push('BT /F2 16 Tf 0.13 0.55 0.30 rg 472 426 Td (PAID) Tj ET');

  rule(48, 386, 547);
  text(48, 368, 8, 'This is a computer-generated fee receipt and does not require a physical signature.', false, 0.45);
  text(48, 356, 8, `For verification, contact the Finance Office quoting Receipt No. ${fee.receiptNo}.`, false, 0.45);
  text(405, 332, 9, 'Authorised Signatory', true);
  text(405, 320, 8, 'Finance Officer, GM University', false, 0.4);
  content.push('0.45 0.11 0.15 rg 48 60 499 1 re f');
  text(48, 44, 7.5, 'GM University ERP  |  Student Academic Portal  |  Fee Receipt generated electronically', false, 0.45);

  const stream = content.join('\n');
  const objects: string[] = [
    '<< /Type /Catalog /Pages 2 0 R >>',
    '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
    '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>',
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>',
    '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>',
  ];

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  objects.forEach((body, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${body}\nendobj\n`;
  });
  const xrefStart = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  offsets.forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdf], { type: 'application/pdf' });
};

export const downloadFeeReceiptPdf = (fee: ReceiptData, student: StudentProfile) => {
  const blob = buildFeeReceiptPdf(fee, student);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `FeeReceipt_${fee.receiptNo}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
};
