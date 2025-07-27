import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const ProgramChart = ({ type = 'bar', title, data, height = 300 }) => {
  const COLORS = ['#2563EB', '#059669', '#F59E0B', '#EF4444', '#8B5CF6'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-body font-medium text-text-primary mb-1">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm text-text-secondary">
              <span className="font-medium" style={{ color: entry.color }}>
                {entry.name}:
              </span>
              {' '}{entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderBarChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12, fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <YAxis 
          tick={{ fontSize: 12, fill: '#64748B' }}
          axisLine={{ stroke: '#E2E8F0' }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value" fill="#2563EB" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );

  const renderPieChart = () => (
    <ResponsiveContainer width="100%" height={height}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  );

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          {title}
        </h3>
      </div>
      
      <div className="p-6">
        {type === 'bar' ? renderBarChart() : renderPieChart()}
        
        {type === 'pie' && (
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {data.map((entry, index) => (
              <div key={entry.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm font-body text-text-secondary">
                  {entry.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgramChart;