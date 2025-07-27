import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import LanguageSelector from './components/LanguageSelector';
import CredentialsHelper from './components/CredentialsHelper';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const user = localStorage.getItem('spar_user');
    if (user) {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 relative">
      {/* Language Selector */}
      <LanguageSelector />

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-secondary rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-surface border border-border rounded-2xl shadow-lg p-8">
          {/* Header */}
          <LoginHeader />

          {/* Login Form */}
          <LoginForm />

          {/* Credentials Helper */}
          <CredentialsHelper />

          {/* Trust Signals */}
          <TrustSignals />
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-text-secondary font-caption">
            © {new Date().getFullYear()} Gobierno de Colombia. Todos los derechos reservados.
          </p>
          <p className="text-xs text-text-secondary font-caption mt-1">
            Sistema de Programas de Actividades y Registro v2.1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;