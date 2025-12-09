import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, Service, Project, Plan, Testimonial, ContactSubmission } from '../types';
import { INITIAL_DATA } from '../constants';

interface StoreContextType {
  data: AppData;
  isLoading: boolean;
  isAdmin: boolean;
  loginAdmin: () => void;
  logoutAdmin: () => void;
  updateService: (service: Service) => void;
  addService: (service: Service) => void;
  deleteService: (id: string) => void;
  updateProject: (project: Project) => void;
  addProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  updatePlan: (plan: Plan) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  addTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: string) => void;
  addInquiry: (inquiry: ContactSubmission) => void;
  resetData: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load from local storage on mount
  useEffect(() => {
    const storedData = localStorage.getItem('starterkart_data');
    const storedAuth = localStorage.getItem('starterkart_admin');
    
    if (storedData) {
      setData(JSON.parse(storedData));
    }
    if (storedAuth === 'true') {
      setIsAdmin(true);
    }
    setIsLoading(false);
  }, []);

  // Save to local storage whenever data changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('starterkart_data', JSON.stringify(data));
    }
  }, [data, isLoading]);

  const loginAdmin = () => {
    setIsAdmin(true);
    localStorage.setItem('starterkart_admin', 'true');
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('starterkart_admin');
  };

  const addInquiry = (inquiry: ContactSubmission) => {
    setData(prev => ({ ...prev, inquiries: [inquiry, ...prev.inquiries] }));
  };

  // Generic CRUD helpers could be here, but defining explicit ones for clarity
  const updateService = (updated: Service) => {
    setData(prev => ({
      ...prev,
      services: prev.services.map(s => s.id === updated.id ? updated : s)
    }));
  };
  const addService = (newItem: Service) => {
    setData(prev => ({ ...prev, services: [...prev.services, newItem] }));
  };
  const deleteService = (id: string) => {
    setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const updateProject = (updated: Project) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === updated.id ? updated : p)
    }));
  };
  const addProject = (newItem: Project) => {
    setData(prev => ({ ...prev, projects: [...prev.projects, newItem] }));
  };
  const deleteProject = (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const updatePlan = (updated: Plan) => {
    setData(prev => ({
      ...prev,
      plans: prev.plans.map(p => p.id === updated.id ? updated : p)
    }));
  };

  const updateTestimonial = (updated: Testimonial) => {
    setData(prev => ({
      ...prev,
      testimonials: prev.testimonials.map(t => t.id === updated.id ? updated : t)
    }));
  };
  const addTestimonial = (newItem: Testimonial) => {
    setData(prev => ({ ...prev, testimonials: [...prev.testimonials, newItem] }));
  };
  const deleteTestimonial = (id: string) => {
    setData(prev => ({ ...prev, testimonials: prev.testimonials.filter(t => t.id !== id) }));
  };

  const resetData = () => {
    if(window.confirm("Are you sure? This will reset all data to default.")) {
        setData(INITIAL_DATA);
    }
  }

  return (
    <StoreContext.Provider value={{
      data,
      isLoading,
      isAdmin,
      loginAdmin,
      logoutAdmin,
      updateService,
      addService,
      deleteService,
      updateProject,
      addProject,
      deleteProject,
      updatePlan,
      updateTestimonial,
      addTestimonial,
      deleteTestimonial,
      addInquiry,
      resetData
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};