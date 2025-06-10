import {useEffect} from 'react';
import {Platform} from 'react-native';
import Orientation from 'react-native-orientation-locker';

export const useOrientationLock = () => {
  useEffect(() => {
    // Lock to portrait on mount
    Orientation.lockToPortrait();

    return () => {
      // Unlock when component unmounts (optional, depending on your app's needs)
      // Orientation.unlockAllOrientations();
    };
  }, []);
};
