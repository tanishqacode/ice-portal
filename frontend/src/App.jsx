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
  Academics,
  Research,
  Students,
  Contact,
  "News & Events": SectionPage,
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
    navigate("Home");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActivePage("Home");
  };
  const ActivePage = pageComponents[activePage];

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-slate-800">
      <Header
        activePage={activePage}
        onNavigate={navigate}
        onAuthClick={() => setAuthOpen(true)}
        currentUser={currentUser}
        onLogout={handleLogout}
      />

      <Breadcrumb activePage={activePage} onNavigate={navigate} />

      <main className="mx-auto max-w-7xl px-4 py-7 sm:px-8 sm:py-9">
        <div className="grid items-start gap-7 lg:grid-cols-[250px_minmax(0,1fr)]">
          <Sidebar activePage={activePage} onNavigate={navigate} />

          <div className="min-w-0">
            <ActivePage
              onNavigate={navigate}
              title="News & Events"
              description="Department announcements, seminars, workshops, talks and upcoming events."
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