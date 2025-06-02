# 🎭 DanceSync Rec Club - Dance Management System
<div align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
  <img src="https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
</div>
<div align="center">
  <p><em>A comprehensive web application for managing dance club activities, memberships, and finances</em></p>
</div>

https://github.com/georgecuiX/DanceSyncRecClub/assets/89486336/9ea51440-55c2-4243-a2bc-e7a0f262955e

## 🌟 Overview

DanceSync Rec Club is a full-stack dance club management system that brings the joy of dance and community together in one seamless platform. Built with modern web technologies, it provides an intuitive interface for members, coaches, and administrators to manage practices, track attendance, handle payments, and foster communication within the dance community.

## ✨ Features
### 👥 Multi-Role Authentication System
- **Members** - Schedule practices, track attendance, receive notifications
- **Coaches** - Manage practice sessions, update member lists, communicate with the club
- **Administrators** - Oversee finances, manage memberships, coordinate schedules

### 📅 Smart Practice Management
- Interactive calendar with practice scheduling
- Real-time availability tracking
- Automated coach assignment system
- Flexible pay-as-you-go or advance payment options

### 💰 Financial Dashboard
- Comprehensive income statements
- Monthly revenue and expense tracking
- Member payment status monitoring
- Discount management for frequent attendees

### 📢 Communication Hub
- Centralized message board for announcements
- Role-based messaging system
- Real-time notifications and reminders
- Community engagement features

### 📊 Member Management
- Detailed member database
- Attendance tracking and reporting
- Payment history and status
- Automated discount calculations

## Tech Stack
### Frontend
- **React 18.2** - UI library for building interactive interfaces
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **React DatePicker** - Date and time selection
- **Axios** - HTTP client for API requests
- **date-fns** - Modern JavaScript date utility library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight database engine
- **CORS** - Cross-origin resource sharing
- **Nodemon** - Development auto-restart utility

### Database Schema
The application uses SQLite with the following main tables:
- _memberpass_ / _coachpass_ / _adminpass_ - Authentication credentials
- _members_ / _coachs_ / _admins_ - User profiles
- _messages_ - Communication messages
- _membermanage_ - Member management records

## 🛠️ Installation & Setup
### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps
**1. Clone the repository**
```
git clone https://github.com/yourusername/rec-club.git
cd rec-club/club-membership
```

**2. Install Frontend Dependancies**
```
npm install
```

**3. Install Backend Dependancies**
```
cd server
npm install
```

**4. Start the Backend Server**
```
npm run dev
```

**5. Start the Frontend Application** (in a new terminal)
```
cd ..
npm start
```
