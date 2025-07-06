// src/hooks/useIsLargeScreen.js
import { useState, useEffect } from 'react';

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(window.innerWidth >= 1051);

  useEffect(() => {
    const handleResize = () => {
      setIsLarge(window.innerWidth >= 1051);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isLarge;
}

export default useIsLargeScreen;
