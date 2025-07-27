import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }) => {
  const getColorClasses = (colorType) => {
    switch (colorType) {
      case 'success':
        return 'bg-success/10 text-success border-success/20';
      case 'warning':
        return 'bg-warning/10 text-warning-foreground border-warning/20';
      case 'error':
        return 'bg-error/10 text-error border-error/20';
      case 'accent':
        return 'bg-accent/10 text-accent border-accent/20';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-text-secondary';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft transition-hover hover:shadow-md">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-body text-text-secondary mb-1">{title}</p>
          <p className="text-2xl font-heading font-semibold text-text-primary mb-2">{value}</p>
          {subtitle && (
            <p className="text-sm font-body text-text-secondary">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${getColorClasses(color)}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
      
      {trend && trendValue && (
        <div className="flex items-center mt-4 pt-4 border-t border-border">
          <Icon name={getTrendIcon()} size={16} className={getTrendColor()} />
          <span className={`text-sm font-body ml-1 ${getTrendColor()}`}>
            {trendValue}
          </span>
          <span className="text-sm font-body text-text-secondary ml-1">vs mes anterior</span>
        </div>
      )}
    </div>
  );
};

export default KPICard;