import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WizardProvider } from './context/WizardContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { PostPropertyWizardPage } from './pages/PostPropertyWizardPage';
import { DashboardPage } from './pages/DashboardPage';
import { PropertyDetailsPage } from './pages/PropertyDetailsPage';
import { AIChatAssistant } from './components/ai/AIChatAssistant';

const AppContent: React.FC = () => {
  const [isGlobalAIChatOpen, setIsGlobalAIChatOpen] = useState(false);
  const location = useLocation();

  // Hide the global footer on the wizard page because it has its own fixed bottom navigation footer
  const showFooter = location.pathname !== '/post-property';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar onOpenAIChat={() => setIsGlobalAIChatOpen(true)} />

      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post-property" element={<PostPropertyWizardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/property/:id" element={<PropertyDetailsPage />} />
        </Routes>
      </main>

      {showFooter && <Footer />}

      <AIChatAssistant
        isOpen={isGlobalAIChatOpen}
        onClose={() => setIsGlobalAIChatOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <WizardProvider>
        <Router>
          <AppContent />
        </Router>
      </WizardProvider>
    </AuthProvider>
  );
};

export default App;
