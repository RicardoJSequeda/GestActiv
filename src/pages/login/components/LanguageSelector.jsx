import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LanguageSelector = () => {
  const [currentLanguage, setCurrentLanguage] = useState('es');
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', name: 'Español', flag: '🇨🇴' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('spar_language') || 'es';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    localStorage.setItem('spar_language', languageCode);
    setIsOpen(false);
    
    // In a real app, this would trigger language change across the app
    // For now, we'll just show an alert for non-Spanish languages
    if (languageCode !== 'es') {
      alert('La traducción al inglés estará disponible próximamente');
    }
  };

  const currentLang = languages.find(lang => lang.code === currentLanguage);

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 bg-surface/90 backdrop-blur-sm border border-border rounded-lg text-sm font-body text-text-secondary hover:text-text-primary hover:bg-surface transition-hover"
        >
          <span className="text-base">{currentLang?.flag}</span>
          <span className="hidden sm:block">{currentLang?.name}</span>
          <Icon name="ChevronDown" size={14} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-popover border border-border rounded-lg shadow-lg overflow-hidden">
            {languages.map((language) => (
              <button
                key={language.code}
                onClick={() => handleLanguageChange(language.code)}
                className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-body transition-hover ${
                  currentLanguage === language.code
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }`}
              >
                <span className="text-base">{language.flag}</span>
                <span>{language.name}</span>
                {currentLanguage === language.code && (
                  <Icon name="Check" size={14} className="ml-auto" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;