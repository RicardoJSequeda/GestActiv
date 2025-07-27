import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AnalyticsCharts = () => {
  const [activeChart, setActiveChart] = useState('activities');

  // Mock data for different charts
  const activityCompletionData = [
    { month: 'Ene', centroVida: 85, icbf: 92, primeraInfancia: 78, adultoMayor: 88 },
    { month: 'Feb', centroVida: 88, icbf: 89, primeraInfancia: 82, adultoMayor: 91 },
    { month: 'Mar', centroVida: 92, icbf: 94, primeraInfancia: 85, adultoMayor: 89 },
    { month: 'Abr', centroVida: 87, icbf: 91, primeraInfancia: 88, adultoMayor: 93 },
    { month: 'May', centroVida: 91, icbf: 96, primeraInfancia: 91, adultoMayor: 87 },
    { month: 'Jun', centroVida: 94, icbf: 93, primeraInfancia: 89, adultoMayor: 92 }
  ];

  const attendanceTrendData = [
    { week: 'Sem 1', asistencia: 1245, meta: 1300 },
    { week: 'Sem 2', asistencia: 1289, meta: 1300 },
    { week: 'Sem 3', asistencia: 1156, meta: 1300 },
    { week: 'Sem 4', asistencia: 1334, meta: 1300 },
    { week: 'Sem 5', asistencia: 1298, meta: 1300 },
    { week: 'Sem 6', asistencia: 1367, meta: 1300 }
  ];

  const programDistributionData = [
    { name: 'Centro Vida', value: 35, beneficiarios: 2450 },
    { name: 'ICBF', value: 28, beneficiarios: 1960 },
    { name: 'Primera Infancia', value: 22, beneficiarios: 1540 },
    { name: 'Adulto Mayor', value: 15, beneficiarios: 1050 }
  ];

  const complianceData = [
    { categoria: 'Documentación', cumplimiento: 94, meta: 95 },
    { categoria: 'Actividades', cumplimiento: 89, meta: 90 },
    { categoria: 'Reportes', cumplimiento: 97, meta: 95 },
    { categoria: 'Seguimiento', cumplimiento: 86, meta: 85 },
    { categoria: 'Evaluación', cumplimiento: 92, meta: 90 }
  ];

  const COLORS = ['#2563EB', '#059669', '#F59E0B', '#EF4444'];

  const chartOptions = [
    { id: 'activities', label: 'Actividades Completadas', icon: 'BarChart3' },
    { id: 'attendance', label: 'Tendencia de Asistencia', icon: 'TrendingUp' },
    { id: 'distribution', label: 'Distribución por Programa', icon: 'PieChart' },
    { id: 'compliance', label: 'Cumplimiento Normativo', icon: 'CheckCircle' }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'activities':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={activityCompletionData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="month" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="centroVida" fill="#2563EB" name="Centro Vida" />
              <Bar dataKey="icbf" fill="#059669" name="ICBF" />
              <Bar dataKey="primeraInfancia" fill="#F59E0B" name="Primera Infancia" />
              <Bar dataKey="adultoMayor" fill="#EF4444" name="Adulto Mayor" />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'attendance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={attendanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="week" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="asistencia" 
                stroke="#2563EB" 
                strokeWidth={3}
                name="Asistencia Real"
              />
              <Line 
                type="monotone" 
                dataKey="meta" 
                stroke="#059669" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Meta"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'distribution':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={programDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {programDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name, props) => [
                  `${value}% (${props.payload.beneficiarios} beneficiarios)`,
                  name
                ]}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case 'compliance':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={complianceData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis type="number" domain={[0, 100]} stroke="#64748B" />
              <YAxis dataKey="categoria" type="category" stroke="#64748B" />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Cumplimiento']}
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Bar dataKey="cumplimiento" fill="#2563EB" name="Cumplimiento Actual" />
              <Bar dataKey="meta" fill="#059669" name="Meta" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="BarChart3" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Análisis Estadístico
            </h2>
            <p className="text-sm text-text-secondary">
              Visualización de métricas y tendencias
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="Download"
          iconPosition="left"
          size="sm"
        >
          Exportar Gráfico
        </Button>
      </div>

      {/* Chart Selection */}
      <div className="flex flex-wrap gap-2 mb-6 p-4 bg-muted rounded-lg">
        {chartOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setActiveChart(option.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-body font-medium transition-hover ${
              activeChart === option.id
                ? 'bg-primary text-primary-foreground'
                : 'text-text-secondary hover:text-text-primary hover:bg-background'
            }`}
          >
            <Icon name={option.icon} size={16} />
            <span>{option.label}</span>
          </button>
        ))}
      </div>

      {/* Chart Display */}
      <div className="bg-background rounded-lg p-4">
        {renderChart()}
      </div>

      {/* Chart Insights */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={18} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-body font-medium text-text-primary mb-2">
              Insights Clave
            </h4>
            {activeChart === 'activities' && (
              <p className="text-sm text-text-secondary">
                El programa ICBF muestra el mejor rendimiento con 96% de actividades completadas en mayo. 
                Centro Vida ha mejorado consistentemente desde enero.
              </p>
            )}
            {activeChart === 'attendance' && (
              <p className="text-sm text-text-secondary">
                La asistencia superó la meta en las últimas 3 semanas. La semana 6 registró el mejor 
                rendimiento con 1,367 beneficiarios atendidos.
              </p>
            )}
            {activeChart === 'distribution' && (
              <p className="text-sm text-text-secondary">
                Centro Vida atiende el 35% de los beneficiarios totales (2,450 personas), 
                seguido por ICBF con 28% (1,960 beneficiarios).
              </p>
            )}
            {activeChart === 'compliance' && (
              <p className="text-sm text-text-secondary">
                Excelente cumplimiento en reportes (97%). El seguimiento necesita atención 
                para alcanzar la meta del 85%.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;