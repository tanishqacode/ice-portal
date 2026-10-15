
import { useState } from "react";

import Header from "./components/Header/header";
import Sidebar from "./components/Sidebar/sidebar";
import AuthModal from "./components/Auth/authModal";
import Breadcrumb from "./components/layout/Breadcrumb";
import Footer from "./components/layout/Footer";

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Faculty from "./components/pages/Faculty";
import Academics from "./components/pages/Academics";
import Research from "./components/pages/Research";
import Students from "./components/pages/Students";
import Contact from "./components/pages/Contact";
import Profile from "./components/pages/Profile/profile";
import SectionPage from "./components/pages/SectionPage";
import Alumni from "./components/pages/Alumni";


const pageComponents = {
  Home,
  About,
  Faculty,
  Academics,
  Research,
  Students,
  Contact,
  Profile,
  "News & Events": SectionPage,
  // Alumini: SectionPage,
  Academics,
  Alumni,
  
};

const pageDescriptions = {
  About: {
    title: "About the Department",
    description:
      "Learn about the department, its academic environment, facilities and areas of focus.",
  },

  Faculty: {
    title: "Faculty",
    description:
      "Faculty profiles, research interests, qualifications and contact information will be available here.",
  },

  Academics: {
    title: "Academics",
    description:
      "Course information, academic resources, programme details and useful student information.",
  },

  Research: {
    title: "Research & Publications",
    description:
      "Explore research areas, faculty publications and research opportunities. Publication records can be connected to the database later.",
  },

  Students: {
    title: "Student Corner",
    description:
      "A space for student resources, projects, research collaboration and academic opportunities.",
  },

  Profile: {
    title: "My Profile",
    description:
      "Manage your personal information, academic details and research submissions.",
  },

  Alumini: {
    title: "Alumini",
    description:
      "Connect to your seniors for guidance and help regarding academic matters.",
  },

  "News & Events": {
    title: "News & Events",
    description:
      "Department announcements, seminars, workshops, talks and upcoming events.",
  },

  Contact: {
    title: "Contact the Department",
    description:
      "Department address, contact details and other official information will be added here.",
  },
};

export default function App() {
  const [activePage, setActivePage] = useState("Home");
  const [authOpen, setAuthOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Navigate between pages without reloading the website.
  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Frontend demo authentication.
  // Real authentication will be implemented with the backend.
  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    setAuthOpen(false);
  };

  // Log out and return to the Home page.
  const handleLogout = () => {
    setCurrentUser(null);
    setAuthOpen(false);
    setActivePage("Home");
  };

  // Select the component corresponding to the current page.
  const ActivePage = pageComponents[activePage] || SectionPage;

  const pageInfo = pageDescriptions[activePage];

  return (
    <div className="min-h-screen w-full bg-[#f5f7fa] text-slate-800">
      {/* Header and authentication */}
      <Header
        activePage={activePage}
        onNavigate={navigate}
        onAuthClick={() => setAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      {/* Page breadcrumb */}
      <Breadcrumb
        activePage={activePage}
        onNavigate={navigate}
      />

      {/* Main page content */}
      <main className="w-full px-4 py-7 sm:px-8 sm:py-9 lg:px-10">
        <div className="grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar navigation */}
          <Sidebar
            activePage={activePage}
            onNavigate={navigate}
          />

          {/* Dynamically rendered page */}
          <div className="min-w-0">
            <ActivePage
              onNavigate={navigate}
              currentUser={currentUser}
              title={pageInfo?.title || activePage}
              description={
                pageInfo?.description ||
                "Information for this section will be available soon."
              }
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* Login / Sign Up modal */}
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}
