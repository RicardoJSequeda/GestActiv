import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusNotificationBar from '../../components/ui/StatusNotificationBar';
import BeneficiaryCard from './components/BeneficiaryCard';
import BeneficiaryProfile from './components/BeneficiaryProfile';
import BeneficiarySearch from './components/BeneficiarySearch';
import AddBeneficiaryModal from './components/AddBeneficiaryModal';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const BeneficiaryManagement = () => {
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [filteredBeneficiaries, setFilteredBeneficiaries] = useState([]);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for beneficiaries
  const mockBeneficiaries = [
    {
      id: 1,
      name: "María Elena Rodríguez",
      documentType: "CC",
      documentNumber: "52.123.456",
      birthDate: "15/03/1945",
      age: 79,
      phone: "301 234 5678",
      address: "Calle 45 #12-34",
      neighborhood: "La Candelaria",
      city: "Bogotá",
      program: "Centro Vida",
      status: "Activo",
      enrollmentDate: "15/01/2023",
      lastActivity: "25/01/2025",
      location: "La Candelaria, Bogotá",
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
      attendanceStats: {
        present: 45,
        absent: 5,
        percentage: 90
      },
      activities: [
        {
          title: "Taller de Manualidades",
          type: "Recreativa",
          date: "25/01/2025",
          attendance: "Asistió",
          description: "Participación activa en la elaboración de tejidos y bordados tradicionales.",
          photos: [
            "https://images.pexels.com/photos/6195125/pexels-photo-6195125.jpeg?w=400&h=400&fit=crop",
            "https://images.pexels.com/photos/6195126/pexels-photo-6195126.jpeg?w=400&h=400&fit=crop"
          ]
        },
        {
          title: "Control Médico",
          type: "Salud",
          date: "20/01/2025",
          attendance: "Asistió",
          description: "Revisión médica general y control de medicamentos.",
          photos: []
        }
      ],
      familyMembers: [
        {
          name: "Carlos Rodríguez",
          relationship: "Hijo",
          age: 52,
          occupation: "Comerciante",
          document: "CC 80.123.456",
          phone: "310 123 4567",
          photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
        }
      ],
      attendanceRecord: [
        { activity: "Taller de Manualidades", date: "25/01/2025", status: "Presente" },
        { activity: "Control Médico", date: "20/01/2025", status: "Presente" },
        { activity: "Actividad Física", date: "18/01/2025", status: "Ausente" }
      ]
    },
    {
      id: 2,
      name: "Carlos Andrés Martínez",
      documentType: "TI",
      documentNumber: "1.098.765.432",
      birthDate: "22/08/2010",
      age: 14,
      phone: "302 345 6789",
      address: "Carrera 15 #23-45",
      neighborhood: "Ciudad Bolívar",
      city: "Bogotá",
      program: "ICBF",
      status: "Activo",
      enrollmentDate: "10/02/2023",
      lastActivity: "24/01/2025",
      location: "Ciudad Bolívar, Bogotá",
      photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      attendanceStats: {
        present: 38,
        absent: 12,
        percentage: 76
      },
      activities: [
        {
          title: "Apoyo Escolar",
          type: "Educativa",
          date: "24/01/2025",
          attendance: "Asistió",
          description: "Refuerzo en matemáticas y comprensión lectora.",
          photos: [
            "https://images.pixabay.com/photo/2016/11/29/06/15/student-1867758_1280.jpg?w=400&h=400&fit=crop"
          ]
        }
      ],
      familyMembers: [
        {
          name: "Ana Martínez",
          relationship: "Madre",
          age: 35,
          occupation: "Empleada doméstica",
          document: "CC 52.987.654",
          phone: "315 987 6543",
          photo: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face"
        }
      ],
      attendanceRecord: [
        { activity: "Apoyo Escolar", date: "24/01/2025", status: "Presente" },
        { activity: "Taller de Arte", date: "22/01/2025", status: "Presente" }
      ]
    },
    {
      id: 3,
      name: "Luz Marina Gómez",
      documentType: "CC",
      documentNumber: "41.234.567",
      birthDate: "05/11/1978",
      age: 46,
      phone: "304 456 7890",
      address: "Transversal 8 #45-67",
      neighborhood: "Suba",
      city: "Bogotá",
      program: "Familias en Acción",
      status: "Activo",
      enrollmentDate: "20/03/2023",
      lastActivity: "23/01/2025",
      location: "Suba, Bogotá",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      attendanceStats: {
        present: 42,
        absent: 8,
        percentage: 84
      },
      activities: [
        {
          title: "Capacitación Laboral",
          type: "Formativa",
          date: "23/01/2025",
          attendance: "Asistió",
          description: "Taller de emprendimiento y desarrollo de habilidades comerciales.",
          photos: []
        }
      ],
      familyMembers: [
        {
          name: "Sofía Gómez",
          relationship: "Hija",
          age: 16,
          occupation: "Estudiante",
          document: "TI 1.234.567.890",
          phone: "320 456 7890",
          photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face"
        }
      ],
      attendanceRecord: [
        { activity: "Capacitación Laboral", date: "23/01/2025", status: "Presente" },
        { activity: "Reunión de Padres", date: "20/01/2025", status: "Presente" }
      ]
    },
    {
      id: 4,
      name: "José Antonio Herrera",
      documentType: "CC",
      documentNumber: "79.876.543",
      birthDate: "12/07/1952",
      age: 72,
      phone: "305 567 8901",
      address: "Calle 72 #34-56",
      neighborhood: "Chapinero",
      city: "Bogotá",
      program: "Adulto Mayor",
      status: "Inactivo",
      enrollmentDate: "08/05/2023",
      lastActivity: "15/01/2025",
      location: "Chapinero, Bogotá",
      photo: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      attendanceStats: {
        present: 25,
        absent: 15,
        percentage: 63
      },
      activities: [
        {
          title: "Actividad Física",
          type: "Salud",
          date: "15/01/2025",
          attendance: "Asistió",
          description: "Ejercicios de bajo impacto y fisioterapia grupal.",
          photos: []
        }
      ],
      familyMembers: [],
      attendanceRecord: [
        { activity: "Actividad Física", date: "15/01/2025", status: "Presente" },
        { activity: "Control Médico", date: "10/01/2025", status: "Ausente" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setBeneficiaries(mockBeneficiaries);
      setFilteredBeneficiaries(mockBeneficiaries);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredBeneficiaries(beneficiaries);
      return;
    }

    let filtered = beneficiaries.filter(beneficiary =>
      beneficiary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.documentNumber.includes(searchTerm) ||
      beneficiary.neighborhood.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beneficiary.city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredBeneficiaries(filtered);
  };

  const handleFilter = (filters) => {
    let filtered = beneficiaries;

    if (filters.program) {
      filtered = filtered.filter(beneficiary => beneficiary.program === filters.program);
    }

    if (filters.status) {
      filtered = filtered.filter(beneficiary => beneficiary.status === filters.status);
    }

    setFilteredBeneficiaries(filtered);
  };

  const handleAddBeneficiary = () => {
    setIsAddModalOpen(true);
  };

  const handleSaveBeneficiary = (newBeneficiary) => {
    setBeneficiaries(prev => [newBeneficiary, ...prev]);
    setFilteredBeneficiaries(prev => [newBeneficiary, ...prev]);
  };

  const handleSelectBeneficiary = (beneficiary) => {
    setSelectedBeneficiary(beneficiary);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Icon name="Loader2" size={32} className="mx-auto text-primary animate-spin mb-4" />
                <p className="text-text-secondary">Cargando beneficiarios...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          <StatusNotificationBar />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Gestión de Beneficiarios
                </h1>
                <p className="text-text-secondary mt-1">
                  Administra los perfiles y el historial de participación de los beneficiarios
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Total Beneficiarios</div>
                  <div className="text-xl font-bold text-text-primary">{beneficiaries.length}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-text-secondary">Activos</div>
                  <div className="text-xl font-bold text-success">
                    {beneficiaries.filter(b => b.status === 'Activo').length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Search Component */}
          <BeneficiarySearch
            onSearch={handleSearch}
            onFilter={handleFilter}
            onAddNew={handleAddBeneficiary}
          />

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Beneficiaries List */}
            <div className="lg:col-span-4">
              <div className="bg-card border border-border rounded-lg">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="font-body font-semibold text-text-primary">
                      Lista de Beneficiarios
                    </h3>
                    <span className="text-sm text-text-secondary">
                      {filteredBeneficiaries.length} resultados
                    </span>
                  </div>
                </div>
                
                <div className="max-h-[600px] overflow-y-auto">
                  {filteredBeneficiaries.length > 0 ? (
                    <div className="p-4 space-y-3">
                      {filteredBeneficiaries.map((beneficiary) => (
                        <BeneficiaryCard
                          key={beneficiary.id}
                          beneficiary={beneficiary}
                          isSelected={selectedBeneficiary?.id === beneficiary.id}
                          onClick={() => handleSelectBeneficiary(beneficiary)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Icon name="Search" size={32} className="mx-auto text-text-secondary mb-4" />
                      <h4 className="font-body font-medium text-text-primary mb-2">
                        No se encontraron beneficiarios
                      </h4>
                      <p className="text-text-secondary text-sm mb-4">
                        Intenta ajustar los filtros de búsqueda
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          handleSearch('');
                          handleFilter({ program: '', status: '' });
                        }}
                      >
                        Limpiar Filtros
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Beneficiary Profile */}
            <div className="lg:col-span-8">
              <BeneficiaryProfile beneficiary={selectedBeneficiary} />
            </div>
          </div>
        </div>
      </main>

      {/* Add Beneficiary Modal */}
      <AddBeneficiaryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveBeneficiary}
      />
    </div>
  );
};

export default BeneficiaryManagement;