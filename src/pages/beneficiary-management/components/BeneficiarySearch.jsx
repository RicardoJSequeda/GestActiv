import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const BeneficiarySearch = ({ onSearch, onFilter, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const programOptions = [
    { value: '', label: 'Todos los programas' },
    { value: 'Centro Vida', label: 'Centro Vida' },
    { value: 'ICBF', label: 'ICBF' },
    { value: 'Familias en Acción', label: 'Familias en Acción' },
    { value: 'Adulto Mayor', label: 'Adulto Mayor' }
  ];

  const statusOptions = [
    { value: '', label: 'Todos los estados' },
    { value: 'Activo', label: 'Activo' },
    { value: 'Inactivo', label: 'Inactivo' },
    { value: 'Suspendido', label: 'Suspendido' }
  ];

  const ageRangeOptions = [
    { value: '', label: 'Todas las edades' },
    { value: '0-5', label: '0-5 años' },
    { value: '6-12', label: '6-12 años' },
    { value: '13-17', label: '13-17 años' },
    { value: '18-59', label: '18-59 años' },
    { value: '60+', label: '60+ años' }
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleProgramFilter = (value) => {
    setSelectedProgram(value);
    onFilter({ program: value, status: selectedStatus });
  };

  const handleStatusFilter = (value) => {
    setSelectedStatus(value);
    onFilter({ program: selectedProgram, status: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedProgram('');
    setSelectedStatus('');
    onSearch('');
    onFilter({ program: '', status: '' });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-semibold text-text-primary">
          Buscar Beneficiarios
        </h3>
        <Button
          variant="primary"
          onClick={onAddNew}
          iconName="Plus"
          iconPosition="left"
        >
          Nuevo Beneficiario
        </Button>
      </div>

      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Input
            type="search"
            placeholder="Buscar por nombre, documento o ubicación..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
          />
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-48">
            <Select
              placeholder="Filtrar por programa"
              options={programOptions}
              value={selectedProgram}
              onChange={handleProgramFilter}
            />
          </div>
          
          <div className="flex-1 min-w-48">
            <Select
              placeholder="Filtrar por estado"
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusFilter}
            />
          </div>

          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName={showAdvancedFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Filtros Avanzados
          </Button>

          {(searchTerm || selectedProgram || selectedStatus) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Limpiar
            </Button>
          )}
        </div>

        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="border-t border-border pt-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Rango de Edad"
                options={ageRangeOptions}
                placeholder="Seleccionar edad"
              />
              
              <Input
                label="Fecha de Ingreso Desde"
                type="date"
                placeholder="dd/mm/aaaa"
              />
              
              <Input
                label="Fecha de Ingreso Hasta"
                type="date"
                placeholder="dd/mm/aaaa"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                label="Barrio"
                type="text"
                placeholder="Filtrar por barrio"
              />
              
              <Select
                label="Nivel de Participación"
                options={[
                  { value: '', label: 'Todos los niveles' },
                  { value: 'alto', label: 'Alto (>80% asistencia)' },
                  { value: 'medio', label: 'Medio (50-80% asistencia)' },
                  { value: 'bajo', label: 'Bajo (<50% asistencia)' }
                ]}
                placeholder="Seleccionar nivel"
              />
            </div>
          </div>
        )}
      </div>

      {/* Search Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-text-secondary">
          <span>Mostrando resultados de búsqueda</span>
          {(searchTerm || selectedProgram || selectedStatus) && (
            <div className="flex items-center space-x-2">
              {searchTerm && (
                <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                  "{searchTerm}"
                </span>
              )}
              {selectedProgram && (
                <span className="px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                  {selectedProgram}
                </span>
              )}
              {selectedStatus && (
                <span className="px-2 py-1 bg-secondary/10 text-secondary rounded text-xs">
                  {selectedStatus}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" iconName="Download">
            Exportar Lista
          </Button>
          <Button variant="ghost" size="sm" iconName="Printer">
            Imprimir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BeneficiarySearch;