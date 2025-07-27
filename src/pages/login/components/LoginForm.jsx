import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Mock credentials for different user roles
  const mockCredentials = {
    'admin@spar.gov.co': { password: 'admin123', role: 'administrator', name: 'María González' },
    'coordinador@spar.gov.co': { password: 'coord123', role: 'coordinator', name: 'Carlos Rodríguez' },
    'trabajador@spar.gov.co': { password: 'field123', role: 'field_worker', name: 'Ana López' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ingrese un correo electrónico válido';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es obligatoria';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      const user = mockCredentials[formData.email];
      
      if (!user || user.password !== formData.password) {
        setErrors({
          general: 'Credenciales incorrectas. Verifique su correo y contraseña.'
        });
        return;
      }

      // Store user session
      localStorage.setItem('spar_user', JSON.stringify({
        email: formData.email,
        role: user.role,
        name: user.name,
        loginTime: new Date().toISOString()
      }));

      // Redirect to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      setErrors({
        general: 'Error de conexión. Intente nuevamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // In a real app, this would navigate to password recovery
    alert('Funcionalidad de recuperación de contraseña próximamente disponible');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Input */}
        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="usuario@spar.gov.co"
          error={errors.email}
          required
          disabled={isLoading}
          className="w-full"
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Ingrese su contraseña"
            error={errors.password}
            required
            disabled={isLoading}
            className="w-full pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-text-secondary hover:text-text-primary transition-hover"
            disabled={isLoading}
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={20} />
          </button>
        </div>

        {/* General Error */}
        {errors.general && (
          <div className="flex items-center space-x-2 p-3 bg-error/10 border border-error/20 rounded-md">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error font-medium">{errors.general}</span>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          loading={isLoading}
          disabled={isLoading}
          fullWidth
          className="mt-8"
        >
          {isLoading ? 'Iniciando Sesión...' : 'Iniciar Sesión'}
        </Button>

        {/* Forgot Password Link */}
        <div className="text-center">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:text-primary/80 font-medium transition-hover"
            disabled={isLoading}
          >
            ¿Olvidó su contraseña?
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;