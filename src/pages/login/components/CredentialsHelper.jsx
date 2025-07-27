import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CredentialsHelper = () => {
  const [isOpen, setIsOpen] = useState(false);

  const mockCredentials = [
    {
      role: 'Administrador',
      email: 'admin@spar.gov.co',
      password: 'admin123',
      description: 'Acceso completo al sistema'
    },
    {
      role: 'Coordinador',
      email: 'coordinador@spar.gov.co',
      password: 'coord123',
      description: 'Gestión de actividades y reportes'
    },
    {
      role: 'Trabajador de Campo',
      email: 'trabajador@spar.gov.co',
      password: 'field123',
      description: 'Registro de actividades diarias'
    }
  ];

  return (
    <div className="mt-6">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        iconName="HelpCircle"
        iconPosition="left"
        className="w-full text-text-secondary hover:text-text-primary"
      >
        Ver credenciales de prueba
      </Button>

      {isOpen && (
        <div className="mt-4 p-4 bg-muted/50 border border-border rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Info" size={16} className="text-primary" />
            <p className="text-sm font-medium text-text-primary">
              Credenciales de Demostración
            </p>
          </div>
          
          <div className="space-y-3">
            {mockCredentials.map((cred, index) => (
              <div key={index} className="p-3 bg-surface border border-border rounded-md">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-text-primary">
                    {cred.role}
                  </p>
                  <span className="text-xs text-text-secondary bg-primary/10 px-2 py-1 rounded">
                    Demo
                  </span>
                </div>
                <div className="space-y-1 text-xs text-text-secondary font-mono">
                  <p><strong>Email:</strong> {cred.email}</p>
                  <p><strong>Contraseña:</strong> {cred.password}</p>
                </div>
                <p className="text-xs text-text-secondary mt-2 font-caption">
                  {cred.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3 p-2 bg-warning/10 border border-warning/20 rounded">
            <p className="text-xs text-warning-foreground font-caption">
              <strong>Nota:</strong> Estas son credenciales de demostración únicamente para propósitos de prueba.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CredentialsHelper;