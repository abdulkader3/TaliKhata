import React, { useEffect } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import Navbar from '../Page/Navbar/Navbar.jsx'

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Handle keyboard and visibility events
  useEffect(() => {
    const handleKeyPress = (e) => {
      if ((e.ctrlKey && e.key === 'r') || (e.metaKey && e.key === 'r') || e.key === 'F5') {
        e.preventDefault();
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && location.pathname !== '/') {
        localStorage.setItem('lastPath', location.pathname);
        navigate('/');
      }
    };

    const handlePageShow = (e) => {
      if (e.persisted && location.pathname !== '/') {
        navigate('/');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [location.pathname, navigate]);

  // Handle refresh and mobile-specific events
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (location.pathname !== '/') {
        e.preventDefault();
        e.returnValue = 'Changes you made may not be saved. Are you sure you want to refresh?';
        localStorage.setItem('lastPath', location.pathname);
        return e.returnValue;
      }
    };

    const handleUnload = () => {
      if (location.pathname !== '/') {
        localStorage.setItem('shouldReload', 'true');
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const touchY = e.touches[0].clientY;
      const scroll = window.scrollY;
      
      // Detect pull-to-refresh gesture
      if (scroll <= 0 && touchY - touchStartY > 30) {
        e.preventDefault();
        if (location.pathname !== '/') {
          navigate('/');
          localStorage.setItem('shouldReload', 'true');
        }
      }
    };

    // Check if we need to reload after a redirect
    if (location.pathname === '/') {
      const shouldReload = localStorage.getItem('shouldReload');
      const lastPath = localStorage.getItem('lastPath');
      
      if (shouldReload === 'true') {
        localStorage.removeItem('shouldReload');
        localStorage.removeItem('lastPath');
        window.location.reload();
      } else if (lastPath && !shouldReload) {
        // If we have a last path but no reload flag, restore the previous route
        navigate(lastPath);
        localStorage.removeItem('lastPath');
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('unload', handleUnload);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('unload', handleUnload);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [location.pathname, navigate]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Layout
