import React, { useState } from 'react';
import { INITIAL_TRACKING_DATABASE } from './data/logisticsData';

// Layout & Shared Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastBanner, ServiceRfpModal, FranchiseModal } from './components/Modals';

// Pages
import HomePage from './pages/HomePage';
import ShipmentsPage from './pages/ShipmentsPage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

export default function App() {
  // Active Route State: 'home' | 'shipments' | 'services' | 'about' | 'contact' | 'login' | 'register'
  const [activePage, setActivePage] = useState('home');
  const [routeParams, setRouteParams] = useState({});

  // Shared App State
  const [user, setUser] = useState(null);
  const [trackingDatabase, setTrackingDatabase] = useState(INITIAL_TRACKING_DATABASE);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [selectedServiceForRfp, setSelectedServiceForRfp] = useState(null);
  const [isFranchiseModalOpen, setIsFranchiseModalOpen] = useState(false);

  const triggerToast = (msg) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    triggerToast(`Copied to clipboard: ${text}`);
  };

  const navigateTo = (pageName, params = {}) => {
    setActivePage(pageName);
    setRouteParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setUser(null);
    triggerToast('Logged out of Client Portal.');
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans antialiased selection:bg-rose-600 selection:text-white overflow-x-hidden">
      <ToastBanner message={feedbackMsg} />

      <Navbar
        activePage={activePage}
        navigateTo={navigateTo}
        user={user}
        handleLogout={handleLogout}
        openFranchiseModal={() => setIsFranchiseModalOpen(true)}
      />

      {/* PAGE ROUTES */}
      <div className="flex-1">
        {activePage === 'home' && (
          <HomePage
            navigateTo={navigateTo}
            openFranchiseModal={() => setIsFranchiseModalOpen(true)}
          />
        )}

        {activePage === 'shipments' && (
          <ShipmentsPage
            trackingDatabase={trackingDatabase}
            setTrackingDatabase={setTrackingDatabase}
            initialTab={routeParams.shipmentsTab || 'track'}
            initialTrackingId={routeParams.trackingId || 'SWD-884920-NG'}
            copyToClipboard={copyToClipboard}
            triggerToast={triggerToast}
          />
        )}

        {activePage === 'services' && (
          <ServicesPage
            onSelectServiceForRfp={(service) => setSelectedServiceForRfp(service)}
          />
        )}

        {activePage === 'about' && <AboutPage />}

        {activePage === 'contact' && (
          <ContactPage
            copyToClipboard={copyToClipboard}
            triggerToast={triggerToast}
          />
        )}

        {activePage === 'login' && (
          <LoginPage
            setUser={setUser}
            navigateTo={navigateTo}
            triggerToast={triggerToast}
          />
        )}

        {activePage === 'register' && (
          <RegisterPage
            setUser={setUser}
            navigateTo={navigateTo}
            triggerToast={triggerToast}
          />
        )}
      </div>

      <Footer
        navigateTo={navigateTo}
        openFranchiseModal={() => setIsFranchiseModalOpen(true)}
      />

      <ServiceRfpModal
        service={selectedServiceForRfp}
        onClose={() => setSelectedServiceForRfp(null)}
        triggerToast={triggerToast}
      />

      <FranchiseModal
        isOpen={isFranchiseModalOpen}
        onClose={() => setIsFranchiseModalOpen(false)}
        triggerToast={triggerToast}
      />
    </div>
  );
}
