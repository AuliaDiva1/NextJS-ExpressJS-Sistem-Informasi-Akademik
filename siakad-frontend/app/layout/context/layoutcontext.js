// app/layout/context/layoutcontext.js
'use client';

import React, { createContext, useState, useContext } from 'react';

// Buat context
export const LayoutContext = createContext({});

// Provider
export const LayoutProvider = ({ children }) => {
  const [layoutConfig, setLayoutConfig] = useState({
    ripple: false,
    inputStyle: 'outlined',
    menuMode: 'static',
    colorScheme: 'light',
    theme: 'lara-light-indigo',
    scale: 14,
  });

  const [layoutState, setLayoutState] = useState({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    profileSidebarVisible: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    menuHoverActive: false,
  });

  const isOverlay = () => layoutConfig.menuMode === 'overlay';
  const isDesktop = () => typeof window !== 'undefined' && window.innerWidth > 991;

  const onMenuToggle = () => {
    if (isOverlay()) {
      setLayoutState((prev) => ({ ...prev, overlayMenuActive: !prev.overlayMenuActive }));
    }

    if (isDesktop()) {
      setLayoutState((prev) => ({ ...prev, staticMenuDesktopInactive: !prev.staticMenuDesktopInactive }));
    } else {
      setLayoutState((prev) => ({ ...prev, staticMenuMobileActive: !prev.staticMenuMobileActive }));
    }
  };

  const showProfileSidebar = () => {
    setLayoutState((prev) => ({ ...prev, profileSidebarVisible: !prev.profileSidebarVisible }));
  };

  return (
    <LayoutContext.Provider
      value={{
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar,
      }}
    >
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook untuk akses context
export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayoutContext must be used within a LayoutProvider');
  }
  return context;
};
