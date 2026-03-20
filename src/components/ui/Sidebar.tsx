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
            fixed left-0 top-0 h-[100dvh] bg-[#070907] shadow-[20px_0_40px_rgba(0,0,0,0.5)] z-50
            flex flex-col border-r border-zinc-900 overflow-hidden
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
            <div className="p-6 border-b border-zinc-900 flex-shrink-0">
              <div className="mb-4 flex items-center space-x-3">
                <div className="h-12 w-12 rounded-full border-2 border-lime-400 bg-lime-300 flex items-center justify-center shadow-[0_0_18px_rgba(163,230,53,0.35)]">
                  <span className="text-zinc-950 font-black text-lg">OM</span>
                </div>
              </div>
              <h1 className="text-3xl font-black text-zinc-100 leading-none">Owen Murunga</h1>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.22em] text-lime-400">// Portfolio v2.0</p>
            </div>
          )}

          {/* Collapsed Header */}
          {isCollapsed && (
            <div className="flex justify-center py-6 border-b border-zinc-900 flex-shrink-0">
              <div className="h-9 w-9 rounded-full border border-lime-400 bg-lime-300 flex items-center justify-center shadow-md">
                <span className="text-zinc-950 font-black text-xs">OM</span>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-1 min-h-0 overflow-y-auto">
            {!isCollapsed && (
              <p className="px-3 pb-3 text-[10px] font-semibold uppercase tracking-[0.26em] text-zinc-500">
                Navigate
              </p>
            )}
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = isActiveRoute(item.href);
              
              return (
                <div key={item.id} className="relative group">
                  <Link
                    to={item.href}
                    onClick={() => handleItemClick(item.id)}
                    className={`
                      w-full flex items-center px-3 py-3 text-left transition-all duration-200 group/item
                      ${isCollapsed ? 'justify-center' : 'justify-start space-x-3'}
                      ${isActive 
                        ? 'bg-lime-400/10 text-lime-300 border-l-2 border-lime-400' 
                        : 'text-zinc-500 hover:bg-zinc-900/40 hover:text-zinc-200'
                      }
                      ${isCollapsed ? 'group-hover:scale-105' : ''}
                    `}
                  >
                    <IconComponent 
                      className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                        isActive ? 'text-lime-300' : 'text-zinc-600 group-hover/item:text-zinc-300'
                      }`} 
                    />
                    {!isCollapsed && (
                      <span className="font-medium text-base truncate">
                        {item.label}
                      </span>
                    )}
                  </Link>
                  
                  {/* Tooltip when collapsed */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-3 px-3 py-2 bg-zinc-950 text-zinc-100 text-sm rounded-lg opacity-0 pointer-events-none group-hover:opacity-100 transition-all duration-200 whitespace-nowrap z-50 shadow-xl border border-zinc-800">
                      {item.label}
                      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-zinc-950 rotate-45 border-l border-t border-zinc-800"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-zinc-900 flex-shrink-0">
            <div className={`flex items-center p-3 rounded-xl bg-zinc-900/40 hover:bg-zinc-900/70 transition-colors duration-200 border border-zinc-800 ${
              isCollapsed ? 'justify-center' : 'space-x-3'
            }`}>
              <div className="w-10 h-10 bg-zinc-950 border border-lime-500/40 rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <span className="text-lime-300 font-semibold text-xs">OM</span>
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-zinc-200 truncate">Owen Murunga</p>
                  <p className="text-xs text-zinc-500 truncate">Software Engineer</p>
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
        className="fixed top-4 z-50 p-2.5 bg-zinc-950 rounded-xl shadow-lg hover:bg-black transition-all duration-300 hover:shadow-xl border border-zinc-800"
        style={{ left: isSidebarOpen ? '240px' : '52px' }}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5 text-zinc-300" />
        ) : (
          <Menu className="w-5 h-5 text-zinc-300" />
        )}
      </button>
    );
  }

  // Mobile toggle - fixed position
  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 p-2.5 bg-zinc-950 rounded-xl shadow-lg hover:bg-black transition-all duration-300 hover:shadow-xl border border-zinc-800"
      aria-label="Toggle sidebar"
    >
      {isSidebarOpen ? (
        <X className="w-5 h-5 text-zinc-300" />
      ) : (
        <Menu className="w-5 h-5 text-zinc-300" />
      )}
    </button>
  );
};

export default Sidebar;
