import { useState, useEffect } from 'react';

export const usePremium = () => {
  const [isPremium, setIsPremium] = useState(false);
  const [premiumDate, setPremiumDate] = useState(null);

  useEffect(() => {
    // Verificar si el usuario tiene acceso premium
    const checkPremiumStatus = () => {
      const premium = localStorage.getItem('afinapp_premium');
      const premiumDate = localStorage.getItem('afinapp_premium_date');
      
      if (premium === 'true' && premiumDate) {
        setIsPremium(true);
        setPremiumDate(new Date(premiumDate));
      } else {
        setIsPremium(false);
        setPremiumDate(null);
      }
    };

    checkPremiumStatus();

    // Escuchar cambios en localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'afinapp_premium' || e.key === 'afinapp_premium_date') {
        checkPremiumStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getPremiumDays = () => {
    if (!premiumDate) return 0;
    const now = new Date();
    const diffTime = Math.abs(now - premiumDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getPremiumStatusText = () => {
    if (!isPremium) return 'Gratis';
    
    const days = getPremiumDays();
    if (days === 0) return 'Premium (Hoy)';
    if (days === 1) return 'Premium (1 día)';
    return `Premium (${days} días)`;
  };

  return {
    isPremium,
    premiumDate,
    getPremiumDays,
    getPremiumStatusText
  };
};
