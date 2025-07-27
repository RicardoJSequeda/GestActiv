import React from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusNotificationBar from '../../components/ui/StatusNotificationBar';
import KPICard from './components/KPICard';
import ActivityFeed from './components/ActivityFeed';
import CalendarWidget from './components/CalendarWidget';
import ProgramChart from './components/ProgramChart';
import QuickActions from './components/QuickActions';
import NotificationPanel from './components/NotificationPanel';

const Dashboard = () => {
  // Mock data for KPI cards
  const kpiData = [
    {
      title: "Actividades Hoy",
      value: "12",
      subtitle: "8 completadas, 4 pendientes",
      icon: "Calendar",
      trend: "up",
      trendValue: "+15%",
      color: "primary"
    },
    {
      title: "Aprobaciones Pendientes",
      value: "3",
      subtitle: "Requieren revisión",
      icon: "Clock",
      trend: "down",
      trendValue: "-25%",
      color: "warning"
    },
    {
      title: "Beneficiarios Activos",
      value: "247",
      subtitle: "Centro Vida: 142, ICBF: 105",
      icon: "Users",
      trend: "up",
      trendValue: "+8%",
      color: "success"
    },
    {
      title: "Cumplimiento",
      value: "94%",
      subtitle: "Meta mensual: 90%",
      icon: "Target",
      trend: "up",
      trendValue: "+4%",
      color: "accent"
    }
  ];

  // Mock data for attendance chart
  const attendanceData = [
    { name: 'Lun', value: 85 },
    { name: 'Mar', value: 92 },
    { name: 'Mié', value: 78 },
    { name: 'Jue', value: 88 },
    { name: 'Vie', value: 95 },
    { name: 'Sáb', value: 67 },
    { name: 'Dom', value: 45 }
  ];

  // Mock data for program distribution
  const programData = [
    { name: 'Centro Vida', value: 142 },
    { name: 'ICBF', value: 105 },
    { name: 'Otros Programas', value: 28 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Status Notifications */}
          <div className="mb-8">
            <StatusNotificationBar />
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-heading font-bold text-text-primary mb-2">
              Panel de Control
            </h1>
            <p className="text-text-secondary font-body">
              Resumen de actividades y métricas del programa social - {new Date().toLocaleDateString('es-CO', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                title={kpi.title}
                value={kpi.value}
                subtitle={kpi.subtitle}
                icon={kpi.icon}
                trend={kpi.trend}
                trendValue={kpi.trendValue}
                color={kpi.color}
              />
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Activity Feed - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <ActivityFeed />
            </div>
            
            {/* Calendar Widget - Takes 1 column */}
            <div className="lg:col-span-1">
              <CalendarWidget />
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <ProgramChart
              type="bar"
              title="Asistencia Semanal"
              data={attendanceData}
              height={300}
            />
            <ProgramChart
              type="pie"
              title="Distribución por Programa"
              data={programData}
              height={300}
            />
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Quick Actions */}
            <div>
              <QuickActions />
            </div>
            
            {/* Notifications Panel */}
            <div>
              <NotificationPanel />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;