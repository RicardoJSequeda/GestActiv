import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FormActions = ({ 
  onSaveDraft, 
  onSubmitForApproval, 
  onComplete, 
  isLoading, 
  hasUnsavedChanges,
  lastSaved 
}) => {
  const formatLastSaved = (date) => {
    if (!date) return '';
    return `Último guardado: ${date.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })}`;
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Save" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-heading font-semibold text-text-primary">
              Guardar Actividad
            </h2>
            <div className="flex items-center space-x-4 text-sm text-text-secondary font-body">
              {lastSaved && (
                <span>{formatLastSaved(lastSaved)}</span>
              )}
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Cambios sin guardar</span>
                </div>
              )}
              {!hasUnsavedChanges && lastSaved && (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Guardado</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={onSaveDraft}
            disabled={isLoading}
            loading={isLoading === 'draft'}
            iconName="FileText"
            iconPosition="left"
            className="sm:w-auto"
          >
            Guardar Borrador
          </Button>

          <Button
            variant="secondary"
            onClick={onSubmitForApproval}
            disabled={isLoading}
            loading={isLoading === 'approval'}
            iconName="Send"
            iconPosition="left"
            className="sm:w-auto"
          >
            Enviar para Aprobación
          </Button>

          <Button
            variant="default"
            onClick={onComplete}
            disabled={isLoading}
            loading={isLoading === 'complete'}
            iconName="CheckCircle"
            iconPosition="left"
            className="sm:w-auto"
          >
            Marcar como Completada
          </Button>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm font-body">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="FileText" size={16} />
            <span>Borrador: Se puede editar posteriormente</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Send" size={16} />
            <span>Aprobación: Requiere revisión del supervisor</span>
          </div>
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="CheckCircle" size={16} />
            <span>Completada: Actividad finalizada y documentada</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormActions;