import React, { useState } from 'react';
import { 
  GraduationCap, 
  User, 
  Users,
  LogOut, 
  Award, 
  CreditCard, 
  Clock, 
  BookOpen, 
  Download, 
  CheckCircle2, 
  Printer
} from 'lucide-react';
import { 
  MOCK_ATTENDANCE, 
  MOCK_MARKS, 
  MOCK_FEES, 
  MOCK_TIMETABLE, 
  UNIVERSITY_INFO,
  CURRENT_YEAR 
} from '../data/mockData';
import { STUDENTS } from '../data/students';
import type { StudentProfile } from '../types';

const semesterOrdinal = (semester: number) =>
  ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'][semester] ?? `${semester}th`;

interface StudentDashboardProps {
  student: StudentProfile;
  onLogout: () => void;
  onBackToHome: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, onLogout, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'attendance' | 'marks' | 'timetable' | 'fees' | 'students'>('overview');
  const [downloadMsg, setDownloadMsg] = useState<string | null>(null);
  const [studentQuery, setStudentQuery] = useState('');

  const initials = student.name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const query = studentQuery.trim().toLowerCase();
  const visibleStudents = query
    ? STUDENTS.filter((entry) =>
        [entry.name, entry.usn, entry.branch, entry.program, entry.section]
          .join(' ')
          .toLowerCase()
          .includes(query),
      )
    : STUDENTS;

