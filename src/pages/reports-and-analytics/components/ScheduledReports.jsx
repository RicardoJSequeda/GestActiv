import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ScheduledReports = () => {
  const [scheduledReports, setScheduledReports] = useState([
    {
      id: 1,
      name: 'Reporte Mensual Centro Vida',
      frequency: 'monthly',
      nextRun: '2025-08-01T09:00:00',
      recipients: ['maria.gonzalez@spar.gov.co', 'supervisor@icbf.gov.co'],
      format: 'PDF',
      status: 'active',
      lastRun: '2025-07-01T09:00:00'
    },
    {
      id: 2,
      name: 'Estadísticas Semanales de Asistencia',
      frequency: 'weekly',
      nextRun: '2025-07-28T08:00:00',
      recipients: ['coordinador@spar.gov.co'],
      format: 'Excel',
      status: 'active',
      lastRun: '2025-07-21T08:00:00'
    },
    {
      id: 3,
      name: 'Reporte Trimestral de Cumplimiento',
      frequency: 'quarterly',
      nextRun: '2025-10-01T10:00:00',
      recipients: ['director@spar.gov.co', 'auditoria@icbf.gov.co'],
      format: 'PDF',
      status: 'paused',
      lastRun: '2025-04-01T10:00:00'
    }
  ]);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newReport, setNewReport] = useState({
    name: '',
    frequency: 'monthly',
    recipients: '',
    format: 'PDF',
    time: '09:00'
  });

  const frequencyOptions = [
    { value: 'daily', label: 'Diario' },
    { value: 'weekly', label: 'Semanal' },
    { value: 'monthly', label: 'Mensual' },
    { value: 'quarterly', label: 'Trimestral' },
    { value: 'yearly', label: 'Anual' }
  ];

  const formatOptions = [
    { value: 'PDF', label: 'PDF' },
    { value: 'Excel', label: 'Excel' },
    { value: 'both', label: 'PDF y Excel' }
  ];

  const getFrequencyLabel = (frequency) => {
    const option = frequencyOptions.find(opt => opt.value === frequency);
    return option ? option.label : frequency;
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

  const toggleReportStatus = (id) => {
    setScheduledReports(prev =>
      prev.map(report =>
        report.id === id
          ? { ...report, status: report.status === 'active' ? 'paused' : 'active' }
          : report
      )
    );
  };

  const handleCreateReport = () => {
    if (!newReport.name || !newReport.recipients) {
      alert('Por favor completa todos los campos requeridos');
      return;
    }

    const report = {
      id: Date.now(),
      name: newReport.name,
      frequency: newReport.frequency,
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      recipients: newReport.recipients.split(',').map(email => email.trim()),
      format: newReport.format,
      status: 'active',
      lastRun: null
    };

    setScheduledReports(prev => [...prev, report]);
    setNewReport({
      name: '',
      frequency: 'monthly',
      recipients: '',
      format: 'PDF',
      time: '09:00'
    });
    setShowCreateModal(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-warning-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Reportes Programados
            </h2>
            <p className="text-sm text-text-secondary">
              Automatización de reportes recurrentes
            </p>
          </div>
        </div>

        <Button
          variant="default"
          iconName="Plus"
          iconPosition="left"
          onClick={() => setShowCreateModal(true)}
        >
          Programar Reporte
        </Button>
      </div>

      <div className="space-y-4">
        {scheduledReports.map((report) => (
          <div
            key={report.id}
            className="flex items-center justify-between p-4 border border-border rounded-lg"
          >
            <div className="flex items-center space-x-4 flex-1">
              <div className={`w-3 h-3 rounded-full ${
                report.status === 'active' ? 'bg-success' : 'bg-warning'
              }`}></div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-sm font-body font-medium text-text-primary">
                    {report.name}
                  </h3>
                  <span className="px-2 py-1 bg-muted rounded text-xs text-text-secondary">
                    {getFrequencyLabel(report.frequency)}
                  </span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    {report.format}
                  </span>
                </div>
                
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} />
                    <span>Próxima: {formatDate(report.nextRun)}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Mail" size={12} />
                    <span>{report.recipients.length} destinatarios</span>
                  </span>
                  {report.lastRun && (
                    <span className="flex items-center space-x-1">
                      <Icon name="CheckCircle" size={12} />
                      <span>Última: {formatDate(report.lastRun)}</span>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName={report.status === 'active' ? 'Pause' : 'Play'}
                onClick={() => toggleReportStatus(report.id)}
                className="h-8 w-8 p-0"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                className="h-8 w-8 p-0"
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                className="h-8 w-8 p-0 text-error hover:text-error"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                Programar Nuevo Reporte
              </h3>
              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={() => setShowCreateModal(false)}
                className="h-8 w-8 p-0"
              />
            </div>

            <div className="space-y-4">
              <Input
                label="Nombre del Reporte"
                placeholder="Ej: Reporte Mensual Centro Vida"
                value={newReport.name}
                onChange={(e) => setNewReport(prev => ({ ...prev, name: e.target.value }))}
                required
              />

              <Select
                label="Frecuencia"
                options={frequencyOptions}
                value={newReport.frequency}
                onChange={(value) => setNewReport(prev => ({ ...prev, frequency: value }))}
              />

              <Input
                label="Destinatarios"
                placeholder="email1@ejemplo.com, email2@ejemplo.com"
                value={newReport.recipients}
                onChange={(e) => setNewReport(prev => ({ ...prev, recipients: e.target.value }))}
                description="Separar múltiples emails con comas"
                required
              />

              <Select
                label="Formato"
                options={formatOptions}
                value={newReport.format}
                onChange={(value) => setNewReport(prev => ({ ...prev, format: value }))}
              />

              <Input
                label="Hora de Envío"
                type="time"
                value={newReport.time}
                onChange={(e) => setNewReport(prev => ({ ...prev, time: e.target.value }))}
              />
            </div>

            <div className="flex items-center justify-end space-x-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateModal(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={handleCreateReport}
              >
                Programar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduledReports;