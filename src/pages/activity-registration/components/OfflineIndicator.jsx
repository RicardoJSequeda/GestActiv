import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState(new Date());

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Simulate sync process
      if (pendingSyncCount > 0) {
        setTimeout(() => {
          setPendingSyncCount(0);
          setLastSyncTime(new Date());
        }, 2000);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate pending sync items when offline
    if (!isOnline) {
      setPendingSyncCount(Math.floor(Math.random() * 5) + 1);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [isOnline, pendingSyncCount]);

  if (isOnline && pendingSyncCount === 0) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-success/10 border border-success/20 rounded-md">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
        <div className="flex items-center space-x-2 text-sm font-body text-success">
          <Icon name="Wifi" size={16} />
          <span>Conectado - Última sincronización: {lastSyncTime.toLocaleTimeString('es-CO')}</span>
        </div>
      </div>
    );
  }

  if (isOnline && pendingSyncCount > 0) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-warning/10 border border-warning/20 rounded-md">
        <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
        <div className="flex items-center space-x-2 text-sm font-body text-warning-foreground">
          <Icon name="RefreshCw" size={16} className="animate-spin" />
          <span>Sincronizando {pendingSyncCount} elemento(s)...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 px-3 py-2 bg-error/10 border border-error/20 rounded-md">
      <div className="w-2 h-2 bg-error rounded-full"></div>
      <div className="flex items-center space-x-2 text-sm font-body text-error">
        <Icon name="WifiOff" size={16} />
        <span>
          Sin conexión - {pendingSyncCount} elemento(s) pendiente(s) de sincronización
        </span>
      </div>
    </div>
  );
};

export default OfflineIndicator;