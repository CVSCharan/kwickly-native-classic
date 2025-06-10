import {useEffect} from 'react';
import {orientationService} from '../services/OrientationService';

export const useOrientationLock = () => {
  useEffect(() => {
    // Lock to portrait on mount
    orientationService.lockToPortrait();

    return () => {
      // Optionally unlock when component unmounts
      // orientationService.unlockAllOrientations();
    };
  }, []);
};
