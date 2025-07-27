import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ReportBuilder = ({ onGenerateReport }) => {
  const [reportConfig, setReportConfig] = useState({
    programType: '',
    dateRange: 'last30days',
    customStartDate: '',
    customEndDate: '',
    region: '',
    metrics: [],
    format: 'pdf'
  });

  const programOptions = [
    { value: 'all', label: 'Todos los Programas' },
    { value: 'centro-vida', label: 'Centro Vida' },
    { value: 'icbf', label: 'ICBF' },
    { value: 'primera-infancia', label: 'Primera Infancia' },
    { value: 'adulto-mayor', label: 'Adulto Mayor' },
    { value: 'discapacidad', label: 'Discapacidad' }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Hoy' },
    { value: 'yesterday', label: 'Ayer' },
    { value: 'last7days', label: 'Últimos 7 días' },
    { value: 'last30days', label: 'Últimos 30 días' },
    { value: 'last3months', label: 'Últimos 3 meses' },
    { value: 'last6months', label: 'Últimos 6 meses' },
    { value: 'lastyear', label: 'Último año' },
    { value: 'custom', label: 'Rango personalizado' }
  ];

  const regionOptions = [
    { value: 'all', label: 'Todas las Regiones' },
    { value: 'bogota', label: 'Bogotá D.C.' },
    { value: 'antioquia', label: 'Antioquia' },
    { value: 'valle', label: 'Valle del Cauca' },
    { value: 'cundinamarca', label: 'Cundinamarca' },
    { value: 'atlantico', label: 'Atlántico' }
  ];

  const metricsOptions = [
    { value: 'attendance', label: 'Asistencia de Beneficiarios' },
    { value: 'activities', label: 'Actividades Completadas' },
    { value: 'compliance', label: 'Cumplimiento Normativo' },
    { value: 'impact', label: 'Impacto del Programa' },
    { value: 'budget', label: 'Ejecución Presupuestal' },
    { value: 'satisfaction', label: 'Satisfacción de Beneficiarios' }
  ];

  const formatOptions = [
    { value: 'pdf', label: 'PDF' },
    { value: 'excel', label: 'Excel' },
    { value: 'both', label: 'PDF y Excel' }
  ];

  const handleConfigChange = (field, value) => {
    setReportConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGenerateReport = () => {
    if (!reportConfig.programType) {
      alert('Por favor selecciona un tipo de programa');
      return;
    }
    onGenerateReport(reportConfig);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Constructor de Reportes
          </h2>
          <p className="text-sm text-text-secondary">
            Configura y genera reportes personalizados
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Program Type */}
        <Select
          label="Tipo de Programa"
          placeholder="Seleccionar programa"
          options={programOptions}
          value={reportConfig.programType}
          onChange={(value) => handleConfigChange('programType', value)}
          required
        />

        {/* Date Range */}
        <Select
          label="Rango de Fechas"
          options={dateRangeOptions}
          value={reportConfig.dateRange}
          onChange={(value) => handleConfigChange('dateRange', value)}
        />

        {/* Region */}
        <Select
          label="Región"
          placeholder="Seleccionar región"
          options={regionOptions}
          value={reportConfig.region}
          onChange={(value) => handleConfigChange('region', value)}
        />

        {/* Custom Date Range */}
        {reportConfig.dateRange === 'custom' && (
          <>
            <Input
              label="Fecha de Inicio"
              type="date"
              value={reportConfig.customStartDate}
              onChange={(e) => handleConfigChange('customStartDate', e.target.value)}
            />
            <Input
              label="Fecha de Fin"
              type="date"
              value={reportConfig.customEndDate}
              onChange={(e) => handleConfigChange('customEndDate', e.target.value)}
            />
          </>
        )}

        {/* Metrics */}
        <Select
          label="Métricas a Incluir"
          placeholder="Seleccionar métricas"
          options={metricsOptions}
          value={reportConfig.metrics}
          onChange={(value) => handleConfigChange('metrics', value)}
          multiple
          searchable
        />

        {/* Format */}
        <Select
          label="Formato de Exportación"
          options={formatOptions}
          value={reportConfig.format}
          onChange={(value) => handleConfigChange('format', value)}
        />
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
        <div className="text-sm text-text-secondary">
          <Icon name="Info" size={16} className="inline mr-2" />
          Los reportes se generan según los estándares ICBF
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Save"
            iconPosition="left"
          >
            Guardar Configuración
          </Button>
          <Button
            variant="default"
            iconName="Download"
            iconPosition="left"
            onClick={handleGenerateReport}
          >
            Generar Reporte
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportBuilder;