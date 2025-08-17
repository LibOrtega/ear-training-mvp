import { useState, useEffect } from 'react';

export function useMusician() {
  const [isMusician, setIsMusician] = useState(false);
  const [musicianDate, setMusicianDate] = useState(null);

  useEffect(() => {
    const checkMusicianAccess = () => {
      const musicianAccess = localStorage.getItem('afinapp_musician');
      const musicianDateAccess = localStorage.getItem('afinapp_musician_date');
      
      if (musicianAccess === 'true') {
        setIsMusician(true);
        setMusicianDate(musicianDateAccess);
      }
    };

    checkMusicianAccess();

    // Escuchar cambios en localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'afinapp_musician') {
        checkMusicianAccess();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getMusicianDays = () => {
    if (!musicianDate) return 0;
    const startDate = new Date(musicianDate);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getMusicianStatusText = () => {
    if (!isMusician) return 'No tienes acceso';
    const days = getMusicianDays();
    return `Miembro desde hace ${days} día${days !== 1 ? 's' : ''}`;
  };

  return {
    isMusician,
    musicianDate,
    getMusicianDays,
    getMusicianStatusText
  };
}
