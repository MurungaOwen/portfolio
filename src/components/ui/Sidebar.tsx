import React, { useState, createContext, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  User, 
  FolderOpen, 
  Code, 
  Briefcase, 
  Mail, 
  Menu, 
  X 
} from 'lucide-react';

// Context for sidebar state management
interface SidebarContextType {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

// Provider component
export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true); // Open on desktop by default
      } else {
        setIsSidebarOpen(false); // Closed on mobile
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

// Main Sidebar component
interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = '' }) => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const location = useLocation();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home, href: '/' },
    { id: 'about', label: 'About', icon: User, href: '/about' },
    { id: 'projects', label: 'Projects', icon: FolderOpen, href: '/projects' },
    { id: 'skills', label: 'Skills', icon: Code, href: '/skills' },
    { id: 'experience', label: 'Experience', icon: Briefcase, href: '/experience' },
    { id: 'contact', label: 'Contact', icon: Mail, href: '/contact' },
  ];

  const handleItemClick = (itemId: string) => {
    console.log(`Navigating to ${itemId}`);
    // Close sidebar on mobile after navigation
    if (!isDesktop) {
      toggleSidebar();
    }
  };

  const isActiveRoute = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  const isCollapsed = isDesktop && !isSidebarOpen;
  const showSidebar = isDesktop || isSidebarOpen;

  return (
    <>
      {/* Mobile Overlay */}
      {!isDesktop && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      {showSidebar && (
        <div
          className={`
            ${isDesktop ? 'fixed' : 'fixed'} left-0 top-0 h-screen bg-white shadow-2xl z-40
            flex flex-col border-r border-gray-100 overflow-hidden
            transition-all duration-300 ease-in-out
            ${isDesktop 
              ? (isSidebarOpen ? 'w-64' : 'w-16') 
              : 'w-64 transform translate-x-0'
            }
            ${className}
          `}
        >
          {/* Header */}
          {!isCollapsed && (
            <div className="p-6 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">H</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Hood</h1>
                  <p className="text-xs text-gray-500 mt-0.5">Portfolio</p>
                </div>
              </div>
            </div>
          )}

          {/* Collapsed Header */}
          {isCollapsed && (
            <div className="flex justify-center py-6 border-b border-gray-100 flex-shrink-0">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">H</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 min-h-0">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <div key={item.id} className="relative group">
                  <Link
                    to={item.href}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center px-3 py-3 rounded-xl text-left transition-all duration-200 group/item
                      ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                      ${isActive 
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' 
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }
                      ${isCollapsed ? 'group-hover:scale-105' : 'hover:translate-x-1'}
                    `}
                  >
                    <IconComponent 
                      className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-gray-500 group-hover/item:text-gray-700'
                      }`} 
                    />
                    {!isCollapsed && (
                      <span className="font-medium text-sm truncate">
                        {item.label}
                      </span>
                    )}
                  </Link>
                  
                  {/* Tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-100 flex-shrink-0">
            <div className={`flex items-center p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 ${
              isCollapsed ? 'justify-center' : 'space-x-3'
            }`}>
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-white font-semibold text-sm">OM</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">Owen Murunga</p>
                  <p className="text-xs text-gray-500 truncate">Software Engineer</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Toggle Buttons
export const SidebarToggle: React.FC = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isDesktop) {
    // Desktop toggle - positioned relative to sidebar
    return (
      <button
        onClick={toggleSidebar}
        className="fixed top-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl border border-gray-100"
        style={{ left: isSidebarOpen ? '240px' : '52px' }}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-gray-700" />
        ) : (
          <Menu className="w-5 h-5 text-gray-700" />
        )}
      </button>
    );
  }

  // Mobile toggle - fixed position
  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 p-2.5 bg-white rounded-xl shadow-lg hover:bg-gray-50 transition-all duration-300 hover:shadow-xl border border-gray-100"
      aria-label="Toggle sidebar"
    >
      {isSidebarOpen ? (
        <X className="w-5 h-5 text-gray-700" />
      ) : (
        <Menu className="w-5 h-5 text-gray-700" />
      )}
    </button>
  );
};

export default Sidebar;