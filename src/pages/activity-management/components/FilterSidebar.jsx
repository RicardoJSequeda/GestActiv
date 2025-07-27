import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isCollapsed, onToggleCollapse }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const programOptions = [
    { value: '', label: 'Todos los programas' },
    { value: 'centro-vida', label: 'Centro Vida' },
    { value: 'icbf', label: 'ICBF' },
    { value: 'adulto-mayor', label: 'Adulto Mayor' },
    { value: 'primera-infancia', label: 'Primera Infancia' },
    { value: 'juventud', label: 'Juventud' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'approved', label: 'Aprobado' },
    { value: 'completed', label: 'Completado' },
    { value: 'rejected', label: 'Rechazado' }
  ];

  const locationOptions = [
    { value: '', label: 'Todas las ubicaciones' },
    { value: 'bogota', label: 'Bogotá' },
    { value: 'medellin', label: 'Medellín' },
    { value: 'cali', label: 'Cali' },
    { value: 'barranquilla', label: 'Barranquilla' },
    { value: 'cartagena', label: 'Cartagena' }
  ];

  const fieldWorkerOptions = [
    { value: '', label: 'Todos los trabajadores' },
    { value: 'maria-gonzalez', label: 'María González' },
    { value: 'carlos-rodriguez', label: 'Carlos Rodríguez' },
    { value: 'ana-martinez', label: 'Ana Martínez' },
    { value: 'luis-hernandez', label: 'Luis Hernández' },
    { value: 'sofia-lopez', label: 'Sofía López' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      program: '',
      status: '',
      location: '',
      fieldWorker: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  const getActiveFilterCount = () => {
    return Object.values(localFilters).filter(value => value && value.toString().trim() !== '').length;
  };

  return (
    <div className={`bg-surface border-r border-border transition-all duration-300 ${
      isCollapsed ? 'w-12' : 'w-80'
    } flex-shrink-0`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h3 className="font-heading font-semibold text-text-primary">Filtros</h3>
            {getActiveFilterCount() > 0 && (
              <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          iconName={isCollapsed ? "ChevronRight" : "ChevronLeft"}
          className="h-8 w-8 p-0"
        />
      </div>

      {/* Filter Content */}
      {!isCollapsed && (
        <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          {/* Search */}
          <div>
            <Input
              label="Buscar actividades"
              type="search"
              placeholder="Buscar por descripción, beneficiario..."
              value={localFilters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="mb-4"
            />
          </div>

          {/* Program Filter */}
          <div>
            <Select
              label="Programa"
              options={programOptions}
              value={localFilters.program}
              onChange={(value) => handleFilterChange('program', value)}
              className="mb-4"
            />
          </div>

          {/* Status Filter */}
          <div>
            <Select
              label="Estado"
              options={statusOptions}
              value={localFilters.status}
              onChange={(value) => handleFilterChange('status', value)}
              className="mb-4"
            />
          </div>

          {/* Location Filter */}
          <div>
            <Select
              label="Ubicación"
              options={locationOptions}
              value={localFilters.location}
              onChange={(value) => handleFilterChange('location', value)}
              className="mb-4"
            />
          </div>

          {/* Field Worker Filter */}
          <div>
            <Select
              label="Trabajador de Campo"
              options={fieldWorkerOptions}
              value={localFilters.fieldWorker}
              onChange={(value) => handleFilterChange('fieldWorker', value)}
              className="mb-4"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <h4 className="font-body font-medium text-text-primary">Rango de Fechas</h4>
            <Input
              label="Fecha Desde"
              type="date"
              value={localFilters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              className="mb-2"
            />
            <Input
              label="Fecha Hasta"
              type="date"
              value={localFilters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>

          {/* Clear Filters */}
          {getActiveFilterCount() > 0 && (
            <div className="pt-4 border-t border-border">
              <Button
                variant="outline"
                fullWidth
                onClick={handleClearAll}
                iconName="X"
                iconPosition="left"
              >
                Limpiar Filtros
              </Button>
            </div>
          )}

          {/* Filter Summary */}
          <div className="text-xs text-text-secondary bg-muted p-3 rounded-md">
            <div className="flex items-center space-x-1 mb-1">
              <Icon name="Info" size={12} />
              <span className="font-medium">Resultados encontrados:</span>
            </div>
            <span>1,247 actividades coinciden con los filtros aplicados</span>
          </div>
        </div>
      )}

      {/* Collapsed State */}
      {isCollapsed && (
        <div className="p-2 space-y-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-10 p-0"
            iconName="Search"
            title="Buscar"
          />
          <Button
            variant="ghost"
            size="sm"
            className="w-full h-10 p-0"
            iconName="Filter"
            title="Filtros"
          />
          {getActiveFilterCount() > 0 && (
            <div className="w-6 h-6 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center mx-auto">
              {getActiveFilterCount()}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterSidebar;