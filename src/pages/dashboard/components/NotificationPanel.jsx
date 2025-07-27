import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'approval',
      title: 'Actividades Pendientes de Aprobación',
      message: '3 actividades requieren revisión y aprobación',
      time: '5 min',
      priority: 'high',
      unread: true
    },
    {
      id: 2,
      type: 'deadline',
      title: 'Reporte Mensual Vencido',
      message: 'El reporte de Centro Vida debe enviarse antes del 30/07/2025',
      time: '1 hora',
      priority: 'urgent',
      unread: true
    },
    {
      id: 3,
      type: 'system',
      title: 'Sincronización Completada',
      message: 'Datos sincronizados correctamente con el servidor central',
      time: '2 horas',
      priority: 'low',
      unread: false
    },
    {
      id: 4,
      type: 'beneficiary',
      title: 'Nuevo Beneficiario Registrado',
      message: 'Carmen Rodríguez ha sido agregada al programa ICBF',
      time: '3 horas',
      priority: 'medium',
      unread: false
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'approval':
        return 'Clock';
      case 'deadline':
        return 'AlertTriangle';
      case 'system':
        return 'CheckCircle';
      case 'beneficiary':
        return 'UserPlus';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'text-error';
      case 'high':
        return 'text-warning';
      case 'medium':
        return 'text-primary';
      case 'low':
        return 'text-success';
      default:
        return 'text-text-secondary';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-error/10 text-error border-error/20';
      case 'high':
        return 'bg-warning/10 text-warning-foreground border-warning/20';
      case 'medium':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-lg font-heading font-semibold text-text-primary">
              Notificaciones
            </h3>
            {unreadCount > 0 && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body bg-error text-error-foreground">
                {unreadCount}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="MoreHorizontal"
            className="h-8 w-8 p-0"
          />
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-muted/50 transition-hover ${
                  notification.unread ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    notification.unread ? 'bg-primary/10' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={getNotificationIcon(notification.type)} 
                      size={16} 
                      className={getNotificationColor(notification.priority)}
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className={`text-sm font-body font-medium ${
                        notification.unread ? 'text-text-primary' : 'text-text-secondary'
                      }`}>
                        {notification.title}
                      </h4>
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        <span className="text-xs text-text-secondary">
                          {notification.time}
                        </span>
                        {notification.unread && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-text-secondary mb-2 line-clamp-2">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body border ${getPriorityBadge(notification.priority)}`}>
                        {notification.priority === 'urgent' && 'Urgente'}
                        {notification.priority === 'high' && 'Alta'}
                        {notification.priority === 'medium' && 'Media'}
                        {notification.priority === 'low' && 'Baja'}
                      </span>
                      
                      <div className="flex items-center space-x-1">
                        {notification.unread && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs h-6 px-2"
                          >
                            Marcar leída
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="X"
                          onClick={() => dismissNotification(notification.id)}
                          className="h-6 w-6 p-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <Icon name="Bell" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-sm text-text-secondary">No hay notificaciones</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;