import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentReports = () => {
  const [reports] = useState([
    {
      id: 1,
      name: 'Reporte Mensual Centro Vida - Junio 2025',
      type: 'monthly',
      program: 'Centro Vida',
      generatedBy: 'María González',
      generatedAt: '2025-07-01T10:30:00',
      status: 'completed',
      format: 'PDF',
      size: '2.4 MB',
      downloads: 15
    },
    {
      id: 2,
      name: 'Análisis de Cumplimiento ICBF - Q2 2025',
      type: 'compliance',
      program: 'ICBF',
      generatedBy: 'Carlos Rodríguez',
      generatedAt: '2025-06-28T14:15:00',
      status: 'completed',
      format: 'Excel',
      size: '1.8 MB',
      downloads: 23
    },
    {
      id: 3,
      name: 'Estadísticas de Asistencia - Semana 26',
      type: 'weekly',
      program: 'Todos',
      generatedBy: 'Ana Martínez',
      generatedAt: '2025-06-30T09:45:00',
      status: 'completed',
      format: 'PDF',
      size: '956 KB',
      downloads: 8
    },
    {
      id: 4,
      name: 'Reporte de Impacto Primera Infancia',
      type: 'impact',
      program: 'Primera Infancia',
      generatedBy: 'Luis Hernández',
      generatedAt: '2025-07-02T16:20:00',
      status: 'processing',
      format: 'PDF',
      size: '-',
      downloads: 0
    },
    {
      id: 5,
      name: 'Análisis Presupuestal Adulto Mayor',
      type: 'budget',
      program: 'Adulto Mayor',
      generatedBy: 'Patricia Silva',
      generatedAt: '2025-06-25T11:10:00',
      status: 'completed',
      format: 'Excel',
      size: '3.2 MB',
      downloads: 31
    }
  ]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body font-medium bg-success/10 text-success">
            <Icon name="CheckCircle" size={12} className="mr-1" />
            Completado
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body font-medium bg-warning/10 text-warning-foreground">
            <Icon name="Clock" size={12} className="mr-1" />
            Procesando
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-body font-medium bg-error/10 text-error">
            <Icon name="XCircle" size={12} className="mr-1" />
            Error
          </span>
        );
      default:
        return null;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'monthly':
        return 'Calendar';
      case 'compliance':
        return 'Shield';
      case 'weekly':
        return 'BarChart3';
      case 'impact':
        return 'Target';
      case 'budget':
        return 'DollarSign';
      default:
        return 'FileText';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="History" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Reportes Recientes
            </h2>
            <p className="text-sm text-text-secondary">
              Historial de reportes generados
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="RefreshCw"
          iconPosition="left"
          size="sm"
        >
          Actualizar
        </Button>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-smooth"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name={getTypeIcon(report.type)} size={18} className="text-primary" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-sm font-body font-medium text-text-primary truncate">
                    {report.name}
                  </h3>
                  {getStatusBadge(report.status)}
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={12} />
                    <span>{report.generatedBy}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} />
                    <span>{formatDate(report.generatedAt)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" size={12} />
                    <span>{report.program}</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-body font-medium text-text-primary">
                  {report.format}
                </div>
                <div className="text-xs text-text-secondary">
                  {report.size}
                </div>
              </div>

              {report.status === 'completed' && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-text-secondary">
                    {report.downloads} descargas
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Download"
                    className="h-8 w-8 p-0"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Share2"
                    className="h-8 w-8 p-0"
                  />
                </div>
              )}

              {report.status === 'processing' && (
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="outline"
          fullWidth
          iconName="Archive"
          iconPosition="left"
        >
          Ver Todos los Reportes
        </Button>
      </div>
    </div>
  );
};

export default RecentReports;