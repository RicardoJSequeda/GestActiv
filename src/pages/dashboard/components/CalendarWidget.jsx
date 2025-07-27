import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const today = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const monthNames = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];
  
  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  
  const scheduledActivities = {
    "27": [{ type: "Taller", time: "10:00", program: "Centro Vida" }],
    "28": [
      { type: "Consulta", time: "09:30", program: "ICBF" },
      { type: "Recreación", time: "14:00", program: "Centro Vida" }
    ],
    "29": [{ type: "Seguimiento", time: "11:00", program: "ICBF" }],
    "30": [{ type: "Evaluación", time: "15:30", program: "Centro Vida" }]
  };

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentMonth + direction);
    setCurrentDate(newDate);
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8"></div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today.getDate() === day && 
                     today.getMonth() === currentMonth && 
                     today.getFullYear() === currentYear;
      
      const hasActivities = scheduledActivities[day.toString()];
      
      days.push(
        <div
          key={day}
          className={`h-8 w-8 flex items-center justify-center text-xs font-body rounded cursor-pointer transition-hover relative ${
            isToday 
              ? 'bg-primary text-primary-foreground font-medium' 
              : hasActivities
              ? 'bg-accent/20 text-accent hover:bg-accent/30' :'text-text-primary hover:bg-muted'
          }`}
        >
          {day}
          {hasActivities && (
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-warning rounded-full"></div>
          )}
        </div>
      );
    }

    return days;
  };

  const upcomingActivities = Object.entries(scheduledActivities)
    .filter(([day]) => parseInt(day) >= today.getDate())
    .slice(0, 3)
    .map(([day, activities]) => ({
      day: parseInt(day),
      activities
    }));

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Calendario
          </h3>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded hover:bg-muted transition-hover"
            >
              <Icon name="ChevronLeft" size={16} className="text-text-secondary" />
            </button>
            <span className="text-sm font-body font-medium text-text-primary px-2">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 rounded hover:bg-muted transition-hover"
            >
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
            </button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="mb-4">
          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="h-8 flex items-center justify-center">
                <span className="text-xs font-body font-medium text-text-secondary">
                  {day}
                </span>
              </div>
            ))}
          </div>
          
          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {renderCalendarDays()}
          </div>
        </div>
      </div>

      {/* Upcoming Activities */}
      <div className="p-4">
        <h4 className="text-sm font-body font-medium text-text-primary mb-3">
          Próximas Actividades
        </h4>
        <div className="space-y-2">
          {upcomingActivities.length > 0 ? (
            upcomingActivities.map(({ day, activities }) => (
              <div key={day} className="text-xs">
                <div className="font-medium text-text-primary mb-1">
                  {day}/{currentMonth + 1}/{currentYear}
                </div>
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between py-1 px-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.program === 'Centro Vida' ? 'bg-accent' : 'bg-primary'
                      }`}></div>
                      <span className="text-text-secondary">{activity.type}</span>
                    </div>
                    <span className="text-text-secondary">{activity.time}</span>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-xs text-text-secondary">No hay actividades programadas</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;