import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const AddBeneficiaryModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    documentType: '',
    documentNumber: '',
    birthDate: '',
    phone: '',
    address: '',
    neighborhood: '',
    city: 'Bogotá',
    program: '',
    emergencyContact: '',
    emergencyPhone: '',
    photo: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const documentTypeOptions = [
    { value: 'CC', label: 'Cédula de Ciudadanía' },
    { value: 'TI', label: 'Tarjeta de Identidad' },
    { value: 'RC', label: 'Registro Civil' },
    { value: 'CE', label: 'Cédula de Extranjería' },
    { value: 'PP', label: 'Pasaporte' }
  ];

  const programOptions = [
    { value: 'Centro Vida', label: 'Centro Vida' },
    { value: 'ICBF', label: 'ICBF' },
    { value: 'Familias en Acción', label: 'Familias en Acción' },
    { value: 'Adulto Mayor', label: 'Adulto Mayor' }
  ];

  const cityOptions = [
    { value: 'Bogotá', label: 'Bogotá D.C.' },
    { value: 'Medellín', label: 'Medellín' },
    { value: 'Cali', label: 'Cali' },
    { value: 'Barranquilla', label: 'Barranquilla' },
    { value: 'Cartagena', label: 'Cartagena' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

    if (!formData.documentType) {
      newErrors.documentType = 'Selecciona el tipo de documento';
    }

    if (!formData.documentNumber.trim()) {
      newErrors.documentNumber = 'El número de documento es obligatorio';
    } else if (formData.documentType === 'CC' && !/^\d{8,10}$/.test(formData.documentNumber)) {
      newErrors.documentNumber = 'Número de cédula inválido (8-10 dígitos)';
    }

    if (!formData.birthDate) {
      newErrors.birthDate = 'La fecha de nacimiento es obligatoria';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es obligatorio';
    } else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Formato de teléfono inválido';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'La dirección es obligatoria';
    }

    if (!formData.program) {
      newErrors.program = 'Selecciona un programa';
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = 'El contacto de emergencia es obligatorio';
    }

    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'El teléfono de emergencia es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newBeneficiary = {
        id: Date.now(),
        ...formData,
        status: 'Activo',
        enrollmentDate: new Date().toLocaleDateString('es-CO'),
        lastActivity: 'Sin actividades',
        location: `${formData.neighborhood}, ${formData.city}`,
        photo: formData.photo || `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`,
        attendanceStats: {
          present: 0,
          absent: 0,
          percentage: 0
        },
        activities: [],
        familyMembers: [],
        attendanceRecord: []
      };
      
      onSave(newBeneficiary);
      onClose();
      
      // Reset form
      setFormData({
        name: '',
        documentType: '',
        documentNumber: '',
        birthDate: '',
        phone: '',
        address: '',
        neighborhood: '',
        city: 'Bogotá',
        program: '',
        emergencyContact: '',
        emergencyPhone: '',
        photo: null
      });
      
    } catch (error) {
      console.error('Error saving beneficiary:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          photo: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-heading font-semibold text-text-primary">
            Nuevo Beneficiario
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            iconName="X"
            className="h-8 w-8 p-0"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Photo Upload */}
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center overflow-hidden">
                {formData.photo ? (
                  <img
                    src={formData.photo}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Icon name="User" size={32} className="text-text-secondary" />
                )}
              </div>
              <div>
                <label className="block">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    iconName="Camera"
                    onClick={(e) => e.preventDefault() || e.target.previousElementSibling.click()}
                  >
                    Subir Foto
                  </Button>
                </label>
                <p className="text-xs text-text-secondary mt-1">
                  Opcional. Formatos: JPG, PNG (máx. 2MB)
                </p>
              </div>
            </div>

            {/* Personal Information */}
            <div>
              <h3 className="font-body font-semibold text-text-primary mb-4">
                Información Personal
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre Completo"
                  type="text"
                  placeholder="Ingresa el nombre completo"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  error={errors.name}
                  required
                />

                <Select
                  label="Tipo de Documento"
                  options={documentTypeOptions}
                  value={formData.documentType}
                  onChange={(value) => handleInputChange('documentType', value)}
                  error={errors.documentType}
                  required
                />

                <Input
                  label="Número de Documento"
                  type="text"
                  placeholder="Número sin puntos ni espacios"
                  value={formData.documentNumber}
                  onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                  error={errors.documentNumber}
                  required
                />

                <Input
                  label="Fecha de Nacimiento"
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  error={errors.birthDate}
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-body font-semibold text-text-primary mb-4">
                Información de Contacto
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Teléfono"
                  type="tel"
                  placeholder="Ej: 300 123 4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  error={errors.phone}
                  required
                />

                <Input
                  label="Barrio"
                  type="text"
                  placeholder="Nombre del barrio"
                  value={formData.neighborhood}
                  onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                />

                <div className="md:col-span-2">
                  <Input
                    label="Dirección"
                    type="text"
                    placeholder="Dirección completa"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    error={errors.address}
                    required
                  />
                </div>

                <Select
                  label="Ciudad"
                  options={cityOptions}
                  value={formData.city}
                  onChange={(value) => handleInputChange('city', value)}
                />
              </div>
            </div>

            {/* Program Information */}
            <div>
              <h3 className="font-body font-semibold text-text-primary mb-4">
                Información del Programa
              </h3>
              <Select
                label="Programa"
                options={programOptions}
                value={formData.program}
                onChange={(value) => handleInputChange('program', value)}
                error={errors.program}
                required
              />
            </div>

            {/* Emergency Contact */}
            <div>
              <h3 className="font-body font-semibold text-text-primary mb-4">
                Contacto de Emergencia
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Nombre del Contacto"
                  type="text"
                  placeholder="Nombre completo"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                  error={errors.emergencyContact}
                  required
                />

                <Input
                  label="Teléfono de Emergencia"
                  type="tel"
                  placeholder="Ej: 300 123 4567"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                  error={errors.emergencyPhone}
                  required
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={isSubmitting}
            iconName="Save"
            iconPosition="left"
          >
            {isSubmitting ? 'Guardando...' : 'Guardar Beneficiario'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBeneficiaryModal;