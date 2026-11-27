import type { StudentProfile } from '../types';
import { MOCK_STUDENT } from './mockData';

interface BranchSeed {
  code: string;
  program: string;
  branch: string;
}

const BRANCHES: BranchSeed[] = [
  {
    code: 'CS',
    program: 'B.Tech in Computer Science & Engineering',
    branch: 'Computer Science & Engineering',
  },
  {
    code: 'AI',
    program: 'B.Tech in Artificial Intelligence & Data Science',
    branch: 'Artificial Intelligence & Data Science',
  },
  {
    code: 'IS',
    program: 'B.Tech in Information Science & Engineering',
    branch: 'Information Science & Engineering',
  },
  {
    code: 'EC',
    program: 'B.Tech in Electronics & Communication Engineering',
    branch: 'Electronics & Communication Engineering',
  },
  {
    code: 'ME',
    program: 'B.Tech in Mechanical & Automation Engineering',
    branch: 'Mechanical & Automation Engineering',
  },
  {
    code: 'CV',
    program: 'B.Tech in Civil Engineering',
    branch: 'Civil Engineering',
  },
  {
    code: 'BT',
    program: 'B.Tech in Biotechnology',
    branch: 'Biotechnology',
  },
  {
    code: 'MB',
    program: 'Master of Business Administration (Dual Specialization)',
    branch: 'Management Studies',
  },
];

const FIRST_NAMES = [
  'Aarav', 'Abhishek', 'Aditya', 'Aishwarya', 'Akash', 'Ananya', 'Anil', 'Anjali',
  'Arjun', 'Ashwin', 'Bhavya', 'Chetan', 'Deepa', 'Darshan', 'Divya', 'Ganesh',
  'Gauri', 'Harish', 'Harshitha', 'Kiran', 'Kavya', 'Lokesh', 'Manasa', 'Manoj',
  'Meghana', 'Naveen', 'Nikhil', 'Pallavi', 'Pooja', 'Prakash', 'Prashanth', 'Priya',
  'Raghavendra', 'Rakshita', 'Ramesh', 'Rohan', 'Sachin', 'Sahana', 'Sanjay', 'Shreya',
  'Siddharth', 'Sneha', 'Srujan', 'Suhas', 'Sunil', 'Swathi', 'Tejas', 'Uday',
  'Varun', 'Varsha', 'Vinay', 'Yashas',
];

const LAST_NAMES = [
  'Hegde', 'Gowda', 'Patil', 'Kulkarni', 'Naik', 'Rao', 'Shetty', 'Bhat',
  'Desai', 'Joshi', 'Kamath', 'Reddy', 'Sharma', 'Iyer', 'Holla', 'Pujar',
];

const MENTORS: Record<string, { name: string; contact: string }> = {
  CS: { name: 'Dr. Anand Kumar', contact: 'anand.kumar@gmu.ac.in' },
  AI: { name: 'Dr. Shwetha R. Bhat', contact: 'shwetha.bhat@gmu.ac.in' },
  IS: { name: 'Prof. Meenakshi S.', contact: 'meenakshi.s@gmu.ac.in' },
  EC: { name: 'Dr. Prakash V. Joshi', contact: 'prakash.joshi@gmu.ac.in' },
  ME: { name: 'Dr. Mahantesh B. Patil', contact: 'mahantesh.patil@gmu.ac.in' },
  CV: { name: 'Prof. Rakesh N. Shetty', contact: 'rakesh.shetty@gmu.ac.in' },
  BT: { name: 'Dr. Kavitha S. Rao', contact: 'kavitha.rao@gmu.ac.in' },
  MB: { name: 'Dr. Suresh B. Kamath', contact: 'suresh.kamath@gmu.ac.in' },
};

const BLOOD_GROUPS = ['A+ve', 'B+ve', 'O+ve', 'AB+ve', 'A-ve', 'O-ve'];
const CATEGORIES = ['GM / General Merit', 'OBC / 2A', 'SC', 'ST', 'Cat-1'];
const SEM_BY_ADMISSION_YEAR: Record<number, number> = {
  2021: 8,
  2022: 6,
  2023: 4,
  2024: 2,
};
const ADMISSION_YEARS = [2021, 2022, 2023, 2024];

const pad = (value: number, size: number) => String(value).padStart(size, '0');

