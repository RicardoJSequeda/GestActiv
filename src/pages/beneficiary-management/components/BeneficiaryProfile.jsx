import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BeneficiaryProfile = ({ beneficiary }) => {
  const [activeTab, setActiveTab] = useState('personal');

  if (!beneficiary) {
    return (
      <div className="flex items-center justify-center h-full bg-card rounded-lg border border-border">
        <div className="text-center">
          <Icon name="Users" size={48} className="mx-auto text-text-secondary mb-4" />
          <h3 className="text-lg font-heading font-semibold text-text-primary mb-2">
            Selecciona un Beneficiario
          </h3>
          <p className="text-text-secondary">
            Elige un beneficiario de la lista para ver su información detallada
          </p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'personal', label: 'Información Personal', icon: 'User' },
    { id: 'family', label: 'Composición Familiar', icon: 'Users' },
    { id: 'activities', label: 'Historial de Actividades', icon: 'Calendar' },
    { id: 'attendance', label: 'Asistencia', icon: 'CheckCircle' }
  ];

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-body font-semibold text-text-primary mb-3">Datos Básicos</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text-secondary">Nombre Completo</label>
              <p className="text-text-primary">{beneficiary.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Documento</label>
              <p className="text-text-primary">{beneficiary.documentType}: {beneficiary.documentNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Fecha de Nacimiento</label>
              <p className="text-text-primary">{beneficiary.birthDate}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Edad</label>
              <p className="text-text-primary">{beneficiary.age} años</p>
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="font-body font-semibold text-text-primary mb-3">Contacto</h4>
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-text-secondary">Teléfono</label>
              <p className="text-text-primary">{beneficiary.phone}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Dirección</label>
              <p className="text-text-primary">{beneficiary.address}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Barrio</label>
              <p className="text-text-primary">{beneficiary.neighborhood}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-text-secondary">Ciudad</label>
              <p className="text-text-primary">{beneficiary.city}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h4 className="font-body font-semibold text-text-primary mb-3">Información del Programa</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <label className="text-sm font-medium text-text-secondary">Programa</label>
            <p className="text-text-primary font-medium">{beneficiary.program}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <label className="text-sm font-medium text-text-secondary">Fecha de Ingreso</label>
            <p className="text-text-primary font-medium">{beneficiary.enrollmentDate}</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <label className="text-sm font-medium text-text-secondary">Estado</label>
            <p className={`font-medium ${
              beneficiary.status === 'Activo' ? 'text-success' : 'text-error'
            }`}>
              {beneficiary.status}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFamilyInfo = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-body font-semibold text-text-primary">Miembros de la Familia</h4>
        <Button variant="outline" size="sm" iconName="Plus">
          Agregar Miembro
        </Button>
      </div>
      
      <div className="space-y-4">
        {beneficiary.familyMembers?.map((member, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
            <Image
              src={member.photo}
              alt={`Foto de ${member.name}`}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h5 className="font-body font-medium text-text-primary">{member.name}</h5>
              <p className="text-sm text-text-secondary">{member.relationship} • {member.age} años</p>
              <p className="text-sm text-text-secondary">{member.occupation}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">{member.document}</p>
              <p className="text-sm text-text-secondary">{member.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderActivities = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-body font-semibold text-text-primary">Historial de Actividades</h4>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filtrar
          </Button>
          <Button variant="outline" size="sm" iconName="Download">
            Exportar
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {beneficiary.activities?.map((activity, index) => (
          <div key={index} className="border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h5 className="font-body font-medium text-text-primary">{activity.title}</h5>
                <p className="text-sm text-text-secondary">{activity.type} • {activity.date}</p>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                activity.attendance === 'Asistió' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {activity.attendance}
              </div>
            </div>
            
            <p className="text-sm text-text-secondary mb-3">{activity.description}</p>
            
            {activity.photos && activity.photos.length > 0 && (
              <div className="flex space-x-2">
                {activity.photos.map((photo, photoIndex) => (
                  <Image
                    key={photoIndex}
                    src={photo}
                    alt={`Foto de actividad ${photoIndex + 1}`}
                    className="w-16 h-16 rounded object-cover"
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderAttendance = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-success/10 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-success">{beneficiary.attendanceStats?.present || 0}</div>
          <div className="text-sm text-success">Asistencias</div>
        </div>
        <div className="bg-error/10 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-error">{beneficiary.attendanceStats?.absent || 0}</div>
          <div className="text-sm text-error">Faltas</div>
        </div>
        <div className="bg-primary/10 p-4 rounded-lg text-center">
          <div className="text-2xl font-bold text-primary">{beneficiary.attendanceStats?.percentage || 0}%</div>
          <div className="text-sm text-primary">Porcentaje</div>
        </div>
      </div>
      
      <div>
        <h4 className="font-body font-semibold text-text-primary mb-4">Registro de Asistencia</h4>
        <div className="space-y-2">
          {beneficiary.attendanceRecord?.map((record, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded">
              <div className="flex items-center space-x-3">
                <Icon 
                  name={record.status === 'Presente' ? 'CheckCircle' : 'XCircle'} 
                  size={16} 
                  className={record.status === 'Presente' ? 'text-success' : 'text-error'} 
                />
                <div>
                  <p className="font-medium text-text-primary">{record.activity}</p>
                  <p className="text-sm text-text-secondary">{record.date}</p>
                </div>
              </div>
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                record.status === 'Presente' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {record.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return renderPersonalInfo();
      case 'family':
        return renderFamilyInfo();
      case 'activities':
        return renderActivities();
      case 'attendance':
        return renderAttendance();
      default:
        return renderPersonalInfo();
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start space-x-4">
          <Image
            src={beneficiary.photo}
            alt={`Foto de ${beneficiary.name}`}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <h2 className="text-xl font-heading font-semibold text-text-primary">
              {beneficiary.name}
            </h2>
            <p className="text-text-secondary">
              {beneficiary.documentType}: {beneficiary.documentNumber}
            </p>
            <div className="flex items-center space-x-4 mt-2">
              <div className={`px-2 py-1 rounded text-xs font-medium ${
                beneficiary.status === 'Activo' ?'bg-success/10 text-success' :'bg-error/10 text-error'
              }`}>
                {beneficiary.status}
              </div>
              <span className="text-sm text-text-secondary">{beneficiary.program}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" iconName="Edit">
              Editar
            </Button>
            <Button variant="outline" size="sm" iconName="Download">
              Exportar
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-hover ${
                activeTab === tab.id
                  ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab.icon} size={16} />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default BeneficiaryProfile;