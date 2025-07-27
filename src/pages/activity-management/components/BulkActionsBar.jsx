import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsBar = ({ 
  selectedCount, 
  onBulkApprove, 
  onBulkReject, 
  onBulkStatusChange, 
  onBulkExport, 
  onClearSelection 
}) => {
  const [showStatusChange, setShowStatusChange] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const statusOptions = [
    { value: 'pending', label: 'Pendiente' },
    { value: 'approved', label: 'Aprobado' },
    { value: 'completed', label: 'Completado' },
    { value: 'rejected', label: 'Rechazado' }
  ];

  const exportOptions = [
    { value: 'pdf', label: 'Exportar PDF' },
    { value: 'excel', label: 'Exportar Excel' },
    { value: 'csv', label: 'Exportar CSV' }
  ];

  const handleStatusChange = () => {
    if (selectedStatus) {
      onBulkStatusChange(selectedStatus);
      setSelectedStatus('');
      setShowStatusChange(false);
    }
  };

  const handleExport = (format) => {
    onBulkExport(format);
  };

  if (selectedCount === 0) {
    return null;
  }

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Icon name="CheckSquare" size={20} className="text-primary" />
            <span className="font-medium text-text-primary">
              {selectedCount} actividad{selectedCount !== 1 ? 'es' : ''} seleccionada{selectedCount !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Quick Actions */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onBulkApprove}
              iconName="Check"
              iconPosition="left"
              className="text-success border-success/20 hover:bg-success/10"
            >
              Aprobar
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onBulkReject}
              iconName="X"
              iconPosition="left"
              className="text-error border-error/20 hover:bg-error/10"
            >
              Rechazar
            </Button>

            {/* Status Change */}
            <div className="flex items-center space-x-2">
              {!showStatusChange ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowStatusChange(true)}
                  iconName="Edit"
                  iconPosition="left"
                >
                  Cambiar Estado
                </Button>
              ) : (
                <div className="flex items-center space-x-2">
                  <Select
                    options={statusOptions}
                    value={selectedStatus}
                    onChange={setSelectedStatus}
                    placeholder="Seleccionar estado"
                    className="w-40"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStatusChange}
                    disabled={!selectedStatus}
                    iconName="Check"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowStatusChange(false);
                      setSelectedStatus('');
                    }}
                    iconName="X"
                  />
                </div>
              )}
            </div>

            {/* Export Options */}
            <div className="relative group">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Exportar
              </Button>
              
              <div className="absolute top-full left-0 mt-1 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                {exportOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleExport(option.value)}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-muted transition-hover first:rounded-t-md last:rounded-b-md"
                  >
                    <Icon 
                      name={option.value === 'pdf' ? 'FileText' : option.value === 'excel' ? 'FileSpreadsheet' : 'Download'} 
                      size={16} 
                    />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Clear Selection */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearSelection}
          iconName="X"
          className="text-text-secondary hover:text-text-primary"
        >
          Limpiar Selección
        </Button>
      </div>

      {/* Action Summary */}
      <div className="mt-3 pt-3 border-t border-primary/10">
        <div className="flex items-center space-x-6 text-xs text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} />
            <span>Pendientes: {selectedCount}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>Beneficiarios afectados: {selectedCount * 15}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} />
            <span>Rango: Últimos 30 días</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsBar;