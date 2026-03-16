import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('webcairn-theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('theme-transitioning');
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('webcairn-theme', theme);

    const timeoutId = window.setTimeout(() => {
      root.classList.remove('theme-transitioning');
    }, 300);

    return () => {
      window.clearTimeout(timeoutId);
      root.classList.remove('theme-transitioning');
    };
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
