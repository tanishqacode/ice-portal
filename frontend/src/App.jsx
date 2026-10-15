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
import SectionPage from "./components/pages/SectionPage";

const pageComponents = {
  Home,
  About,
  Faculty,
  Research,
  Students,
  Contact,
  "News & Events": SectionPage,
  Alumini: SectionPage,
  Academics,
};

const announcements = [
  {
    category: "Announcement",
    title: "Department announcements will appear here",
    date: "Updates coming soon",
  },
  {
    category: "Academic",
    title: "Academic notices and important information",
    date: "Updates coming soon",
  },
  {
    category: "Events",
    title: "Seminars, workshops and department events",
    date: "Updates coming soon",
  },
];

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

  const navigate = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAuthSuccess = (user) => {
    // Frontend demo only; real authentication comes with the backend.
    setCurrentUser(user);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage("Home");
  };

  const ActivePage = pageComponents[activePage] || SectionPage;
  const pageInfo = pageDescriptions[activePage];

  return (
    <div className="min-h-screen w-full bg-[#f5f7fa] text-slate-800">
      <Header
        activePage={activePage}
        onNavigate={navigate}
        onAuthClick={() => setAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Breadcrumb activePage={activePage} onNavigate={navigate} />

      <main className="w-full px-4 py-7 sm:px-8 sm:py-9 lg:px-10">
        <div className="grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Sidebar activePage={activePage} onNavigate={navigate} />

          <div className="min-w-0">
            <ActivePage
              onNavigate={navigate}
              title={pageInfo?.title || activePage}
              description={
                pageInfo?.description ||
                "Information for this section will be available soon."
              }
            />
          </div>
        </div>
      </main>

      <Footer onNavigate={navigate} />

      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      )}
    </div>
  );
}