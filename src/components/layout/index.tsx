import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar, { SidebarToggle, useSidebar } from '../ui/Sidebar';

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className = '' }) => {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile Toggle Button */}
      <SidebarToggle />
      
      {/* Desktop Toggle Button */}
      {/* <DesktopSidebarToggle /> */}
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <main className={`
        flex-1 transition-all duration-300 
        lg:ml-0
        ${isSidebarOpen && window.innerWidth >= 1024 ? 'lg:ml-64' : 'lg:ml-16'}
        ${className}
      `}>
        <div className="p-4 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;