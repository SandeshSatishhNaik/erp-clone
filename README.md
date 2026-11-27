# GMU Academic ERP & University Web Application Clone

A modern, high-performance, responsive academic web portal and student ERP system built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**.

---

## 🚀 Getting Started

To launch the development server:

```bash
npm install
npm run dev
```

Then navigate to `http://localhost:5173` in your browser.

---

## 🎓 Core Features & Modules

### 1. Main University Website (`GMU Portal`)
- **Accreditation & Helplines Banner:** Top quick-contact, NAAC A+ accreditation status, toll-free lines.
- **Header & Navigation:** Responsive navbar with program links, examination notifications, and direct ERP login switch.
- **Hero Showcase:** High-impact university banner, interactive live search for degree programs, and key statistics (₹38.5 LPA highest package, 94% placements, 18,000+ students).
- **Interactive Degree Finder:** Filter academic programs by level (Undergraduate, Postgraduate, Doctoral) or search by keyword with intake capacity and eligibility criteria.
- **Examinations & Circulars Board:** Filterable notification center (Examinations, Academic, Placement, General) with PDF download actions.
- **Corporate Placements Section:** Statistics and recruiter showcases (Infosys, TCS, Bosch, Amazon, L&T, etc.).
- **Interactive Admissions Inquiry Modal:** Multi-step inquiry form with client validation and feedback.

### 2. Academic ERP Login Portal (`/erp-login`)
- **Role Switcher:** Dedicated tabs for **Student Login** and **Faculty/Staff Login**.
- **Dynamic Security Captcha:** Real-time generated alphanumeric captcha with one-click reload.
- **One-Click Demo Autofill:**
  - **Student Account:** `USN: 4GM22CS084` | `Password: student@123`
  - **Faculty Account:** `ID: EMP-CSE-402` | `Password: faculty@123`
- **Password Recovery Dialog:** Working modal simulating password reset instructions sent to student email.
- **Verification Flow:** Realistic authentication delay with loading states and validation.

### 3. Student ERP Academic Dashboard & Profile (`/erp-dashboard`)
- **Student Profile Identity Card:** Full biographical details, USN, mentor info, parent contacts, address, semester & section.
- **Live Key Academic Indicators:**
  - Overall Attendance: `89.2%` (Exam Eligible status)
  - CGPA: `8.84 / 10.0` (First Class with Distinction)
  - Degree Credits: `136 / 160`
  - Tuition Dues: `₹0.00` (Cleared)
- **Subject-Wise Attendance Register:** Detailed table of 7 subjects with classes held, attended, percentage, and minimum 75% threshold badge.
- **Internal Assessment (IA) & Grade Report:** CIE 1, CIE 2, average, lab practical marks, and provisional letter grades.
- **Weekly Class Timetable:** Monday through Saturday lecture and lab room schedule.
- **Tuition Fee History & Receipts:** Downloadable e-receipts with transaction IDs.
- **Hall Ticket & Grade Card:** Download/print actions with toast feedback.
- **Session Logout:** Secure exit back to the ERP login or main portal.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons:** Lucide React
- **Linter:** Oxlint (0 warnings, 0 errors)