  const triggerDownload = (filename: string) => {
    setDownloadMsg(`Generating & downloading ${filename}...`);
    setTimeout(() => {
      setDownloadMsg(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-cream-soft flex flex-col">
      
      {/* Toast Notification */}
      {downloadMsg && (
        <div className="fixed top-6 right-6 z-50 bg-maroon text-white px-5 py-3 rounded-[3px] shadow-2xl border border-gold/40 flex items-center space-x-3 text-xs animate-bounce">
          <Download className="w-4 h-4 text-gold" />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Top Navbar */}
      <header className="bg-maroon text-white sticky top-0 z-40 border-b border-maroon-deep shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* University & ERP Title */}
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-[3px] bg-gold flex items-center justify-center text-maroon border border-gold-deep">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="font-bold text-sm sm:text-base font-serif tracking-wide block">
                  {UNIVERSITY_INFO.name} — Student Academic Portal
                </span>
                <span className="text-[10px] text-cream font-mono">
                  ERP Session: Even Semester 2025-26
                </span>
              </div>
            </div>

            {/* User Info & Actions */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="hidden md:block text-right">
                <div className="text-xs font-bold text-white">{student.name}</div>
                <div className="text-[10px] text-gold font-mono">USN: {student.usn}</div>
              </div>

              <button
                onClick={onBackToHome}
                className="hidden sm:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-cream border border-white/20 transition-colors"
              >
                Website Home
              </button>

              <button
                onClick={onLogout}
                className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold bg-gold text-maroon hover:bg-gold-deep shadow-sm transition-colors"
              >
                <LogOut className="w-3.5 h-3.5 mr-1" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        
        {/* Student Profile Identity Card */}
        <div className="bg-white rounded-[4px] border border-[#eee4d2] shadow-sm p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#f0e3cf]">
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
              {/* Avatar */}
              {student.photo ? (
                <img
                  src={student.photo}
                  alt={`${student.name} photo`}
                  className="w-20 h-20 rounded-[4px] object-cover shadow-md border-2 border-gold"
                />
              ) : (
                <div className="w-20 h-20 rounded-[4px] bg-maroon text-gold flex items-center justify-center font-serif text-2xl shadow-md border-2 border-gold">
                  {initials}
                </div>
              )}

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-black text-maroon font-serif">
                    {student.name}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-cream text-maroon-deep border border-gold/50">
                    Active Student
                  </span>
                </div>

                <p className="text-xs text-mute font-medium">
                  {student.program} &bull; Section {student.section}
                </p>

                <div className="flex flex-wrap items-center gap-3 text-xs text-mute font-mono pt-0.5">
                  <span className="bg-cream-soft px-2 py-0.5 rounded text-maroon-deep font-bold">
                    USN: {student.usn}
                  </span>
                  <span>Semester: <strong>{semesterOrdinal(student.semester)} Sem</strong></span>
                  <span>Batch: <strong>{student.admissionYear} - 2026</strong></span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={() => triggerDownload(`HallTicket_${student.usn}.pdf`)}
                className="px-4 py-2 bg-maroon hover:bg-maroon-deep text-white rounded-[3px] text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Hall Ticket</span>
              </button>
              <button
                onClick={() => triggerDownload(`GradeCard_${student.usn}.pdf`)}
                className="px-4 py-2 bg-cream-soft hover:bg-cream text-ink rounded-[3px] text-xs font-bold transition-all flex items-center space-x-1.5 border border-[#eee4d2]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Grade Card</span>
              </button>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6">
            <div className="p-4 rounded-[4px] bg-cream-soft border border-gold/40">
              <div className="text-xs font-semibold text-maroon uppercase tracking-wider flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1 text-maroon" />
                Overall Attendance
              </div>
              <div className="mt-2 text-2xl font-black text-maroon-deep font-mono">
                {student.overallAttendance}%
              </div>
              <div className="text-[11px] text-maroon-deep font-semibold mt-0.5">
                Eligible for Semester End Exams (SEE)
              </div>
            </div>

            <div className="p-4 rounded-[4px] bg-cream-soft border border-gold/40">
              <div className="text-xs font-semibold text-maroon-deep uppercase tracking-wider flex items-center">
                <Award className="w-4 h-4 mr-1 text-gold-deep" />
                Cumulative CGPA
              </div>
              <div className="mt-2 text-2xl font-black text-maroon-deep font-mono">
                {student.cgpa} / 10.0
              </div>
              <div className="text-[11px] text-mute font-medium mt-0.5">
                First Class with Distinction
              </div>
            </div>

            <div className="p-4 rounded-[4px] bg-cream-soft border border-gold/40">
              <div className="text-xs font-semibold text-maroon-deep uppercase tracking-wider flex items-center">
                <BookOpen className="w-4 h-4 mr-1 text-maroon-soft" />
                Credits Earned
              </div>
              <div className="mt-2 text-2xl font-black text-maroon-deep font-mono">
                {student.totalCredits} / 160
              </div>
              <div className="text-[11px] text-mute font-medium mt-0.5">
                Required for Degree Award: 160
              </div>
            </div>

            <div className="p-4 rounded-[4px] bg-cream-soft border border-gold/40">
              <div className="text-xs font-semibold text-maroon-deep uppercase tracking-wider flex items-center">
                <CreditCard className="w-4 h-4 mr-1 text-maroon-deep" />
                Tuition Fee Dues
              </div>
              <div className="mt-2 text-2xl font-black text-maroon-deep font-mono">
                ₹0.00
              </div>
              <div className="text-[11px] text-maroon-deep font-semibold mt-0.5">
                All {semesterOrdinal(student.semester)} Sem Fees Paid
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#eee4d2] pb-2">
          {[
            { id: 'overview', label: 'Student Profile & Details', icon: User },
            { id: 'attendance', label: 'Subject Attendance', icon: CheckCircle2 },
            { id: 'marks', label: 'Internal Marks & Results', icon: Award },
            { id: 'timetable', label: 'Class Timetable', icon: Clock },
            { id: 'fees', label: 'Fee Receipts', icon: CreditCard },
            { id: 'students', label: `Student Directory (${STUDENTS.length})`, icon: Users },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-[3px] text-xs sm:text-sm font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-maroon text-white shadow-sm'
                    : 'bg-white text-ink hover:bg-cream-soft border border-[#eee4d2]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Profile & Biographical Details */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-maroon uppercase tracking-wider border-b border-[#f0e3cf] pb-3 flex items-center">
                <User className="w-4 h-4 mr-2 text-maroon" />
                Personal Information
              </h3>
              <div className="divide-y divide-[#f0e3cf] text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Full Name:</span>
                  <span className="font-semibold text-maroon">{student.name}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Date of Birth:</span>
                  <span className="font-semibold text-maroon">{student.dob}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Gender / Blood Group:</span>
                  <span className="font-semibold text-maroon">{student.gender} &bull; {student.bloodGroup}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Category / Quota:</span>
                  <span className="font-semibold text-maroon">{student.category}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Mobile Phone:</span>
                  <span className="font-mono text-maroon font-semibold">{student.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-maroon uppercase tracking-wider border-b border-[#f0e3cf] pb-3 flex items-center">
                <GraduationCap className="w-4 h-4 mr-2 text-maroon" />
                Academic & Mentor Details
              </h3>
              <div className="divide-y divide-[#f0e3cf] text-xs">
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Branch & Dept:</span>
                  <span className="font-semibold text-maroon">{student.branch}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Faculty Proctor / Mentor:</span>
                  <span className="font-semibold text-maroon-deep">{student.mentorName}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Mentor Contact:</span>
                  <span className="font-mono text-maroon">{student.mentorContact}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-mute">Parent / Guardian:</span>
                  <span className="font-semibold text-maroon">{student.fatherName}</span>
                </div>
                <div className="py-2.5 flex flex-col space-y-1">
                  <span className="text-mute">Permanent Address:</span>
                  <span className="font-medium text-ink whitespace-pre-line">{student.address}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Attendance Register */}
        {activeTab === 'attendance' && (
          <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0e3cf]">
              <div>
                <h3 className="text-lg font-bold text-maroon font-serif">
                  Subject-Wise Attendance Register ({semesterOrdinal(student.semester)} Semester)
                </h3>
                <p className="text-xs text-mute">
                  Minimum 75% attendance in each subject is mandatory as per University Examination Regulations.
                </p>
              </div>
              <div className="flex items-center space-x-2 text-xs">
                <span className="px-2.5 py-1 rounded bg-cream text-maroon-deep font-bold">&ge; 75% Normal</span>
                <span className="px-2.5 py-1 rounded bg-[#f7e6e6] text-maroon font-bold">&lt; 75% Shortage</span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="gmu-table w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-cream-soft border-b border-[#eee4d2] text-ink font-bold uppercase tracking-wider">
                    <th className="p-3">Course Code</th>
                    <th className="p-3">Course Title</th>
                    <th className="p-3">Faculty In-Charge</th>
                    <th className="p-3 text-center">Classes Held</th>
                    <th className="p-3 text-center">Attended</th>
                    <th className="p-3 text-center">Attendance %</th>
                    <th className="p-3 text-center">Eligibility</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e3cf]">
                  {MOCK_ATTENDANCE.map((sub) => (
                    <tr key={sub.code} className="hover:bg-cream-soft transition-colors">
                      <td className="p-3 font-mono font-bold text-maroon">{sub.code}</td>
                      <td className="p-3 font-semibold text-maroon">{sub.name}</td>
                      <td className="p-3 text-mute">{sub.faculty}</td>
                      <td className="p-3 text-center font-mono text-ink">{sub.held}</td>
                      <td className="p-3 text-center font-mono text-maroon font-bold">{sub.attended}</td>
                      <td className="p-3 text-center">
                        <span className={`font-mono font-bold px-2 py-0.5 rounded ${
                          sub.percentage >= 75 ? 'bg-cream text-maroon-deep' : 'bg-[#f7e6e6] text-maroon'
                        }`}>
                          {sub.percentage}%
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center text-maroon-deep font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-maroon-soft" />
                          Eligible
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Internal Marks & Results */}
        {activeTab === 'marks' && (
          <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0e3cf]">
              <div>
                <h3 className="text-lg font-bold text-maroon font-serif">
                  Continuous Internal Evaluation (CIE / IA Marks)
                </h3>
                <p className="text-xs text-mute">
                  Assessment components: Internal Assessment 1 (30), IA 2 (30), Average & Practical Labs.
                </p>
              </div>
              <button
                onClick={() => triggerDownload(`ResultTranscript_${student.usn}.pdf`)}
                className="px-3.5 py-1.5 bg-maroon text-white rounded-[3px] text-xs font-semibold hover:bg-white/20 transition-colors flex items-center space-x-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Transcript</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="gmu-table w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-cream-soft border-b border-[#eee4d2] text-ink font-bold uppercase tracking-wider">
                    <th className="p-3">Course Code</th>
                    <th className="p-3">Subject Name</th>
                    <th className="p-3 text-center">Credits</th>
                    <th className="p-3 text-center">IA-1 (30)</th>
                    <th className="p-3 text-center">IA-2 (30)</th>
                    <th className="p-3 text-center">Average IA</th>
                    <th className="p-3 text-center">Practical (50)</th>
                    <th className="p-3 text-center">Provisional Grade</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e3cf]">
                  {MOCK_MARKS.map((m) => (
                    <tr key={m.subjectCode} className="hover:bg-cream-soft transition-colors">
                      <td className="p-3 font-mono font-bold text-maroon">{m.subjectCode}</td>
                      <td className="p-3 font-semibold text-maroon">{m.subjectName}</td>
                      <td className="p-3 text-center font-mono">{m.credits}</td>
                      <td className="p-3 text-center font-mono font-medium">{m.ia1}</td>
                      <td className="p-3 text-center font-mono font-medium">{m.ia2}</td>
                      <td className="p-3 text-center font-mono font-bold text-maroon-deep">{m.iaAvg}</td>
                      <td className="p-3 text-center font-mono text-ink">{m.labMarks || '-'}</td>
                      <td className="p-3 text-center">
                        <span className="font-bold text-maroon-deep bg-cream-soft px-2.5 py-1 rounded-md border border-gold/50">
                          {m.grade}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: Timetable */}
        {activeTab === 'timetable' && (
          <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e3cf]">
              <div>
                <h3 className="text-lg font-bold text-maroon font-serif">
                  Weekly Class Timetable ({student.branch} - {semesterOrdinal(student.semester)} Sem, Section {student.section})
                </h3>
                <p className="text-xs text-mute">Room No: LH-304 & Advanced Software Lab (Block 2)</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="gmu-table w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-cream-soft border-b border-[#eee4d2] text-ink font-bold uppercase tracking-wider">
                    <th className="p-3">Day</th>
                    <th className="p-3">09:00 - 10:00 AM</th>
                    <th className="p-3">10:00 - 11:00 AM</th>
                    <th className="p-3">11:15 - 01:15 PM</th>
                    <th className="p-3">02:00 - 04:00 PM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e3cf]">
                  {MOCK_TIMETABLE.map((row) => (
                    <tr key={row.day} className="hover:bg-cream-soft">
                      <td className="p-3 font-bold text-maroon bg-cream/40">{row.day}</td>
                      <td className="p-3 font-medium text-ink">{row.slot1}</td>
                      <td className="p-3 font-medium text-ink">{row.slot2}</td>
                      <td className="p-3 font-medium text-maroon bg-cream/50">{row.slot3}</td>
                      <td className="p-3 font-medium text-maroon-deep bg-cream-soft">{row.slot4}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 5: Fee Receipts */}
        {activeTab === 'fees' && (
          <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-[#f0e3cf]">
              <div>
                <h3 className="text-lg font-bold text-maroon font-serif">
                  Tuition Fee Payment History & Receipts
                </h3>
                <p className="text-xs text-mute">Official digitally verifiable e-receipts for academic fees</p>
              </div>
            </div>

            <div className="space-y-3">
              {MOCK_FEES.map((fee) => (
                <div
                  key={fee.receiptNo}
                  className="p-4 rounded-[4px] border border-[#eee4d2] hover:border-gold transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-xs font-bold text-maroon">{fee.receiptNo}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-cream text-maroon-deep font-bold">
                        {fee.status}
                      </span>
                      <span className="text-xs text-mute/80">{fee.date}</span>
                    </div>
                    <div className="text-sm font-bold text-maroon">{fee.semester}</div>
                    <p className="text-xs text-mute">{fee.description} &bull; Mode: {fee.mode}</p>
                  </div>

                  <div className="flex items-center space-x-4 sm:text-right">
                    <div>
                      <div className="text-lg font-black text-maroon font-mono">₹{fee.amount.toLocaleString()}</div>
                      <div className="text-[10px] text-maroon-soft font-semibold">Payment Verified</div>
                    </div>
                    <button
                      onClick={() => triggerDownload(`FeeReceipt_${fee.receiptNo}.pdf`)}
                      className="p-2.5 rounded-[3px] bg-cream-soft hover:bg-cream text-ink transition-colors"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Student Directory */}
        {activeTab === 'students' && (
          <div className="bg-white rounded-[4px] border border-[#eee4d2] p-6 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0e3cf]">
              <div>
                <h3 className="text-lg font-bold text-maroon font-serif">
                  University Student Directory
                </h3>
                <p className="text-xs text-mute">
                  {STUDENTS.length} students across eight faculties. Sign in with any listed USN to open that student&apos;s portal.
                </p>
              </div>
              <input
                type="search"
                value={studentQuery}
                onChange={(e) => setStudentQuery(e.target.value)}
                placeholder="Search name, USN, branch..."
                className="w-full sm:w-64 px-3 py-2 text-xs border border-[#ddd] rounded-[3px] focus:outline-none focus:border-gold-deep"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold">
              <span className="px-2.5 py-1 rounded bg-cream text-maroon-deep">
                Showing {visibleStudents.length} of {STUDENTS.length}
              </span>
              <span className="px-2.5 py-1 rounded bg-cream-soft text-mute border border-[#eee4d2]">
                CSE, AI &amp; DS, ISE, ECE, Mechanical, Civil, Biotech, MBA
              </span>
            </div>

            <div className="overflow-x-auto max-h-[32rem] overflow-y-auto border border-[#f0e3cf] rounded-[3px]">
              <table className="gmu-table w-full text-left text-xs border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-cream-soft border-b border-[#eee4d2] text-ink font-bold uppercase tracking-wider">
                    <th className="p-3">USN</th>
                    <th className="p-3">Student Name</th>
                    <th className="p-3">Program / Branch</th>
                    <th className="p-3 text-center">Sem</th>
                    <th className="p-3 text-center">Section</th>
                    <th className="p-3 text-center">CGPA</th>
                    <th className="p-3 text-center">Attendance</th>
                    <th className="p-3">Mentor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#f0e3cf]">
                  {visibleStudents.map((entry) => {
                    const isCurrent = entry.usn === student.usn;
                    return (
                      <tr
                        key={entry.usn}
                        className={isCurrent ? 'bg-cream-soft' : 'hover:bg-cream-soft transition-colors'}
                      >
                        <td className="p-3 font-mono font-bold text-maroon whitespace-nowrap">
                          {entry.usn}
                          {isCurrent && (
                            <span className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-maroon text-gold font-sans font-bold">
                              You
                            </span>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-maroon whitespace-nowrap">{entry.name}</td>
                        <td className="p-3 text-mute">{entry.branch}</td>
                        <td className="p-3 text-center font-mono">{entry.semester}</td>
                        <td className="p-3 text-center font-mono">{entry.section}</td>
                        <td className="p-3 text-center font-mono font-bold text-maroon-deep">{entry.cgpa.toFixed(2)}</td>
                        <td className="p-3 text-center font-mono">{entry.overallAttendance}%</td>
                        <td className="p-3 text-mute whitespace-nowrap">{entry.mentorName}</td>
                      </tr>
                    );
                  })}
                  {visibleStudents.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-6 text-center text-mute">
                        No students match &quot;{studentQuery}&quot;.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-[#eee4d2] py-4 text-center text-xs text-mute mt-auto">
        &copy; {CURRENT_YEAR} {UNIVERSITY_INFO.fullName} &bull; ERP Helpdesk: erpsupport@gmu.ac.in
      </footer>

    </div>
  );
};