const buildStudent = (branch: BranchSeed, branchIndex: number, index: number): StudentProfile => {
  const n = branchIndex * 15 + index;
  const first = FIRST_NAMES[(n * 7 + 3) % FIRST_NAMES.length];
  const last = LAST_NAMES[(n * 11 + 5) % LAST_NAMES.length];
  const fatherFirst = FIRST_NAMES[(n * 5 + 11) % FIRST_NAMES.length];
  const motherFirst = FIRST_NAMES[(n * 9 + 17) % FIRST_NAMES.length];
  const admissionYear = ADMISSION_YEARS[n % ADMISSION_YEARS.length];
  const semester = SEM_BY_ADMISSION_YEAR[admissionYear];
  const cgpa = Number((6.5 + ((n * 37) % 33) / 10).toFixed(2));
  const mentor = MENTORS[branch.code];
  const gender = n % 2 === 0 ? 'Male' : 'Female';

  return {
    usn: `4GM${String(admissionYear).slice(-2)}${branch.code}${pad(index + 1, 3)}`,
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}${n}@student.gmu.ac.in`,
    phone: `+91 9${pad(400000000 + ((n * 7919) % 599999999), 9).slice(0, 9)}`,
    dob: `${pad((n % 28) + 1, 2)}-${['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][n % 12]}-${admissionYear - 18}`,
    gender,
    bloodGroup: BLOOD_GROUPS[n % BLOOD_GROUPS.length],
    category: CATEGORIES[n % CATEGORIES.length],
    program: branch.program,
    branch: branch.branch,
    semester,
    section: ['A', 'B', 'C'][n % 3],
    academicYear: '2025-2026',
    mentorName: mentor.name,
    mentorContact: mentor.contact,
    admissionYear,
    fatherName: `${fatherFirst} ${last}`,
    motherName: `${motherFirst} ${last}`,
    address: `#${10 + n}, ${['3rd', '4th', '5th', '6th'][n % 4]} Cross, ${['Vidyanagar', 'Shivamogga Road', 'P.J. Extension', 'Saraswathipuram'][n % 4]}, Davanagere, Karnataka - 57700${n % 10}`,
    cgpa,
    sgpaLatest: Number(Math.min(9.85, cgpa + 0.18).toFixed(2)),
    overallAttendance: Number((68 + ((n * 13) % 31) + 0.2).toFixed(1)),
    totalCredits: Math.min(160, semester * 20),
  };
};

export const NITHIN_STUDENT: StudentProfile = {
  usn: 'U26M02BA077',
  name: 'Nithin Kumar R',
  email: 'nithin.kumar@student.gmu.ac.in',
  phone: '7204483644',
  dob: '16/09/2004',
  gender: 'Male',
  bloodGroup: 'O+ve',
  category: 'Sports',
  program: 'Bachelor of Business Administration (BBA)',
  branch: 'Business Administration',
  semester: 1,
  section: 'A',
  academicYear: '2025-2026',
  mentorName: 'Dr. Suresh B. Kamath',
  mentorContact: 'suresh.kamath@gmu.ac.in',
  admissionYear: 2025,
  fatherName: 'Ravikumar R S',
  motherName: 'Lakshmi Ramesh',
  address:
    'S/O: Ravikumar R S,\n#680/7, 3rd Cross,\nNittuvalli Road, Bhagath Singh Nagar,\nVTC: Davanagere,\nPO: Jayadeva Circle-davanagere,\nSub District: Davanagere, District: Davangere,\nState: Karnataka,\nPIN Code: 577002',
  cgpa: 8.62,
  sgpaLatest: 8.75,
  overallAttendance: 92.4,
  totalCredits: 20,
  photo: '/student.jpeg',
};

/**
 * Full ERP roster: Nithin Kumar R, the seeded demo student, plus 120 students
 * across all eight faculties, so any listed USN can be used to sign in.
 */
export const STUDENTS: StudentProfile[] = [
  NITHIN_STUDENT,
  MOCK_STUDENT,
  ...BRANCHES.flatMap((branch, branchIndex) =>
    Array.from({ length: 15 }, (_, index) => buildStudent(branch, branchIndex, index)),
  ),
];

export const findStudentByUsn = (usn: string): StudentProfile | undefined => {
  const normalized = usn.trim().toUpperCase();
  return STUDENTS.find((student) => student.usn.toUpperCase() === normalized);
};
