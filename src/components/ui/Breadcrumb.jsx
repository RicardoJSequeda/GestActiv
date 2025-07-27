import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathMap = {
    '/dashboard': 'Dashboard',
    '/activity-registration': 'Registro de Actividades',
    '/activity-management': 'Gestión de Actividades',
    '/beneficiary-management': 'Gestión de Beneficiarios',
    '/reports-and-analytics': 'Reportes y Análisis'
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location.pathname.split('/').filter(segment => segment);
    const breadcrumbs = [{ name: 'Inicio', path: '/dashboard' }];

    let currentPath = '';
    pathSegments.forEach(segment => {
      currentPath += `/${segment}`;
      if (pathMap[currentPath]) {
        breadcrumbs.push({
          name: pathMap[currentPath],
          path: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm font-body mb-6" aria-label="Breadcrumb">
      {breadcrumbs.map((breadcrumb, index) => (
        <div key={breadcrumb.path} className="flex items-center space-x-2">
          {index > 0 && (
            <Icon name="ChevronRight" size={14} className="text-text-secondary" />
          )}
          {index === breadcrumbs.length - 1 ? (
            <span className="text-text-primary font-medium">
              {breadcrumb.name}
            </span>
          ) : (
            <button
              onClick={() => navigate(breadcrumb.path)}
              className="text-text-secondary hover:text-primary transition-hover"
            >
              {breadcrumb.name}
            </button>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;