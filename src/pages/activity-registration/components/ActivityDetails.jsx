import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const ActivityDetails = ({ 
  activityTitle,
  setActivityTitle,
  activityDescription,
  setActivityDescription,
  selectedBeneficiaries,
  setSelectedBeneficiaries,
  participantCount,
  setParticipantCount,
  errors 
}) => {
  const [showBeneficiarySearch, setShowBeneficiarySearch] = useState(false);
  const [beneficiarySearch, setBeneficiarySearch] = useState('');

  // Mock beneficiaries data
  const mockBeneficiaries = [
    { 
      value: 'ben-001', 
      label: 'María Elena Rodríguez García',
      description: 'Cédula: 52.123.456 - Centro Vida Norte'
    },
    { 
      value: 'ben-002', 
      label: 'Carlos Alberto Mendoza López',
      description: 'Cédula: 79.234.567 - ICBF Sede Principal'
    },
    { 
      value: 'ben-003', 
      label: 'Ana Sofía Herrera Castillo',
      description: 'Cédula: 63.345.678 - Primera Infancia'
    },
    { 
      value: 'ben-004', 
      label: 'José Miguel Torres Vargas',
      description: 'Cédula: 80.456.789 - Adulto Mayor'
    },
    { 
      value: 'ben-005', 
      label: 'Luz Marina Pérez Jiménez',
      description: 'Cédula: 55.567.890 - Centro Vida Sur'
    },
    { 
      value: 'ben-006', 
      label: 'Roberto Antonio Silva Cruz',
      description: 'Cédula: 76.678.901 - Discapacidad'
    }
  ];

  const filteredBeneficiaries = mockBeneficiaries.filter(beneficiary =>
    beneficiary.label.toLowerCase().includes(beneficiarySearch.toLowerCase()) ||
    beneficiary.description.toLowerCase().includes(beneficiarySearch.toLowerCase())
  );

  const handleBeneficiarySelect = (beneficiaryId) => {
    if (!selectedBeneficiaries.includes(beneficiaryId)) {
      setSelectedBeneficiaries([...selectedBeneficiaries, beneficiaryId]);
    }
  };

  const handleBeneficiaryRemove = (beneficiaryId) => {
    setSelectedBeneficiaries(selectedBeneficiaries.filter(id => id !== beneficiaryId));
  };

  const getSelectedBeneficiaryNames = () => {
    return selectedBeneficiaries.map(id => {
      const beneficiary = mockBeneficiaries.find(b => b.value === id);
      return beneficiary ? beneficiary.label : '';
    }).filter(name => name);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
          <Icon name="FileText" size={20} className="text-accent" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Detalles de la Actividad
          </h2>
          <p className="text-sm text-text-secondary font-body">
            Describa la actividad realizada y asocie los beneficiarios
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Input
            type="text"
            label="Título de la Actividad"
            placeholder="Ej: Taller de Nutrición para Adultos Mayores"
            value={activityTitle}
            onChange={(e) => setActivityTitle(e.target.value)}
            required
            error={errors.activityTitle}
            maxLength={100}
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-text-primary mb-2">
            Descripción Detallada *
          </label>
          <textarea
            value={activityDescription}
            onChange={(e) => setActivityDescription(e.target.value)}
            placeholder="Describa detalladamente la actividad realizada, metodología utilizada, objetivos alcanzados y observaciones relevantes..."
            rows={6}
            className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none font-body text-sm"
            maxLength={1000}
          />
          {errors.activityDescription && (
            <p className="mt-1 text-sm text-error font-body">{errors.activityDescription}</p>
          )}
          <p className="mt-1 text-xs text-text-secondary font-body">
            {activityDescription.length}/1000 caracteres
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-body font-medium text-text-primary mb-2">
              Beneficiarios Participantes
            </label>
            
            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={() => setShowBeneficiarySearch(!showBeneficiarySearch)}
                iconName="UserPlus"
                iconPosition="left"
                className="w-full justify-center"
              >
                Agregar Beneficiarios
              </Button>

              {showBeneficiarySearch && (
                <div className="border border-border rounded-md p-4 bg-muted/30">
                  <Input
                    type="search"
                    placeholder="Buscar por nombre o cédula..."
                    value={beneficiarySearch}
                    onChange={(e) => setBeneficiarySearch(e.target.value)}
                    className="mb-3"
                  />
                  
                  <div className="max-h-48 overflow-y-auto space-y-2">
                    {filteredBeneficiaries.map((beneficiary) => (
                      <div
                        key={beneficiary.value}
                        className="flex items-center justify-between p-2 bg-card rounded border border-border hover:bg-muted/50 transition-hover"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-body font-medium text-text-primary">
                            {beneficiary.label}
                          </p>
                          <p className="text-xs text-text-secondary font-body">
                            {beneficiary.description}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBeneficiarySelect(beneficiary.value)}
                          disabled={selectedBeneficiaries.includes(beneficiary.value)}
                          iconName="Plus"
                        >
                          {selectedBeneficiaries.includes(beneficiary.value) ? 'Agregado' : 'Agregar'}
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedBeneficiaries.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-body font-medium text-text-primary">
                    Beneficiarios Seleccionados ({selectedBeneficiaries.length})
                  </p>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {getSelectedBeneficiaryNames().map((name, index) => (
                      <div
                        key={selectedBeneficiaries[index]}
                        className="flex items-center justify-between p-2 bg-primary/5 rounded border border-primary/20"
                      >
                        <span className="text-sm font-body text-text-primary">{name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleBeneficiaryRemove(selectedBeneficiaries[index])}
                          iconName="X"
                          className="h-6 w-6 p-0 text-text-secondary hover:text-error"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {errors.selectedBeneficiaries && (
              <p className="mt-1 text-sm text-error font-body">{errors.selectedBeneficiaries}</p>
            )}
          </div>

          <div>
            <Input
              type="number"
              label="Número Total de Participantes"
              placeholder="0"
              value={participantCount}
              onChange={(e) => setParticipantCount(e.target.value)}
              min="0"
              max="500"
              required
              error={errors.participantCount}
              description="Incluye beneficiarios registrados y otros participantes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;