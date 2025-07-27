import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import StatusNotificationBar from '../../components/ui/StatusNotificationBar';
import ActivityHeader from './components/ActivityHeader';
import ActivityDetails from './components/ActivityDetails';
import PhotoDocumentation from './components/PhotoDocumentation';
import ActivityTemplates from './components/ActivityTemplates';
import FormActions from './components/FormActions';
import OfflineIndicator from './components/OfflineIndicator';
import Icon from '../../components/AppIcon';

const ActivityRegistration = () => {
  const navigate = useNavigate();
  
  // Form state
  const [activityDate, setActivityDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [activityTitle, setActivityTitle] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [selectedBeneficiaries, setSelectedBeneficiaries] = useState([]);
  const [participantCount, setParticipantCount] = useState('');
  const [photos, setPhotos] = useState([]);
  
  // Form control state
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [showTemplates, setShowTemplates] = useState(true);

  // Auto-save functionality
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (hasUnsavedChanges) {
        handleAutoSave();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveInterval);
  }, [hasUnsavedChanges]);

  // Track changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [activityDate, selectedProgram, selectedCategory, activityTitle, activityDescription, selectedBeneficiaries, participantCount, photos]);

  const handleAutoSave = () => {
    if (activityTitle || activityDescription) {
      // Simulate auto-save
      setTimeout(() => {
        setLastSaved(new Date());
        setHasUnsavedChanges(false);
      }, 1000);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!activityDate) {
      newErrors.activityDate = 'La fecha de la actividad es obligatoria';
    }

    if (!selectedProgram) {
      newErrors.selectedProgram = 'Debe seleccionar un programa social';
    }

    if (!selectedCategory) {
      newErrors.selectedCategory = 'Debe seleccionar una categoría de actividad';
    }

    if (!activityTitle.trim()) {
      newErrors.activityTitle = 'El título de la actividad es obligatorio';
    }

    if (!activityDescription.trim()) {
      newErrors.activityDescription = 'La descripción de la actividad es obligatoria';
    } else if (activityDescription.trim().length < 50) {
      newErrors.activityDescription = 'La descripción debe tener al menos 50 caracteres';
    }

    if (selectedBeneficiaries.length === 0) {
      newErrors.selectedBeneficiaries = 'Debe seleccionar al menos un beneficiario';
    }

    if (!participantCount || parseInt(participantCount) < 1) {
      newErrors.participantCount = 'Debe indicar el número de participantes';
    } else if (parseInt(participantCount) < selectedBeneficiaries.length) {
      newErrors.participantCount = 'El número total no puede ser menor a los beneficiarios seleccionados';
    }

    if (photos.length === 0) {
      newErrors.photos = 'Debe agregar al menos una imagen como evidencia';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleTemplateSelect = (template) => {
    if (template) {
      setActivityTitle(template.name);
      setActivityDescription(template.description);
      setSelectedProgram(template.program.toLowerCase().replace(' ', '-'));
      setSelectedCategory(template.category);
      setParticipantCount(template.suggestedParticipants.split('-')[1] || '');
      setShowTemplates(false);
    } else {
      // Clear template selection
      setShowTemplates(true);
    }
  };

  const handleSaveDraft = async () => {
    setIsLoading('draft');
    
    // Simulate API call
    setTimeout(() => {
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setIsLoading(false);
      
      // Show success notification
      alert('Borrador guardado exitosamente');
    }, 1500);
  };

  const handleSubmitForApproval = async () => {
    if (!validateForm()) {
      alert('Por favor corrija los errores en el formulario antes de enviar');
      return;
    }

    setIsLoading('approval');
    
    // Simulate API call
    setTimeout(() => {
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setIsLoading(false);
      
      alert('Actividad enviada para aprobación exitosamente');
      navigate('/activity-management');
    }, 2000);
  };

  const handleComplete = async () => {
    if (!validateForm()) {
      alert('Por favor corrija los errores en el formulario antes de completar');
      return;
    }

    setIsLoading('complete');
    
    // Simulate API call
    setTimeout(() => {
      setLastSaved(new Date());
      setHasUnsavedChanges(false);
      setIsLoading(false);
      
      alert('Actividad marcada como completada exitosamente');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="PlusCircle" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-heading font-bold text-text-primary">
                  Registro de Actividades
                </h1>
                <p className="text-text-secondary font-body">
                  Documente las actividades realizadas en los programas sociales
                </p>
              </div>
            </div>
            
            <StatusNotificationBar />
          </div>

          <div className="mb-6">
            <OfflineIndicator />
          </div>

          <div className="space-y-6">
            {showTemplates && (
              <ActivityTemplates onTemplateSelect={handleTemplateSelect} />
            )}

            <ActivityHeader
              activityDate={activityDate}
              setActivityDate={setActivityDate}
              selectedProgram={selectedProgram}
              setSelectedProgram={setSelectedProgram}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              errors={errors}
            />

            <ActivityDetails
              activityTitle={activityTitle}
              setActivityTitle={setActivityTitle}
              activityDescription={activityDescription}
              setActivityDescription={setActivityDescription}
              selectedBeneficiaries={selectedBeneficiaries}
              setSelectedBeneficiaries={setSelectedBeneficiaries}
              participantCount={participantCount}
              setParticipantCount={setParticipantCount}
              errors={errors}
            />

            <PhotoDocumentation
              photos={photos}
              setPhotos={setPhotos}
              errors={errors}
            />

            <FormActions
              onSaveDraft={handleSaveDraft}
              onSubmitForApproval={handleSubmitForApproval}
              onComplete={handleComplete}
              isLoading={isLoading}
              hasUnsavedChanges={hasUnsavedChanges}
              lastSaved={lastSaved}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ActivityRegistration;