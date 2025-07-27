import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStatsCards = () => {
  const statsData = [
    {
      id: 1,
      title: 'Actividades Completadas',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'success',
      period: 'Este mes'
    },
    {
      id: 2,
      title: 'Beneficiarios Activos',
      value: '7,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary',
      period: 'Total registrados'
    },
    {
      id: 3,
      title: 'Tasa de Asistencia',
      value: '89.4%',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'TrendingUp',
      color: 'warning',
      period: 'Promedio mensual'
    },
    {
      id: 4,
      title: 'Cumplimiento Normativo',
      value: '94.7%',
      change: '+5.3%',
      changeType: 'positive',
      icon: 'Shield',
      color: 'accent',
      period: 'Estándares ICBF'
    },
    {
      id: 5,
      title: 'Reportes Generados',
      value: '156',
      change: '+18.9%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'secondary',
      period: 'Último trimestre'
    },
    {
      id: 6,
      title: 'Presupuesto Ejecutado',
      value: '$2.8B',
      change: '+7.4%',
      changeType: 'positive',
      icon: 'DollarSign',
      color: 'success',
      period: 'COP - Año fiscal'
    }
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'success':
        return 'bg-success/10 text-success';
      case 'primary':
        return 'bg-primary/10 text-primary';
      case 'warning':
        return 'bg-warning/10 text-warning-foreground';
      case 'accent':
        return 'bg-accent/10 text-accent';
      case 'secondary':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-primary/10 text-primary';
    }
  };

  const getChangeColor = (changeType) => {
    return changeType === 'positive' ?'text-success' :'text-error';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {statsData.map((stat) => (
        <div
          key={stat.id}
          className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-smooth"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                  <Icon name={stat.icon} size={24} />
                </div>
                <div>
                  <h3 className="text-sm font-body font-medium text-text-secondary">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-text-secondary mt-1">
                    {stat.period}
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="text-2xl font-heading font-bold text-text-primary">
                  {stat.value}
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`text-sm font-body font-medium ${getChangeColor(stat.changeType)}`}>
                    {stat.change}
                  </span>
                  <Icon 
                    name={stat.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                    size={14} 
                    className={getChangeColor(stat.changeType)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStatsCards;