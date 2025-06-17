import { Dimensions } from 'react-native';

// Get screen dimensions
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Define breakpoints for different screen sizes
const BREAKPOINTS = {
  SMALL: 375,
  MEDIUM: 768,
  LARGE: 1024,
  XLARGE: 1440
};

// Calculate responsive sizes based on screen width
const getResponsiveValue = (small, medium, large, xlarge) => {
  if (SCREEN_WIDTH < BREAKPOINTS.SMALL) return small;
  if (SCREEN_WIDTH < BREAKPOINTS.MEDIUM) return medium;
  if (SCREEN_WIDTH < BREAKPOINTS.LARGE) return large;
  return xlarge;
};

export const DIMENSIONS = {
  // Screen dimensions
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  
  // Wheel dimensions
  WHEEL: {
    SIZE: getResponsiveValue(
      Math.min(SCREEN_WIDTH * 0.75, 280),
      Math.min(SCREEN_WIDTH * 0.6, 400),
      Math.min(SCREEN_WIDTH * 0.4, 500),
      Math.min(SCREEN_WIDTH * 0.3, 600)
    ),
    get CENTER() { return this.SIZE / 2; },
  },
  
  // Spacing values - scale with screen size
  SPACING: {
    XS: getResponsiveValue(4, 6, 8, 10),
    SM: getResponsiveValue(8, 12, 16, 20),
    MD: getResponsiveValue(16, 20, 24, 32),
    LG: getResponsiveValue(24, 32, 40, 48),
    XL: getResponsiveValue(32, 40, 48, 64),
    XXL: getResponsiveValue(48, 64, 80, 96),
  },
  
  // Border radius values - scale with screen size
  RADIUS: {
    SM: getResponsiveValue(8, 10, 12, 14),
    MD: getResponsiveValue(12, 14, 16, 18),
    LG: getResponsiveValue(16, 18, 20, 24),
    XL: getResponsiveValue(20, 24, 28, 32),
    XXL: getResponsiveValue(25, 30, 35, 40),
    CIRCLE: 999,
  },
  
  // Font sizes - scale with screen size
  FONT_SIZE: {
    XS: getResponsiveValue(10, 12, 14, 16),
    SM: getResponsiveValue(12, 14, 16, 18),
    MD: getResponsiveValue(14, 16, 18, 20),
    LG: getResponsiveValue(16, 18, 20, 22),
    XL: getResponsiveValue(18, 20, 22, 24),
    XXL: getResponsiveValue(20, 22, 24, 26),
    XXXL: getResponsiveValue(24, 26, 28, 30),
    TITLE: getResponsiveValue(28, 32, 36, 40),
    LARGE_TITLE: getResponsiveValue(32, 36, 40, 44),
    HERO: getResponsiveValue(36, 40, 44, 48),
  },
  
  // Container widths - scale with screen size
  CONTAINER: {
    MAX_WIDTH: getResponsiveValue(
      Math.min(SCREEN_WIDTH * 0.9, 400),
      Math.min(SCREEN_WIDTH * 0.8, 500),
      Math.min(SCREEN_WIDTH * 0.7, 600),
      Math.min(SCREEN_WIDTH * 0.6, 700)
    ),
    PADDING: getResponsiveValue(20, 24, 32, 40),
  },

  // Button dimensions
  BUTTON: {
    WIDTH: getResponsiveValue(
      Math.min(SCREEN_WIDTH * 0.85, 300),
      Math.min(SCREEN_WIDTH * 0.7, 350),
      Math.min(SCREEN_WIDTH * 0.5, 400),
      Math.min(SCREEN_WIDTH * 0.4, 450)
    ),
    HEIGHT: getResponsiveValue(50, 55, 60, 65),
    PADDING: getResponsiveValue(15, 20, 25, 30),
  }
};

// Responsive helper functions
export const isSmallScreen = () => SCREEN_WIDTH < BREAKPOINTS.SMALL;
export const isMediumScreen = () => SCREEN_WIDTH >= BREAKPOINTS.SMALL && SCREEN_WIDTH < BREAKPOINTS.MEDIUM;
export const isLargeScreen = () => SCREEN_WIDTH >= BREAKPOINTS.MEDIUM && SCREEN_WIDTH < BREAKPOINTS.LARGE;
export const isXLargeScreen = () => SCREEN_WIDTH >= BREAKPOINTS.LARGE;

// Enhanced responsive size helper
export const getResponsiveSize = (small, medium, large, xlarge) => {
  return getResponsiveValue(small, medium, large, xlarge);
}; 