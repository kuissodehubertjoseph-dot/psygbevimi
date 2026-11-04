import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Reassurance } from './components/Reassurance';
import { Recognize } from './components/Recognize';
import { Founder } from './components/Founder';
import { Programs } from './components/Programs';
import { Steps } from './components/Steps';
import { InitiativePage } from './components/InitiativePage';
import { ProgramDetail } from './components/ProgramDetail';
import { TestsPage } from './components/TestsPage';
import { FirstStep } from './components/FirstStep';
import { ArticlePage } from './components/ArticlePage';
import { TestRunner } from './components/TestRunner';
import { TestResult } from './components/TestResult';
import { PrivacyPage, LegalNoticePage, TermsPage, GdprPage } from './components/LegalPages';
import { TestPreview } from './components/TestPreview';
import { Book } from './components/Book';
import { Community } from './components/Community';
import { Articles } from './components/Articles';
import { Faq } from './components/Faq';
import { FinalCta } from './components/FinalCta';
import { Footer } from './components/Footer';
import { BottomNav } from './components/BottomNav';

export default function App() {
  const [highlightedProgramId, setHighlightedProgramId] = useState<string | null>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  // Chaque page s'ouvre en haut
  useEffect(() => {
    if (hash) {
      // Lien vers une ancre (ex. « /#accompagnements ») : on attend que la page soit montée
      const timer = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView(), 50);
      return () => clearTimeout(timer);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  const handleHighlightProgram = (programId: 'sante' | 'coaching' | 'jeune' | 'entreprise') => {
    if (highlightTimeoutRef.current) {
      clearTimeout(highlightTimeoutRef.current);
    }
    setHighlightedProgramId(programId);
    navigate('/accompagnements');
    highlightTimeoutRef.current = setTimeout(() => {
      setHighlightedProgramId(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F3F1F8] text-[#15173D] flex flex-col font-atkinson relative pb-[56px] lg:pb-0 selection:bg-[#D98268] selection:text-[#15173D]">
      {/* Rail de défilement (bureau et barre mobile) */}

      {/* En-tête collant avec navigation */}
      <Header />

      {/* Contenu principal : une page par route */}
      <main id="contenu" className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Reassurance />
                <Recognize onHighlightProgram={handleHighlightProgram} />
                <Programs highlightedProgramId={highlightedProgramId} flushTop />
                <Steps />
                <Founder showInitiativeLink />
                <TestPreview />
                <FirstStep />
              </>
            }
          />
          <Route
            path="/accompagnements"
            element={
              <Programs highlightedProgramId={highlightedProgramId} />
            }
          />
          <Route path="/program/:slug" element={<ProgramDetail />} />
          <Route path="/tests" element={<TestsPage />} />
          <Route path="/livre" element={<Book />} />
          <Route path="/evaluation/:programId/:testId" element={<TestRunner />} />
          <Route path="/evaluation-results" element={<TestResult />} />
          <Route path="/tous-les-articles" element={<Articles />} />
          <Route path="/blog/:slug" element={<ArticlePage />} />
          <Route path="/initiative" element={<InitiativePage />} />
          <Route path="/communaute" element={<Community />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<FinalCta />} />
          <Route path="/confidentialite" element={<PrivacyPage />} />
          <Route path="/mentions-legales" element={<LegalNoticePage />} />
          <Route path="/cgu" element={<TermsPage />} />
          <Route path="/rgpd" element={<GdprPage />} />
          <Route path="*" element={<Hero />} />
        </Routes>
      </main>

      {/* Pied de page */}
      <Footer />

      {/* Navigation fixée en bas sur mobile */}
      <BottomNav />
    </div>
  );
}
