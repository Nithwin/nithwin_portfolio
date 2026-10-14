import React, { createContext, useContext, useState, useEffect } from 'react';

const getSystemDark = () => {
  if (typeof document === 'undefined') return true;
  const attr = document.documentElement.getAttribute('data-theme');
  if (attr === 'light') return false;
  if (attr === 'dark') return true;
  try {
    const saved = localStorage.getItem('portfolio-theme') || localStorage.getItem('nithwin_theme');
    if (saved === 'light') return false;
    if (saved === 'dark') return true;
  } catch (e) {}
  return true;
};

const defaultContext = {
  isDark: true,
  toggleTheme: () => {},
};

const ThemeContext = createContext(defaultContext);

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(getSystemDark);

  useEffect(() => {
    const syncTheme = () => {
      const currentDark = document.documentElement.getAttribute('data-theme') !== 'light';
      setIsDark(currentDark);
    };

    syncTheme();

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === 'attributes' && m.attributeName === 'data-theme') {
          syncTheme();
        }
      }
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    setIsDark((prev) => {
      const next = !prev;
      const themeStr = next ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', themeStr);
      try {
        localStorage.setItem('portfolio-theme', themeStr);
        localStorage.setItem('nithwin_theme', themeStr);
      } catch (e) {}
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    const isDark =
      typeof document !== 'undefined'
        ? document.documentElement.getAttribute('data-theme') !== 'light'
        : true;
    return { isDark, toggleTheme: () => {} };
  }
  return context;
};
