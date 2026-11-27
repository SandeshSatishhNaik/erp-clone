export interface Program {
  id: string;
  name: string;
  degree: 'B.Tech' | 'M.Tech' | 'MBA' | 'MCA' | 'BCA' | 'B.Sc' | 'Ph.D';
  department: string;
  level: 'Undergraduate' | 'Postgraduate' | 'Doctoral';
  duration: string;
  seats: number;
  eligibility: string;
  featured?: boolean;
}

export interface Circular {
  id: string;
  title: string;
  category: 'Examination' | 'Academic' | 'General' | 'Placement';
  date: string;
  refNo: string;
  isNew?: boolean;
  fileSize: string;
}

export interface StudentProfile {
  usn: string;
  name: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
  bloodGroup: string;
  category: string;
  program: string;
  branch: string;
  semester: number;
  section: string;
  academicYear: string;
  mentorName: string;
  mentorContact: string;
  admissionYear: number;
  fatherName: string;
  motherName: string;
  address: string;
  cgpa: number;
  sgpaLatest: number;
  overallAttendance: number;
  totalCredits: number;
  photo?: string;
}

export interface SubjectAttendance {
  code: string;
  name: string;
  faculty: string;
  held: number;
  attended: number;
  percentage: number;
  status: 'Normal' | 'Shortage Alert' | 'Critical';
}

export interface SemesterMarks {
  subjectCode: string;
  subjectName: string;
  credits: number;
  ia1: number;
  ia2: number;
  iaAvg: number;
  labMarks?: number;
  grade: string;
}

export interface FeeReceipt {
  receiptNo: string;
  date: string;
  semester: string;
  amount: number;
  mode: string;
  status: 'Paid' | 'Pending';
  description: string;
}
