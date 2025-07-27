import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityTemplates = ({ onTemplateSelect }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'template-1',
      name: 'Taller de Nutrición',
      program: 'Centro Vida',
      category: 'alimentacion',
      description: 'Taller educativo sobre alimentación saludable para adultos mayores con demostración práctica de preparación de alimentos nutritivos.',
      estimatedDuration: '2 horas',
      suggestedParticipants: '15-20',
      materials: ['Alimentos frescos', 'Utensilios de cocina', 'Material educativo', 'Balanza'],
      objectives: [
        'Educar sobre alimentación balanceada',
        'Demostrar preparación de comidas saludables',
        'Promover hábitos alimentarios adecuados'
      ]
    },
    {
      id: 'template-2',
      name: 'Actividad Recreativa',
      program: 'Centro Vida',
      category: 'recreacion',
      description: 'Actividad lúdica y recreativa que incluye juegos tradicionales, música y baile para promover la socialización y el bienestar físico.',
      estimatedDuration: '1.5 horas',
      suggestedParticipants: '20-30',
      materials: ['Equipo de sonido', 'Instrumentos musicales', 'Juegos de mesa', 'Sillas'],
      objectives: [
        'Fomentar la socialización',
        'Promover actividad física moderada',
        'Estimular la memoria y cognición'
      ]
    },
    {
      id: 'template-3',
      name: 'Sesión de Estimulación Temprana',
      program: 'ICBF',
      category: 'educacion-inicial',
      description: 'Sesión de estimulación temprana para niños de 0-5 años enfocada en el desarrollo cognitivo, motor y social a través del juego.',
      estimatedDuration: '1 hora',
      suggestedParticipants: '8-12',
      materials: ['Juguetes didácticos', 'Colchonetas', 'Pelotas', 'Libros ilustrados'],
      objectives: [
        'Estimular desarrollo motor',
        'Promover desarrollo cognitivo',
        'Fortalecer vínculo cuidador-niño'
      ]
    },
    {
      id: 'template-4',
      name: 'Taller de Fortalecimiento Familiar',
      program: 'ICBF',
      category: 'familia',
      description: 'Taller dirigido a padres y cuidadores sobre pautas de crianza, comunicación asertiva y resolución de conflictos familiares.',
      estimatedDuration: '2.5 horas',
      suggestedParticipants: '10-15',
      materials: ['Material didáctico', 'Proyector', 'Hojas de trabajo', 'Marcadores'],
      objectives: [
        'Fortalecer competencias parentales',
        'Mejorar comunicación familiar',
        'Prevenir violencia intrafamiliar'
      ]
    },
    {
      id: 'template-5',
      name: 'Actividad de Inclusión Social',
      program: 'Discapacidad',
      category: 'inclusion',
      description: 'Actividad grupal que promueve la inclusión social de personas con discapacidad a través de talleres artísticos y culturales.',
      estimatedDuration: '2 horas',
      suggestedParticipants: '12-18',
      materials: ['Materiales artísticos', 'Instrumentos adaptados', 'Sillas de ruedas', 'Apoyo técnico'],
      objectives: [
        'Promover inclusión social',
        'Desarrollar habilidades artísticas',
        'Fortalecer autoestima'
      ]
    }
  ];

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template.id);
    onTemplateSelect(template);
  };

  const getProgramColor = (program) => {
    const colors = {
      'Centro Vida': 'bg-blue-100 text-blue-800',
      'ICBF': 'bg-green-100 text-green-800',
      'Discapacidad': 'bg-purple-100 text-purple-800'
    };
    return colors[program] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Template" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Plantillas de Actividades
            </h2>
            <p className="text-sm text-text-secondary font-body">
              Seleccione una plantilla para agilizar el registro
            </p>
          </div>
        </div>
        
        {selectedTemplate && (
          <Button
            variant="outline"
            onClick={() => {
              setSelectedTemplate(null);
              onTemplateSelect(null);
            }}
            iconName="X"
            iconPosition="left"
            size="sm"
          >
            Limpiar Selección
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
              selectedTemplate === template.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => handleTemplateSelect(template)}
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <h3 className="font-body font-semibold text-text-primary text-sm">
                  {template.name}
                </h3>
                {selectedTemplate === template.id && (
                  <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-body font-medium ${getProgramColor(template.program)}`}>
                  {template.program}
                </span>
              </div>
              
              <p className="text-xs text-text-secondary font-body line-clamp-3">
                {template.description}
              </p>
              
              <div className="space-y-2 text-xs text-text-secondary font-body">
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={12} />
                  <span>Duración: {template.estimatedDuration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={12} />
                  <span>Participantes: {template.suggestedParticipants}</span>
                </div>
              </div>
              
              <div className="pt-2 border-t border-border">
                <p className="text-xs font-body font-medium text-text-primary mb-1">
                  Objetivos principales:
                </p>
                <ul className="text-xs text-text-secondary font-body space-y-1">
                  {template.objectives.slice(0, 2).map((objective, index) => (
                    <li key={index} className="flex items-start space-x-1">
                      <span className="text-primary">•</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                  {template.objectives.length > 2 && (
                    <li className="text-text-secondary italic">
                      +{template.objectives.length - 2} más...
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {templates.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="FileText" size={24} className="text-text-secondary" />
          </div>
          <p className="text-text-secondary font-body">
            No hay plantillas disponibles para el programa seleccionado
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityTemplates;