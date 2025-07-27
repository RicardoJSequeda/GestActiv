import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const StatusNotificationBar = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Simulate system notifications
    const systemNotifications = [
      {
        id: 1,
        type: 'info',
        message: 'Sistema sincronizado correctamente',
        timestamp: new Date(),
        dismissible: true
      }
    ];

    // Check for offline status
    if (!navigator.onLine) {
      systemNotifications.push({
        id: 2,
        type: 'warning',
        message: 'Trabajando sin conexión. Los datos se sincronizarán automáticamente cuando se restablezca la conexión.',
        timestamp: new Date(),
        dismissible: false
      });
    }

    setNotifications(systemNotifications);
  }, []);

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning-foreground';
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'info':
      default:
        return 'bg-primary/10 border-primary/20 text-primary';
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'error':
        return 'XCircle';
      case 'info':
      default:
        return 'Info';
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-center justify-between px-4 py-3 border rounded-md transition-smooth ${getNotificationStyles(notification.type)}`}
        >
          <div className="flex items-center space-x-3">
            <Icon 
              name={getNotificationIcon(notification.type)} 
              size={18} 
            />
            <span className="text-sm font-body font-medium">
              {notification.message}
            </span>
          </div>
          
          {notification.dismissible && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => dismissNotification(notification.id)}
              iconName="X"
              className="h-6 w-6 p-0 hover:bg-black/10"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StatusNotificationBar;