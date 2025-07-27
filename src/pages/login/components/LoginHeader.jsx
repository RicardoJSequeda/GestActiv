import React from 'react';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg">
          <Icon name="Users" size={32} color="white" />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
        SPAR
      </h1>
      <p className="text-lg text-text-secondary font-body mb-1">
        Sistema de Programas de Actividades y Registro
      </p>
      <p className="text-sm text-text-secondary font-caption">
        Plataforma de Documentación de Programas Sociales
      </p>

      {/* Welcome Message */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/10 rounded-lg">
        <p className="text-sm text-text-primary font-medium">
          Bienvenido al sistema de registro de actividades
        </p>
        <p className="text-xs text-text-secondary mt-1">
          Ingrese sus credenciales para acceder al sistema
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;