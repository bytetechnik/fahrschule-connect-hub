import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  validityDate?: string;
  assignedTeacher?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'admin@fahrschule.de': {
    password: 'Admin123!',
    user: {
      id: 'admin-1',
      email: 'admin@fahrschule.de',
      name: 'Administrator',
      role: 'admin'
    }
  },
  'teacher@fahrschule.de': {
    password: 'Teacher123!',
    user: {
      id: 'teacher-1',
      email: 'teacher@fahrschule.de',
      name: 'Max Müller',
      role: 'teacher'
    }
  },
  'student@fahrschule.de': {
    password: 'Student123!',
    user: {
      id: 'student-1',
      email: 'student@fahrschule.de',
      name: 'Anna Schmidt',
      role: 'student',
      validityDate: '2025-12-31',
      assignedTeacher: 'teacher-1'
    }
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('drivingSchoolUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const userCredentials = DEMO_USERS[email];
    
    if (userCredentials && userCredentials.password === password) {
      setUser(userCredentials.user);
      localStorage.setItem('drivingSchoolUser', JSON.stringify(userCredentials.user));
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('drivingSchoolUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
