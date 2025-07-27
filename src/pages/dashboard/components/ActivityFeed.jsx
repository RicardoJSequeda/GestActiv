import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ActivityFeed = () => {
  const recentActivities = [
    {
      id: 1,
      type: "Taller Educativo",
      program: "Centro Vida",
      beneficiary: "María Elena Rodríguez",
      coordinator: "Ana García",
      time: "10:30",
      status: "completed",
      photo: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 2,
      type: "Actividad Recreativa",
      program: "ICBF",
      beneficiary: "Carlos Mendoza",
      coordinator: "Luis Torres",
      time: "09:15",
      status: "pending",
      photo: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 3,
      type: "Consulta Nutricional",
      program: "Centro Vida",
      beneficiary: "Rosa Martínez",
      coordinator: "Carmen López",
      time: "08:45",
      status: "approved",
      photo: "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      id: 4,
      type: "Seguimiento Psicológico",
      program: "ICBF",
      beneficiary: "Diego Herrera",
      coordinator: "Patricia Ruiz",
      time: "14:20",
      status: "completed",
      photo: "https://images.pexels.com/photos/8613268/pexels-photo-8613268.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'approved':
        return 'Clock';
      case 'pending':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'approved':
        return 'text-primary';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-text-secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completada';
      case 'approved':
        return 'Aprobada';
      case 'pending':
        return 'Pendiente';
      default:
        return 'Sin estado';
    }
  };

  const getProgramColor = (program) => {
    switch (program) {
      case 'Centro Vida':
        return 'bg-accent/10 text-accent border-accent/20';
      case 'ICBF':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-text-secondary border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-heading font-semibold text-text-primary">
            Actividades Recientes
          </h3>
          <button className="text-sm font-body text-primary hover:text-primary/80 transition-hover">
            Ver todas
          </button>
        </div>
      </div>
      
      <div className="divide-y divide-border">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-muted/50 transition-hover">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={activity.photo}
                  alt={`Actividad ${activity.type}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-body font-medium text-text-primary truncate">
                      {activity.type}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {activity.beneficiary}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-body border ${getProgramColor(activity.program)}`}>
                      {activity.program}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Icon name="User" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary">
                      {activity.coordinator}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-text-secondary">
                      {activity.time}
                    </span>
                    <Icon 
                      name={getStatusIcon(activity.status)} 
                      size={14} 
                      className={getStatusColor(activity.status)} 
                    />
                    <span className={`text-xs font-body ${getStatusColor(activity.status)}`}>
                      {getStatusText(activity.status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;