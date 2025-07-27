import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const PhotoDocumentation = ({ 
  photos, 
  setPhotos, 
  errors 
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    imageFiles.forEach((file, index) => {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert(`El archivo ${file.name} es demasiado grande. Máximo 5MB por imagen.`);
        return;
      }

      const reader = new FileReader();
      const photoId = `photo-${Date.now()}-${index}`;
      
      // Simulate upload progress
      setUploadProgress(prev => ({ ...prev, [photoId]: 0 }));
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const currentProgress = prev[photoId] || 0;
          if (currentProgress >= 100) {
            clearInterval(progressInterval);
            return prev;
          }
          return { ...prev, [photoId]: currentProgress + 10 };
        });
      }, 100);

      reader.onload = (e) => {
        const newPhoto = {
          id: photoId,
          file: file,
          url: e.target.result,
          name: file.name,
          size: file.size,
          type: 'activity',
          timestamp: new Date(),
          location: null, // Would be populated with geolocation
          description: ''
        };

        setTimeout(() => {
          setPhotos(prev => [...prev, newPhoto]);
          setUploadProgress(prev => {
            const updated = { ...prev };
            delete updated[photoId];
            return updated;
          });
        }, 1000);
      };

      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (photoId) => {
    setPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  const updatePhotoDescription = (photoId, description) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, description } : photo
    ));
  };

  const updatePhotoType = (photoId, type) => {
    setPhotos(prev => prev.map(photo => 
      photo.id === photoId ? { ...photo, type } : photo
    ));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
          <Icon name="Camera" size={20} className="text-warning" />
        </div>
        <div>
          <h2 className="text-lg font-heading font-semibold text-text-primary">
            Documentación Fotográfica
          </h2>
          <p className="text-sm text-text-secondary font-body">
            Agregue evidencias fotográficas de la actividad realizada
          </p>
        </div>
      </div>

      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Icon name="Upload" size={24} className="text-text-secondary" />
          </div>
          
          <div>
            <p className="text-lg font-body font-medium text-text-primary mb-2">
              Arrastra las imágenes aquí o haz clic para seleccionar
            </p>
            <p className="text-sm text-text-secondary font-body">
              Formatos soportados: JPG, PNG, GIF. Máximo 5MB por imagen.
            </p>
          </div>
          
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            iconName="FolderOpen"
            iconPosition="left"
          >
            Seleccionar Archivos
          </Button>
        </div>
      </div>

      {errors.photos && (
        <p className="mt-2 text-sm text-error font-body">{errors.photos}</p>
      )}

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="mt-4 space-y-2">
          {Object.entries(uploadProgress).map(([photoId, progress]) => (
            <div key={photoId} className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-body text-text-primary">Subiendo imagen...</span>
                <span className="text-sm font-body text-text-secondary">{progress}%</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Gallery */}
      {photos.length > 0 && (
        <div className="mt-6">
          <h3 className="text-md font-body font-semibold text-text-primary mb-4">
            Imágenes Cargadas ({photos.length})
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={photo.url}
                    alt={photo.name}
                    className="w-full h-full object-cover"
                  />
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removePhoto(photo.id)}
                    iconName="Trash2"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                  />
                </div>
                
                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-body font-medium text-text-primary truncate">
                      {photo.name}
                    </span>
                    <span className="text-xs text-text-secondary font-body">
                      {formatFileSize(photo.size)}
                    </span>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-body font-medium text-text-primary mb-1">
                      Tipo de Imagen
                    </label>
                    <select
                      value={photo.type}
                      onChange={(e) => updatePhotoType(photo.id, e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary font-body"
                    >
                      <option value="activity">Actividad General</option>
                      <option value="before">Antes</option>
                      <option value="after">Después</option>
                      <option value="participants">Participantes</option>
                      <option value="materials">Materiales</option>
                      <option value="location">Ubicación</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-body font-medium text-text-primary mb-1">
                      Descripción
                    </label>
                    <textarea
                      value={photo.description}
                      onChange={(e) => updatePhotoDescription(photo.id, e.target.value)}
                      placeholder="Describe qué muestra esta imagen..."
                      rows={2}
                      className="w-full px-2 py-1 text-xs border border-border rounded focus:outline-none focus:ring-1 focus:ring-primary resize-none font-body"
                      maxLength={200}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-xs text-text-secondary font-body">
                    <Icon name="Clock" size={12} />
                    <span>{photo.timestamp.toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoDocumentation;