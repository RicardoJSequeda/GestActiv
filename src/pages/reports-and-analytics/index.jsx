import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusNotificationBar from '../../components/ui/StatusNotificationBar';
import ReportBuilder from './components/ReportBuilder';
import AnalyticsCharts from './components/AnalyticsCharts';
import QuickStatsCards from './components/QuickStatsCards';
import RecentReports from './components/RecentReports';
import ScheduledReports from './components/ScheduledReports';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ReportsAndAnalytics = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: 'BarChart3' },
    { id: 'builder', label: 'Constructor de Reportes', icon: 'FileText' },
    { id: 'scheduled', label: 'Reportes Programados', icon: 'Clock' },
    { id: 'history', label: 'Historial', icon: 'History' }
  ];

  const handleGenerateReport = async (config) => {
    setIsGeneratingReport(true);
    
    // Simulate report generation
    setTimeout(() => {
      setIsGeneratingReport(false);
      alert(`Reporte generado exitosamente:\nPrograma: ${config.programType}\nFormato: ${config.format}\nEl reporte se ha enviado a su correo electrónico.`);
    }, 3000);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <QuickStatsCards />
            <AnalyticsCharts />
          </div>
        );
      
      case 'builder':
        return (
          <div className="space-y-8">
            <ReportBuilder onGenerateReport={handleGenerateReport} />
            {isGeneratingReport && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                  <div>
                    <h3 className="text-sm font-body font-medium text-primary">
                      Generando Reporte
                    </h3>
                    <p className="text-xs text-text-secondary">
                      Por favor espere mientras se procesa su solicitud...
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      
      case 'scheduled':
        return <ScheduledReports />;
      
      case 'history':
        return <RecentReports />;
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          <StatusNotificationBar />
          
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Reportes y Análisis
                </h1>
                <p className="text-text-secondary mt-1">
                  Análisis estadístico y generación de reportes para programas sociales
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                size="sm"
              >
                Actualizar Datos
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                size="sm"
              >
                Exportar Dashboard
              </Button>
            </div>
          </div>

          {/* Key Metrics Summary */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-success">
                  94.7%
                </div>
                <div className="text-sm text-text-secondary">
                  Cumplimiento General
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-primary">
                  7,234
                </div>
                <div className="text-sm text-text-secondary">
                  Beneficiarios Activos
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-accent">
                  2,847
                </div>
                <div className="text-sm text-text-secondary">
                  Actividades Este Mes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-heading font-bold text-warning-foreground">
                  $2.8B
                </div>
                <div className="text-sm text-text-secondary">
                  Presupuesto Ejecutado
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-border mb-8">
            <nav className="flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-body font-medium text-sm whitespace-nowrap transition-hover ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border'
                  }`}
                >
                  <Icon name={tab.icon} size={18} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="pb-8">
            {renderTabContent()}
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-text-secondary">
              <div className="flex items-center space-x-4">
                <span className="flex items-center space-x-1">
                  <Icon name="Shield" size={14} />
                  <span>Cumple estándares ICBF</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>Actualizado: {new Date().toLocaleDateString('es-CO')}</span>
                </span>
              </div>
              <div className="mt-2 sm:mt-0">
                <span>Sistema de Programas Sociales - SPAR v2.1</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReportsAndAnalytics;