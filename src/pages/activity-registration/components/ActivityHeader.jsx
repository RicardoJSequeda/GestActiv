import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ActivityHeader = ({ 
  activityDate, 
  setActivityDate, 
  selectedProgram, 
  setSelectedProgram, 
  selectedCategory, 
  setSelectedCategory,
  errors 
}) => {
  const programOptions = [
    { value: 'centro-vida', label: 'Centro Vida' },
    { value: 'icbf', label: 'ICBF' },
    { value: 'primera-infancia', label: 'Primera Infancia' },
    { value: 'adulto-mayor', label: 'Adulto Mayor' },
    { value: 'discapacidad', label: 'Discapacidad' },
    { value: 'otro', label: 'Otro Programa' }
  ];

  const getCategoryOptions = (program) => {
    const categoryMap = {
      'centro-vida': [
        { value: 'alimentacion', label: 'Alimentación y Nutrición' },
        { value: 'salud', label: 'Atención en Salud' },
        { value: 'recreacion', label: 'Recreación y Deporte' },
        { value: 'educacion', label: 'Educación y Capacitación' },
        { value: 'psicosocial', label: 'Apoyo Psicosocial' }
      ],
      'icbf': [
        { value: 'proteccion', label: 'Protección Infantil' },
        { value: 'nutricion', label: 'Nutrición Infantil' },
        { value: 'educacion-inicial', label: 'Educación Inicial' },
        { value: 'familia', label: 'Fortalecimiento Familiar' },
        { value: 'prevencion', label: 'Prevención de Violencia' }
      ],
      'primera-infancia': [
        { value: 'desarrollo', label: 'Desarrollo Integral' },
        { value: 'estimulacion', label: 'Estimulación Temprana' },
        { value: 'cuidado', label: 'Cuidado y Crianza' },
        { value: 'salud-infantil', label: 'Salud Infantil' }
      ],
      'adulto-mayor': [
        { value: 'cuidado-personal', label: 'Cuidado Personal' },
        { value: 'actividad-fisica', label: 'Actividad Física' },
        { value: 'socializacion', label: 'Socialización' },
        { value: 'salud-mental', label: 'Salud Mental' }
      ],
      'discapacidad': [
        { value: 'inclusion', label: 'Inclusión Social' },
        { value: 'rehabilitacion', label: 'Rehabilitación' },
        { value: 'capacitacion', label: 'Capacitación Laboral' },
        { value: 'apoyo-familiar', label: 'Apoyo Familiar' }
      ],
      'otro': [
        { value: 'general', label: 'Actividad General' },
        { value: 'especial', label: 'Actividad Especial' }
      ]
    };
    return categoryMap[program] || [];
  };

  const formatDateForInput = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    setActivityDate(dateValue);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calendar" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Información Básica de la Actividad
          </h2>
          <p className="text-sm text-text-secondary font-body">
            Complete los datos principales de la actividad a registrar
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <Input
            type="date"
            label="Fecha de la Actividad"
            value={formatDateForInput(activityDate)}
            onChange={handleDateChange}
            required
            error={errors.activityDate}
            className="w-full"
          />
        </div>

        <div>
          <Select
            label="Programa Social"
            placeholder="Seleccione un programa"
            options={programOptions}
            value={selectedProgram}
            onChange={setSelectedProgram}
            required
            error={errors.selectedProgram}
          />
        </div>

        <div>
          <Select
            label="Categoría de Actividad"
            placeholder="Seleccione una categoría"
            options={getCategoryOptions(selectedProgram)}
            value={selectedCategory}
            onChange={setSelectedCategory}
            required
            disabled={!selectedProgram}
            error={errors.selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityHeader;