import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { SidebarToggle, useSidebar } from '../ui/Sidebar';

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className = '' }) => {
  const { isSidebarOpen } = useSidebar();
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    // Initial check
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-[100dvh] w-full bg-[#050706] relative overflow-x-hidden">
      <SidebarToggle />
      <Sidebar />
      
      <main className={`
        flex-1 flex flex-col min-w-0 transition-all duration-300 relative
        ${isDesktop ? (isSidebarOpen ? 'ml-64' : 'ml-16') : 'ml-0 w-full'}
        ${className}
      `}>
        <div className="w-full flex-1 p-5 pb-24 lg:p-8 pt-24 lg:pt-8 shadow-inner">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
