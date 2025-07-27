import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const ActivityMobileCard = ({ 
  activity, 
  isSelected, 
  onSelectionChange, 
  onViewDetails,
  onEditActivity,
  onViewPhotos,
  onApproveActivity,
  onRejectActivity
}) => {
  const [showActions, setShowActions] = useState(false);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pendiente', icon: 'Clock' },
      approved: { color: 'bg-success/10 text-success border-success/20', label: 'Aprobado', icon: 'CheckCircle' },
      completed: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Completado', icon: 'Check' },
      rejected: { color: 'bg-error/10 text-error border-error/20', label: 'Rechazado', icon: 'XCircle' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const getProgramBadge = (program) => {
    const programConfig = {
      'centro-vida': { color: 'bg-blue-100 text-blue-800', label: 'Centro Vida' },
      'icbf': { color: 'bg-green-100 text-green-800', label: 'ICBF' },
      'adulto-mayor': { color: 'bg-purple-100 text-purple-800', label: 'Adulto Mayor' },
      'primera-infancia': { color: 'bg-pink-100 text-pink-800', label: 'Primera Infancia' },
      'juventud': { color: 'bg-orange-100 text-orange-800', label: 'Juventud' }
    };

    const config = programConfig[program] || { color: 'bg-gray-100 text-gray-800', label: program };
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('es-CO', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelectionChange(activity.id, e.target.checked)}
            className="mt-1"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              {getProgramBadge(activity.program)}
              {getStatusBadge(activity.status)}
            </div>
            <h3 className="font-medium text-text-primary text-sm">
              {activity.category}
            </h3>
            <p className="text-xs text-text-secondary">
              {activity.subcategory}
            </p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowActions(!showActions)}
          iconName="MoreVertical"
          className="h-8 w-8 p-0"
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Date and Time */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={14} className="text-text-secondary" />
            <span className="text-text-primary">{formatDate(activity.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} className="text-text-secondary" />
            <span className="text-text-secondary">{formatTime(activity.date)}</span>
          </div>
        </div>

        {/* Field Worker and Location */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
            <Icon name="User" size={12} color="white" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium text-text-primary">
              {activity.fieldWorker}
            </div>
            <div className="text-xs text-text-secondary flex items-center space-x-1">
              <Icon name="MapPin" size={10} />
              <span>{activity.location}</span>
            </div>
          </div>
        </div>

        {/* Beneficiaries */}
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={14} className="text-text-secondary" />
          <span className="text-sm text-text-primary">
            {activity.beneficiaryCount} beneficiarios
          </span>
        </div>

        {/* Description Preview */}
        <div className="text-sm text-text-secondary">
          {activity.description.length > 100 
            ? `${activity.description.substring(0, 100)}...`
            : activity.description
          }
        </div>

        {/* Photos Preview */}
        {activity.photos && activity.photos.length > 0 && (
          <div className="flex items-center space-x-2">
            <Icon name="Camera" size={14} className="text-text-secondary" />
            <div className="flex space-x-1">
              {activity.photos.slice(0, 3).map((photo, index) => (
                <div key={index} className="w-8 h-8 rounded overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={`Evidencia ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {activity.photos.length > 3 && (
                <div className="w-8 h-8 bg-muted rounded flex items-center justify-center">
                  <span className="text-xs text-text-secondary">
                    +{activity.photos.length - 3}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      {showActions && (
        <div className="border-t border-border pt-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewDetails(activity.id)}
              iconName="Eye"
              iconPosition="left"
              fullWidth
            >
              Ver Detalles
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditActivity(activity.id)}
              iconName="Edit"
              iconPosition="left"
              fullWidth
            >
              Editar
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewPhotos(activity.id)}
              iconName="Camera"
              iconPosition="left"
              fullWidth
            >
              Ver Fotos
            </Button>
            {activity.status === 'pending' && (
              <div className="grid grid-cols-2 gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onApproveActivity(activity.id)}
                  iconName="Check"
                  className="text-success border-success/20 hover:bg-success/10"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onRejectActivity(activity.id)}
                  iconName="X"
                  className="text-error border-error/20 hover:bg-error/10"
                />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Swipe Actions for Mobile */}
      {activity.status === 'pending' && (
        <div className="flex space-x-2 pt-2 border-t border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onApproveActivity(activity.id)}
            iconName="Check"
            className="flex-1 text-success hover:bg-success/10"
          >
            Aprobar
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRejectActivity(activity.id)}
            iconName="X"
            className="flex-1 text-error hover:bg-error/10"
          >
            Rechazar
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActivityMobileCard;