import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, UserRole, NavView } from '../types';

interface AppContextType {
  view: NavView;
  setView: (view: NavView) => void;
  selectedIndustry: string;
  setSelectedIndustry: (industry: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  resetUser: () => void;
  startWizard: () => void;
  openIndustryInExplorer: (industryId: string) => void;
}

const defaultUser: UserProfile = {
  type: '' as UserRole,
  field: '',
  interests: [],
  experience: '',
  usage: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [view, setViewState] = useState<NavView>('home');
  const [selectedIndustry, setSelectedIndustry] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const setView = (v: NavView) => {
    setViewState(v);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateUser = (data: Partial<UserProfile>) =>
    setUser(prev => ({ ...prev, ...data }));

  const resetUser = () => {
    setUser(defaultUser);
    setView('home');
  };

  const startWizard = () => setView('wizard');

  const openIndustryInExplorer = (industryId: string) => {
    setSelectedIndustry(industryId);
    setView('explorer');
  };

  return (
    <AppContext.Provider
      value={{
        view, setView,
        selectedIndustry, setSelectedIndustry,
        searchQuery, setSearchQuery,
        user, updateUser, resetUser,
        startWizard, openIndustryInExplorer,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
