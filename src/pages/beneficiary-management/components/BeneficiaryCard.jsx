import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const BeneficiaryCard = ({ beneficiary, isSelected, onClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Activo':
        return 'text-success bg-success/10';
      case 'Inactivo':
        return 'text-error bg-error/10';
      case 'Suspendido':
        return 'text-warning bg-warning/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getProgramColor = (program) => {
    switch (program) {
      case 'Centro Vida':
        return 'bg-blue-100 text-blue-800';
      case 'ICBF':
        return 'bg-green-100 text-green-800';
      case 'Familias en Acción':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-hover ${
        isSelected 
          ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
      }`}
    >
      <div className="flex items-start space-x-3">
        <div className="relative">
          <Image
            src={beneficiary.photo}
            alt={`Foto de ${beneficiary.name}`}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
            beneficiary.status === 'Activo' ? 'bg-success' : 'bg-error'
          }`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-body font-semibold text-text-primary truncate">
                {beneficiary.name}
              </h3>
              <p className="text-sm text-text-secondary">
                {beneficiary.documentType}: {beneficiary.documentNumber}
              </p>
            </div>
            
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(beneficiary.status)}`}>
              {beneficiary.status}
            </div>
          </div>
          
          <div className="mt-2 space-y-1">
            <div className={`inline-block px-2 py-1 rounded text-xs font-medium ${getProgramColor(beneficiary.program)}`}>
              {beneficiary.program}
            </div>
            
            <div className="flex items-center text-xs text-text-secondary">
              <Icon name="Calendar" size={12} className="mr-1" />
              <span>Última actividad: {beneficiary.lastActivity}</span>
            </div>
            
            <div className="flex items-center text-xs text-text-secondary">
              <Icon name="MapPin" size={12} className="mr-1" />
              <span>{beneficiary.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeneficiaryCard;