import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const ActivityTable = ({ 
  activities, 
  selectedActivities, 
  onSelectionChange, 
  onSelectAll, 
  onSort, 
  sortConfig,
  onViewDetails,
  onEditActivity,
  onViewPhotos,
  onApproveActivity,
  onRejectActivity
}) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pendiente', icon: 'Clock' },
      approved: { color: 'bg-success/10 text-success border-success/20', label: 'Aprobado', icon: 'CheckCircle' },
      completed: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Completado', icon: 'Check' },
      rejected: { color: 'bg-error/10 text-error border-error/20', label: 'Rechazado', icon: 'XCircle' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-md text-xs font-medium border ${config.color}`}>
        <Icon name={config.icon} size={12} />
        <span>{config.label}</span>
      </span>
    );
  };

  const getProgramBadge = (program) => {
    const programConfig = {
      'centro-vida': { color: 'bg-blue-100 text-blue-800', label: 'Centro Vida' },
      'icbf': { color: 'bg-green-100 text-green-800', label: 'ICBF' },
      'adulto-mayor': { color: 'bg-purple-100 text-purple-800', label: 'Adulto Mayor' },
      'primera-infancia': { color: 'bg-pink-100 text-pink-800', label: 'Primera Infancia' },
      'juventud': { color: 'bg-orange-100 text-orange-800', label: 'Juventud' }
    };

    const config = programConfig[program] || { color: 'bg-gray-100 text-gray-800', label: program };
    
    return (
      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const handleSort = (column) => {
    const direction = sortConfig.column === column && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    onSort({ column, direction });
  };

  const getSortIcon = (column) => {
    if (sortConfig.column !== column) return 'ArrowUpDown';
    return sortConfig.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const toggleRowExpansion = (activityId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(activityId)) {
      newExpanded.delete(activityId);
    } else {
      newExpanded.add(activityId);
    }
    setExpandedRows(newExpanded);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-CO', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const isAllSelected = activities.length > 0 && selectedActivities.length === activities.length;
  const isIndeterminate = selectedActivities.length > 0 && selectedActivities.length < activities.length;

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden">
      {/* Table Header */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={onSelectAll}
                />
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Fecha</span>
                  <Icon name={getSortIcon('date')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('program')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Programa</span>
                  <Icon name={getSortIcon('program')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Categoría</span>
                  <Icon name={getSortIcon('category')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('fieldWorker')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Trabajador</span>
                  <Icon name={getSortIcon('fieldWorker')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left">
                <span className="text-sm font-medium text-text-primary">Beneficiarios</span>
              </th>
              <th className="px-4 py-3 text-left">
                <button
                  onClick={() => handleSort('status')}
                  className="flex items-center space-x-1 text-sm font-medium text-text-primary hover:text-primary transition-hover"
                >
                  <span>Estado</span>
                  <Icon name={getSortIcon('status')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-center">
                <span className="text-sm font-medium text-text-primary">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {activities.map((activity) => (
              <React.Fragment key={activity.id}>
                <tr className="hover:bg-muted/50 transition-hover">
                  <td className="px-4 py-3">
                    <Checkbox
                      checked={selectedActivities.includes(activity.id)}
                      onChange={(e) => onSelectionChange(activity.id, e.target.checked)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-text-primary">
                      {formatDate(activity.date)}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {new Date(activity.date).toLocaleTimeString('es-CO', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getProgramBadge(activity.program)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-text-primary">
                      {activity.category}
                    </div>
                    <div className="text-xs text-text-secondary">
                      {activity.subcategory}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                        <Icon name="User" size={12} color="white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-text-primary">
                          {activity.fieldWorker}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {activity.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} className="text-text-secondary" />
                      <span className="text-sm font-medium text-text-primary">
                        {activity.beneficiaryCount}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {getStatusBadge(activity.status)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleRowExpansion(activity.id)}
                        iconName={expandedRows.has(activity.id) ? "ChevronUp" : "ChevronDown"}
                        className="h-8 w-8 p-0"
                        title="Ver detalles"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(activity.id)}
                        iconName="Eye"
                        className="h-8 w-8 p-0"
                        title="Ver detalles completos"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEditActivity(activity.id)}
                        iconName="Edit"
                        className="h-8 w-8 p-0"
                        title="Editar actividad"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewPhotos(activity.id)}
                        iconName="Camera"
                        className="h-8 w-8 p-0"
                        title="Ver fotos"
                      />
                      {activity.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onApproveActivity(activity.id)}
                            iconName="Check"
                            className="h-8 w-8 p-0 text-success hover:bg-success/10"
                            title="Aprobar"
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onRejectActivity(activity.id)}
                            iconName="X"
                            className="h-8 w-8 p-0 text-error hover:bg-error/10"
                            title="Rechazar"
                          />
                        </>
                      )}
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Row Details */}
                {expandedRows.has(activity.id) && (
                  <tr>
                    <td colSpan="8" className="px-4 py-4 bg-muted/30">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-text-primary mb-2">Descripción de la Actividad</h4>
                          <p className="text-sm text-text-secondary">
                            {activity.description}
                          </p>
                        </div>
                        
                        {activity.photos && activity.photos.length > 0 && (
                          <div>
                            <h4 className="font-medium text-text-primary mb-2">Fotos de Evidencia</h4>
                            <div className="flex space-x-2">
                              {activity.photos.slice(0, 4).map((photo, index) => (
                                <div key={index} className="w-16 h-16 rounded-md overflow-hidden">
                                  <Image
                                    src={photo.url}
                                    alt={`Evidencia ${index + 1}`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              ))}
                              {activity.photos.length > 4 && (
                                <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center">
                                  <span className="text-xs text-text-secondary">
                                    +{activity.photos.length - 4}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between text-xs text-text-secondary">
                          <span>Creado: {formatDate(activity.createdAt)}</span>
                          <span>Última actualización: {formatDate(activity.updatedAt)}</span>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {activities.length === 0 && (
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-medium text-text-primary mb-2">
            No se encontraron actividades
          </h3>
          <p className="text-text-secondary">
            Ajusta los filtros para ver más resultados
          </p>
        </div>
      )}
    </div>
  );
};

export default ActivityTable;