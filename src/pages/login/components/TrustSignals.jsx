import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      name: 'Gobierno de Colombia',
      icon: 'Shield',
      description: 'Plataforma oficial certificada'
    },
    {
      id: 2,
      name: 'ICBF Autorizado',
      icon: 'Award',
      description: 'Sistema autorizado por ICBF'
    },
    {
      id: 3,
      name: 'Datos Seguros',
      icon: 'Lock',
      description: 'Protección de datos garantizada'
    }
  ];

  return (
    <div className="mt-8 pt-6 border-t border-border">
      <p className="text-xs text-text-secondary text-center mb-4 font-caption">
        Sistema certificado y autorizado por:
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col items-center text-center p-3 bg-muted/50 rounded-lg"
          >
            <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={cert.icon} size={16} className="text-accent" />
            </div>
            <p className="text-xs font-medium text-text-primary font-body">
              {cert.name}
            </p>
            <p className="text-xs text-text-secondary font-caption mt-1">
              {cert.description}
            </p>
          </div>
        ))}
      </div>

      {/* Compliance Notice */}
      <div className="mt-6 p-3 bg-success/5 border border-success/10 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <p className="text-xs text-success font-medium">
            Cumple con normativas de protección de datos y privacidad
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;