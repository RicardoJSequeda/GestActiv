import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusNotificationBar from '../../components/ui/StatusNotificationBar';
import FilterSidebar from './components/FilterSidebar';
import ActivityTable from './components/ActivityTable';
import BulkActionsBar from './components/BulkActionsBar';
import ActivityMobileCard from './components/ActivityMobileCard';
import TablePagination from './components/TablePagination';

import Button from '../../components/ui/Button';

const ActivityManagement = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [sortConfig, setSortConfig] = useState({ column: 'date', direction: 'desc' });
  const [filters, setFilters] = useState({
    program: '',
    status: '',
    location: '',
    fieldWorker: '',
    dateFrom: '',
    dateTo: '',
    search: ''
  });

  // Mock data for activities
  const mockActivities = [
    {
      id: 1,
      date: new Date('2025-01-26T10:30:00'),
      program: 'centro-vida',
      category: 'Actividad Física',
      subcategory: 'Ejercicios de Movilidad',
      fieldWorker: 'María González',
      location: 'Bogotá',
      beneficiaryCount: 15,
      status: 'pending',
      description: `Sesión de ejercicios de movilidad articular dirigida a adultos mayores del Centro Vida.\nSe realizaron ejercicios de estiramiento y fortalecimiento muscular adaptados a las capacidades de cada participante.\nLa actividad tuvo una duración de 45 minutos con descansos programados.`,
      photos: [
        { url: 'https://images.pexels.com/photos/3768916/pexels-photo-3768916.jpeg', caption: 'Ejercicios grupales' },
        { url: 'https://images.pexels.com/photos/3768997/pexels-photo-3768997.jpeg', caption: 'Participantes activos' },
        { url: 'https://images.pexels.com/photos/3768914/pexels-photo-3768914.jpeg', caption: 'Instructor guiando' }
      ],
      createdAt: new Date('2025-01-26T10:30:00'),
      updatedAt: new Date('2025-01-26T15:45:00')
    },
    {
      id: 2,
      date: new Date('2025-01-26T14:00:00'),
      program: 'icbf',
      category: 'Educación Nutricional',
      subcategory: 'Taller de Alimentación Saludable',
      fieldWorker: 'Carlos Rodríguez',
      location: 'Medellín',
      beneficiaryCount: 22,
      status: 'approved',
      description: `Taller educativo sobre hábitos alimentarios saludables dirigido a madres gestantes y lactantes.\nSe abordaron temas de nutrición durante el embarazo y la lactancia.\nIncluye entrega de material educativo y recetas saludables.`,
      photos: [
        { url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg', caption: 'Taller nutricional' },
        { url: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', caption: 'Material educativo' }
      ],
      createdAt: new Date('2025-01-26T14:00:00'),
      updatedAt: new Date('2025-01-26T16:30:00')
    },
    {
      id: 3,
      date: new Date('2025-01-25T09:00:00'),
      program: 'primera-infancia',
      category: 'Desarrollo Cognitivo',
      subcategory: 'Estimulación Temprana',
      fieldWorker: 'Ana Martínez',
      location: 'Cali',
      beneficiaryCount: 18,
      status: 'completed',
      description: `Sesión de estimulación temprana para niños de 0 a 3 años.\nActividades de desarrollo motor fino y grueso.\nParticipación activa de los cuidadores en las actividades.`,
      photos: [
        { url: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg', caption: 'Estimulación temprana' },
        { url: 'https://images.pexels.com/photos/8613090/pexels-photo-8613090.jpeg', caption: 'Niños participando' },
        { url: 'https://images.pexels.com/photos/8613091/pexels-photo-8613091.jpeg', caption: 'Cuidadores involucrados' },
        { url: 'https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg', caption: 'Material didáctico' }
      ],
      createdAt: new Date('2025-01-25T09:00:00'),
      updatedAt: new Date('2025-01-25T11:30:00')
    },
    {
      id: 4,
      date: new Date('2025-01-25T16:00:00'),
      program: 'juventud',
      category: 'Formación Laboral',
      subcategory: 'Taller de Emprendimiento',
      fieldWorker: 'Luis Hernández',
      location: 'Barranquilla',
      beneficiaryCount: 12,
      status: 'pending',
      description: `Taller de emprendimiento juvenil enfocado en el desarrollo de habilidades empresariales.\nSe trabajaron conceptos de plan de negocio y marketing digital.\nLos participantes presentaron sus ideas de emprendimiento.`,
      photos: [
        { url: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', caption: 'Taller emprendimiento' },
        { url: 'https://images.pexels.com/photos/3184466/pexels-photo-3184466.jpeg', caption: 'Jóvenes participando' }
      ],
      createdAt: new Date('2025-01-25T16:00:00'),
      updatedAt: new Date('2025-01-25T18:45:00')
    },
    {
      id: 5,
      date: new Date('2025-01-24T11:00:00'),
      program: 'adulto-mayor',
      category: 'Recreación',
      subcategory: 'Actividades Lúdicas',
      fieldWorker: 'Sofía López',
      location: 'Cartagena',
      beneficiaryCount: 20,
      status: 'approved',
      description: `Jornada recreativa con juegos tradicionales y actividades lúdicas para adultos mayores.\nSe realizaron juegos de mesa, bingo y actividades de memoria.\nExcelente participación y ambiente de camaradería.`,
      photos: [
        { url: 'https://images.pexels.com/photos/3768915/pexels-photo-3768915.jpeg', caption: 'Juegos tradicionales' }
      ],
      createdAt: new Date('2025-01-24T11:00:00'),
      updatedAt: new Date('2025-01-24T13:30:00')
    },
    {
      id: 6,
      date: new Date('2025-01-24T08:30:00'),
      program: 'centro-vida',
      category: 'Salud Preventiva',
      subcategory: 'Control Médico',
      fieldWorker: 'María González',
      location: 'Bogotá',
      beneficiaryCount: 25,
      status: 'completed',
      description: `Jornada de control médico preventivo para adultos mayores.\nSe realizaron tomas de presión arterial, peso y talla.\nEntrega de medicamentos y seguimiento a tratamientos.`,
      photos: [
        { url: 'https://images.pexels.com/photos/3768917/pexels-photo-3768917.jpeg', caption: 'Control médico' },
        { url: 'https://images.pexels.com/photos/3768918/pexels-photo-3768918.jpeg', caption: 'Toma de signos vitales' }
      ],
      createdAt: new Date('2025-01-24T08:30:00'),
      updatedAt: new Date('2025-01-24T12:00:00')
    },
    {
      id: 7,
      date: new Date('2025-01-23T15:30:00'),
      program: 'icbf',
      category: 'Protección Infantil',
      subcategory: 'Seguimiento Familiar',
      fieldWorker: 'Carlos Rodríguez',
      location: 'Medellín',
      beneficiaryCount: 8,
      status: 'rejected',
      description: `Visita domiciliaria de seguimiento a familias en proceso de restablecimiento de derechos.\nEvaluación del entorno familiar y condiciones de vida de los menores.\nDocumentación fotográfica del estado de las viviendas.`,
      photos: [],
      createdAt: new Date('2025-01-23T15:30:00'),
      updatedAt: new Date('2025-01-23T18:00:00')
    }
  ];

  // Filter and sort activities
  const getFilteredAndSortedActivities = () => {
    let filtered = mockActivities.filter(activity => {
      const matchesProgram = !filters.program || activity.program === filters.program;
      const matchesStatus = !filters.status || activity.status === filters.status;
      const matchesLocation = !filters.location || activity.location.toLowerCase().includes(filters.location.toLowerCase());
      const matchesFieldWorker = !filters.fieldWorker || activity.fieldWorker.toLowerCase().includes(filters.fieldWorker.toLowerCase());
      const matchesSearch = !filters.search || 
        activity.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        activity.subcategory.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesDateFrom = !filters.dateFrom || new Date(activity.date) >= new Date(filters.dateFrom);
      const matchesDateTo = !filters.dateTo || new Date(activity.date) <= new Date(filters.dateTo);

      return matchesProgram && matchesStatus && matchesLocation && matchesFieldWorker && matchesSearch && matchesDateFrom && matchesDateTo;
    });

    // Sort activities
    filtered.sort((a, b) => {
      let aValue = a[sortConfig.column];
      let bValue = b[sortConfig.column];

      if (sortConfig.column === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const filteredActivities = getFilteredAndSortedActivities();
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Event handlers
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      program: '',
      status: '',
      location: '',
      fieldWorker: '',
      dateFrom: '',
      dateTo: '',
      search: ''
    });
    setCurrentPage(1);
  };

  const handleSelectionChange = (activityId, isSelected) => {
    if (isSelected) {
      setSelectedActivities([...selectedActivities, activityId]);
    } else {
      setSelectedActivities(selectedActivities.filter(id => id !== activityId));
    }
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedActivities(paginatedActivities.map(activity => activity.id));
    } else {
      setSelectedActivities([]);
    }
  };

  const handleSort = (newSortConfig) => {
    setSortConfig(newSortConfig);
  };

  const handleViewDetails = (activityId) => {
    console.log('Ver detalles de actividad:', activityId);
  };

  const handleEditActivity = (activityId) => {
    navigate('/activity-registration', { state: { editActivityId: activityId } });
  };

  const handleViewPhotos = (activityId) => {
    console.log('Ver fotos de actividad:', activityId);
  };

  const handleApproveActivity = (activityId) => {
    console.log('Aprobar actividad:', activityId);
  };

  const handleRejectActivity = (activityId) => {
    console.log('Rechazar actividad:', activityId);
  };

  const handleBulkApprove = () => {
    console.log('Aprobar actividades seleccionadas:', selectedActivities);
    setSelectedActivities([]);
  };

  const handleBulkReject = () => {
    console.log('Rechazar actividades seleccionadas:', selectedActivities);
    setSelectedActivities([]);
  };

  const handleBulkStatusChange = (status) => {
    console.log('Cambiar estado de actividades seleccionadas:', selectedActivities, 'a', status);
    setSelectedActivities([]);
  };

  const handleBulkExport = (format) => {
    console.log('Exportar actividades seleccionadas en formato:', format);
  };

  const handleClearSelection = () => {
    setSelectedActivities([]);
  };

  // Responsive handling
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-16">
        <div className="flex h-[calc(100vh-4rem)]">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
            isCollapsed={isFilterCollapsed}
            onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
          />

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-auto">
              <div className="p-6">
                {/* Page Header */}
                <div className="mb-6">
                  <Breadcrumb />
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h1 className="text-2xl font-heading font-bold text-text-primary">
                        Gestión de Actividades
                      </h1>
                      <p className="text-text-secondary font-body">
                        Revisa, aprueba y organiza las actividades documentadas en todos los programas sociales
                      </p>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => navigate('/activity-registration')}
                        iconName="Plus"
                        iconPosition="left"
                      >
                        Nueva Actividad
                      </Button>
                      <Button
                        variant="outline"
                        iconName="Download"
                        iconPosition="left"
                      >
                        Exportar Todo
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Status Notifications */}
                <StatusNotificationBar />

                {/* Bulk Actions */}
                <BulkActionsBar
                  selectedCount={selectedActivities.length}
                  onBulkApprove={handleBulkApprove}
                  onBulkReject={handleBulkReject}
                  onBulkStatusChange={handleBulkStatusChange}
                  onBulkExport={handleBulkExport}
                  onClearSelection={handleClearSelection}
                />

                {/* Results Summary */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>
                      {filteredActivities.length.toLocaleString('es-CO')} actividades encontradas
                    </span>
                    <div className="h-4 w-px bg-border" />
                    <span>
                      {filteredActivities.filter(a => a.status === 'pending').length} pendientes de aprobación
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobile(!isMobile)}
                      iconName={isMobile ? "Table" : "Grid3X3"}
                      className="lg:hidden"
                    />
                  </div>
                </div>

                {/* Content */}
                {isMobile ? (
                  <div className="space-y-4">
                    {paginatedActivities.map((activity) => (
                      <ActivityMobileCard
                        key={activity.id}
                        activity={activity}
                        isSelected={selectedActivities.includes(activity.id)}
                        onSelectionChange={handleSelectionChange}
                        onViewDetails={handleViewDetails}
                        onEditActivity={handleEditActivity}
                        onViewPhotos={handleViewPhotos}
                        onApproveActivity={handleApproveActivity}
                        onRejectActivity={handleRejectActivity}
                      />
                    ))}
                  </div>
                ) : (
                  <ActivityTable
                    activities={paginatedActivities}
                    selectedActivities={selectedActivities}
                    onSelectionChange={handleSelectionChange}
                    onSelectAll={handleSelectAll}
                    onSort={handleSort}
                    sortConfig={sortConfig}
                    onViewDetails={handleViewDetails}
                    onEditActivity={handleEditActivity}
                    onViewPhotos={handleViewPhotos}
                    onApproveActivity={handleApproveActivity}
                    onRejectActivity={handleRejectActivity}
                  />
                )}
              </div>
            </div>

            {/* Pagination */}
            {filteredActivities.length > 0 && (
              <TablePagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredActivities.length}
                itemsPerPage={itemsPerPage}
                onPageChange={setCurrentPage}
                onItemsPerPageChange={(newSize) => {
                  setItemsPerPage(newSize);
                  setCurrentPage(1);
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityManagement;