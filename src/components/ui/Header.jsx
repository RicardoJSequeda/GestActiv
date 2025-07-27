import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';


const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard' },
    { name: 'Actividades', path: '/activity-registration', icon: 'Calendar' },
    { name: 'Beneficiarios', path: '/beneficiary-management', icon: 'Users' },
    { name: 'Reportes', path: '/reports-and-analytics', icon: 'BarChart3' }
  ];

  const secondaryItems = [
    { name: 'Gestión de Actividades', path: '/activity-management', icon: 'Settings' }
  ];

  const isActivePath = (path) => {
    if (path === '/activity-registration' && location.pathname === '/activity-management') {
      return true;
    }
    return location.pathname === path;
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Users" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-heading font-semibold text-text-primary">
                SPAR
              </h1>
              <p className="text-xs text-text-secondary font-caption">
                Registro de Actividades
              </p>
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-hover ${
                isActivePath(item.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-muted'
              }`}
            >
              <Icon name={item.icon} size={16} />
              <span>{item.name}</span>
            </button>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-hover"
            >
              <Icon name="MoreHorizontal" size={16} />
              <span>Más</span>
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                {secondaryItems.map((item) => (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm font-body text-text-secondary hover:text-text-primary hover:bg-muted transition-hover"
                  >
                    <Icon name={item.icon} size={16} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* User Menu & Mobile Toggle */}
        <div className="flex items-center space-x-3">
          {/* User Profile */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-body font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-hover"
            >
              <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                <Icon name="User" size={14} color="white" />
              </div>
              <span className="hidden md:block">Coordinador</span>
              <Icon name="ChevronDown" size={14} />
            </button>
            
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg z-50">
                <div className="px-4 py-2 border-b border-border">
                  <p className="text-sm font-body font-medium text-text-primary">María González</p>
                  <p className="text-xs text-text-secondary">Coordinadora de Programa</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm font-body text-text-secondary hover:text-text-primary hover:bg-muted transition-hover"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-muted transition-hover"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-surface border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-body font-medium transition-hover ${
                  isActivePath(item.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.name}</span>
              </button>
            ))}
            
            <div className="border-t border-border pt-2 mt-2">
              {secondaryItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className="flex items-center space-x-3 w-full px-3 py-2 rounded-md text-sm font-body font-medium text-text-secondary hover:text-text-primary hover:bg-muted transition-hover"
                >
                  <Icon name={item.icon} size={18} />
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;