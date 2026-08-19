import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { UserProfile, UserRole } from '../types';

type UserContextType = {
  user: UserProfile;
  updateUser: (data: Partial<UserProfile>) => void;
  resetUser: () => void;
};

const defaultUser: UserProfile = {
  type: '' as UserRole,
  field: '',
  interests: [],
  experience: '',
  usage: []
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(defaultUser);

  const updateUser = (data: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const resetUser = () => setUser(defaultUser);

  return (
    <UserContext.Provider value={{ user, updateUser, resetUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
}
