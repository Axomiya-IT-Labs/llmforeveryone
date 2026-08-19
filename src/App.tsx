import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/home/HomeView';
import { PromptExplorer } from './components/explorer/PromptExplorer';
import { DiscoveryWizard } from './components/wizard/DiscoveryWizard';
import { AIToolsView } from './components/tools/AIToolsView';
import { PathGuideView } from './components/guide/PathGuideView';
import { BlogView } from './components/blog/BlogView';
import './index.css';

function AppContent() {
  const { view } = useApp();
  return (
    <div className="min-h-screen flex flex-col bg-[#0A0D18] text-slate-100 stripe-mesh-bg">
      <Navbar />
      <main className="flex-1">
        {view === 'home'     && <HomeView />}
        {view === 'explorer' && <PromptExplorer />}
        {view === 'wizard'   && <DiscoveryWizard />}
        {view === 'tools'    && <AIToolsView />}
        {view === 'guide'    && <PathGuideView />}
        {view === 'blog'     && <BlogView />}
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}