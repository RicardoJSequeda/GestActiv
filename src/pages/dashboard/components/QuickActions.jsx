import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      id: 1,
      title: "Registrar Actividad",
      description: "Documentar nueva actividad con beneficiarios",
      icon: "Plus",
      color: "default",
      path: "/activity-registration"
    },
    {
      id: 2,
      title: "Agregar Beneficiario",
      description: "Registrar nuevo beneficiario en el sistema",
      icon: "UserPlus",
      color: "success",
      path: "/beneficiary-management"
    },
    {
      id: 3,
      title: "Generar Reporte",
      description: "Crear informes de actividades y estadísticas",
      icon: "FileText",
      color: "outline",
      path: "/reports-and-analytics"
    },
    {
      id: 4,
      title: "Gestionar Actividades",
      description: "Revisar y aprobar actividades pendientes",
      icon: "Settings",
      color: "secondary",
      path: "/activity-management"
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Acciones Rápidas
        </h3>
        <p className="text-sm text-text-secondary mt-1">
          Acceso directo a funciones principales
        </p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickActions.map((action) => (
            <div
              key={action.id}
              className="group p-4 border border-border rounded-lg hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
              onClick={() => handleActionClick(action.path)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Button
                    variant={action.color}
                    size="icon"
                    iconName={action.icon}
                    className="h-10 w-10"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-body font-medium text-text-primary group-hover:text-primary transition-hover">
                    {action.title}
                  </h4>
                  <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                    {action.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickActions;