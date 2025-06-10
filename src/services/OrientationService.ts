import Orientation from 'react-native-orientation-locker';

class OrientationService {
  initialize() {
    // Initial lock to portrait
    try {
      Orientation.lockToPortrait();
    } catch (error) {
      console.warn('Failed to lock orientation:', error);
    }
  }

  lockToPortrait() {
    try {
      Orientation.lockToPortrait();
    } catch (error) {
      console.warn('Failed to lock to portrait:', error);
    }
  }

  unlockAllOrientations() {
    try {
      Orientation.unlockAllOrientations();
    } catch (error) {
      console.warn('Failed to unlock orientations:', error);
    }
  }
}

export const orientationService = new OrientationService();
