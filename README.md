# ice-portal
# NITJ ICE Department Portal

**A Unified Platform for Academics, Research, Innovation & Alumni Collaboration**

A full-stack web portal for the Department of Instrumentation and Control Engineering (ICE) at Dr. B. R. Ambedkar National Institute of Technology (NIT), Jalandhar. Inspired by the department's official website, this project aims to build a modern, centralized platform for departmental information, faculty research publications, student research contributions, and alumni engagement.

🔗 **Reference Website:** [NITJ ICE Official Website](https://departments.nitj.ac.in/dept/ice/Home)

---

## 📌 About the Project

The NITJ ICE Department Portal aims to recreate and enhance the existing departmental website with a more interactive interface and research-focused features.

Beyond displaying departmental information, the portal will provide a centralized repository where faculty members can showcase their research papers, publications, projects, and research interests. Students will be able to explore research opportunities, discover faculty expertise, and contribute to collaborative academic work. An integrated alumni network will help graduates reconnect with the department, share their professional experiences, and organize expert talks, guest lectures, mentorship sessions, and technical workshops.

The goal is to create a connected academic ecosystem that brings together **faculty, students, researchers, and alumni** on a single platform.

## 🎯 Objectives

- Recreate the official ICE departmental website with a modern, responsive user interface.
- Centralize faculty profiles, research papers, publications, and ongoing research projects.
- Provide students with better access to research opportunities and academic resources.
- Build an alumni network for mentorship, expert talks, guest lectures, and career guidance.
- Simplify departmental updates, events, announcements, and academic information management.
- Develop a scalable platform using the MERN stack.

## ✨ Key Features

### 1. Department Information Portal
- Department overview, vision, mission, and academic programs.
- Faculty directory with detailed faculty profiles.
- Information about laboratories, facilities, and research areas.
- Departmental news, announcements, activities, and upcoming events.

### 2. Faculty Research Repository
- Dedicated research profiles for every faculty member.
- Upload and manage research papers and publications.
- Store paper titles, abstracts, authors, publication years, journals, and DOI or external links.
- Attach PDFs where sharing is authorized.
- Display research interests, funded projects, patents, and collaborations.
- Search and filter publications by faculty member, topic, year, or publication type.
- Provide direct access to individual publication details.

### 3. Student Research & Collaboration
- Student profiles and research interests.
- Showcase student projects, research papers, and technical achievements.
- Discover faculty members working in relevant research areas.
- Explore research projects and potential collaboration opportunities.
- Connect student contributions with associated faculty members and publications.

### 4. Alumni Network
- Alumni registration and professional profiles.
- Graduation year, current organization, designation, expertise, and professional links.
- Search and discover alumni by graduation year, industry, or expertise.
- Alumni-led expert talks, guest lectures, and technical sessions.
- Event registration and participation management.
- Mentorship and career-guidance opportunities.
- Alumni achievements, experiences, and departmental contributions.

### 5. Events & Announcements
- Publish departmental seminars, workshops, conferences, and technical events.
- Display event dates, venues, speakers, descriptions, and registration links.
- Feature alumni talks and industry interactions.
- Maintain upcoming and past event records.
- Publish news, achievements, and important announcements.

### 6. Admin & Content Management
- Secure authentication and role-based permissions.
- Manage faculty, student, and alumni profiles.
- Create, update, and remove departmental announcements and events.
- Review submitted publications and student contributions before publishing.
- Manage uploaded research documents and associated metadata.
- Provide a centralized dashboard for departmental content management.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend UI and reusable components |
| Node.js | Backend JavaScript runtime |
| Express.js | REST API and server-side logic |
| MongoDB | Database for profiles, publications, events, and research records |
| Mongoose | MongoDB object modeling and schema validation |
| JWT | Authentication and session token handling |
| bcrypt | Secure password hashing |
| Tailwind CSS | Responsive styling and UI design |
| Git & GitHub | Version control and team collaboration |

**Architecture:** MERN Stack — MongoDB, Express.js, React.js, and Node.js.

## 🏗️ Proposed System Architecture

```text
                 Users
                   |
                   v
          React.js Frontend
                   |
             REST API Calls
                   |
                   v
          Node.js + Express
                   |
          Authentication &
           Business Logic
                   |
                   v
              Mongoose
                   |
                   v
               MongoDB
                   |
        Profiles | Research
        Events   | Publications
        Alumni   | Announcements
```

The frontend will communicate with the backend through REST APIs. Express will handle requests, authentication, validation, and business logic, while MongoDB will store structured departmental data. Research documents can be stored using a suitable file-storage service, with their metadata and access links maintained in the database.

## 📂 Proposed Project Structure

```text
nitj-ice-portal/
│
├── client/                         # React frontend
│   ├── public/
│   └── src/
│       ├── assets/
│       ├── components/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Faculty.jsx
│       │   ├── FacultyProfile.jsx
│       │   ├── Research.jsx
│       │   ├── Publications.jsx
│       │   ├── Students.jsx
│       │   ├── Alumni.jsx
│       │   ├── Events.jsx
│       │   └── AdminDashboard.jsx
│       ├── layouts/
│       ├── services/
│       ├── hooks/
│       ├── context/
│       ├── App.jsx
│       └── main.jsx
│
├── server/                         # Express backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── app.js
│   └── server.js
│
├── docs/                           # Project documentation
├── .gitignore
├── README.md
└── package.json
```

*This is the proposed structure and may evolve as development progresses.*

## 🗃️ Core Data Models

The following MongoDB collections are planned:

| Model | Main Information |
|---|---|
| User | Name, email, password hash, role, account status |
| Faculty | Designation, qualifications, research interests, profile details |
| Student | Academic details, research interests, projects |
| Publication | Title, abstract, authors, DOI, year, PDF URL, research keywords |
| ResearchProject | Title, description, associated faculty and students, status |
| Alumni | Graduation year, current organization, designation, expertise |
| Event | Title, date, venue, speaker, description, registration details |
| Announcement | Title, content, category, publication date |

References between documents will connect publications with authors, projects with faculty and students, and events with their speakers or organizers.

## 🔐 User Roles & Permissions

The planned access model includes:

- **Administrator:** Manages departmental content, users, events, and publication approvals.
- **Faculty:** Maintains their profiles, submits publications, and manages research information.
- **Student:** Maintains permitted profile information, showcases projects, and explores research opportunities.
- **Alumni:** Maintains professional profiles, participates in events, and contributes to mentorship activities.
- **Public Visitor:** Browses publicly available departmental information, faculty profiles, and published research.

Permissions will be enforced on the backend, not just by hiding frontend controls.

## 🚀 Getting Started

### Prerequisites

Install the following before running the project:

- [Node.js](https://nodejs.org/)
- npm
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) or a MongoDB Atlas account
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd nitj-ice-portal
```

### 2. Install Dependencies

```bash
cd client
npm install

cd ../server
npm install
```

### 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory.

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_random_secret
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

Replace the placeholder values with your own configuration. Never commit secrets, database credentials, or private keys to GitHub.

### 4. Run the Backend

From the `server/` directory:

```bash
npm run dev
```

### 5. Run the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

Open the local URL printed by Vite in your terminal to access the frontend.

*Note: These commands assume the corresponding npm scripts have been configured in each package's `package.json`.*

## 🗺️ Development Roadmap

- [ ] **Phase 1 — UI & Department Pages**
  - Recreate the homepage and navigation.
  - Build About, Faculty, Research, Events, and Alumni pages.
  - Ensure responsive layouts across devices.

- [ ] **Phase 2 — Backend & Database**
  - Configure Express and MongoDB.
  - Design schemas and REST API endpoints.
  - Implement validation and error handling.

- [ ] **Phase 3 — Authentication & Profiles**
  - Implement registration and login.
  - Add role-based authorization.
  - Build faculty, student, and alumni profile management.

- [ ] **Phase 4 — Research Repository**
  - Implement publication submission and management.
  - Add document links, metadata, search, and filters.
  - Connect publications with faculty and student contributors.

- [ ] **Phase 5 — Alumni & Events**
  - Implement alumni directories and professional profiles.
  - Add expert talks, guest lectures, event registration, and mentorship features.
  - Build announcements and event management.

- [ ] **Phase 6 — Admin Dashboard & Testing**
  - Implement content approval workflows.
  - Test API endpoints, permissions, and validation.
  - Improve security, performance, accessibility, and responsiveness.

- [ ] **Phase 7 — Deployment**
  - Deploy the frontend and backend.
  - Configure production database access and environment variables.
  - Add a production URL and usage documentation.



Example:

```bash
git checkout -b feature/research-repository
git add .
git commit -m "feat: add faculty research repository"
git push origin feature/research-repository
```

For collaborative development, keep changes focused, avoid committing secrets, and document new environment variables or setup requirements.

## 🔮 Future Enhancements

- Advanced publication search and research-area recommendations.
- DOI-based publication metadata retrieval.
- Faculty-student collaboration requests.
- Alumni mentorship matching.
- Automated notifications for new papers and upcoming events.
- Research analytics and publication statistics.
- Integration with external academic profiles such as ORCID and Google Scholar.
- Improved accessibility and multilingual support.

## 📄 Disclaimer

This is an independent academic development project inspired by the publicly available NIT Jalandhar ICE departmental website. It is intended to improve access to departmental information, research, and alumni collaboration. It is not an official institutional platform unless formally approved and adopted by the institute.

Official institutional branding, personal information, research documents, and publication files should only be used with appropriate authorization and attribution.

## 👥 Contributors

TANISHA 
TANISHQA 
VRINDA SHARMA 

- **Team:** NITJ ICE Portal Development Team
- **Institution:** Dr. B. R. Ambedkar National Institute of Technology, Jalandhar
- **Department:** Instrumentation and Control Engineering

---

**Built with the MERN stack to connect research, people, and opportunities.**
