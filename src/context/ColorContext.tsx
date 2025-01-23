"use client"

import React, { 
  createContext, 
  useContext, 
  useState, 
  useCallback, 
  useMemo 
} from 'react';

// Utility functions with TypeScript typing
const hexToRgb = (hex: string): [number, number, number] => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
};

const getLuminance = (r: number, g: number, b: number): number => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

const calculateContrast = (color1: string, color2: string): number => {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);

  const l1 = getLuminance(r1, g1, b1);
  const l2 = getLuminance(r2, g2, b2);

  const contrast = l1 > l2 
    ? (l1 + 0.05) / (l2 + 0.05) 
    : (l2 + 0.05) / (l1 + 0.05);

  return parseFloat(contrast.toFixed(2));
};

// Typed interface for context
interface ColorContextType {
  textColor: string;
  bgColor: string;
  updateTextColor: (color: string) => void;
  updateBgColor: (color: string) => void;
  swapColors: () => void;
  getRandomColors: () => void;
  getContrastRatio: () => number;
  getWCAGCompliance: () => 'AAA' | 'AA' | 'Fail';
}

// Create context with explicit typing
const ColorContext = createContext<ColorContextType | undefined>(undefined);

// Random color generation with controlled luminance
const getColorWithLuminance = (targetLuminance: number): string => {
  let color: string, luminance: number;
  do {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    color = "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
    luminance = getLuminance(r, g, b);
  } while (Math.abs(luminance - targetLuminance) > 0.1);

  return color;
};

// Provider component
export const ColorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [textColor, setTextColor] = useState("#42456d");
  const [bgColor, setBgColor] = useState("#e6f2fc");

  const updateTextColor = useCallback((color: string) => {
    setTextColor(color);
  }, []);

  const updateBgColor = useCallback((color: string) => {
    setBgColor(color);
  }, []);

  const swapColors = useCallback(() => {
    setTextColor(() => bgColor);
    setBgColor(() => textColor);
  }, [textColor, bgColor]);

  const getRandomColors = useCallback(() => {
    const newTextColor = getColorWithLuminance(0.1);
    const newBgColor = getColorWithLuminance(0.9);

    setTextColor(newTextColor);
    setBgColor(newBgColor);
  }, []);

  const getContrastRatio = useCallback(() => {
    return calculateContrast(textColor, bgColor);
  }, [textColor, bgColor]);

  const getWCAGCompliance = useCallback((): 'AAA' | 'AA' | 'Fail' => {
    const ratio = getContrastRatio();
    if (ratio >= 7) return "AAA";
    if (ratio >= 4.5) return "AA";
    return "Fail";
  }, [getContrastRatio]);

  // Memoize context value to optimize performance
  const value = useMemo(() => ({
    textColor,
    bgColor,
    updateTextColor,
    updateBgColor,
    swapColors,
    getRandomColors,
    getContrastRatio,
    getWCAGCompliance
  }), [
    textColor, 
    bgColor, 
    updateTextColor, 
    updateBgColor, 
    swapColors, 
    getRandomColors, 
    getContrastRatio, 
    getWCAGCompliance
  ]);

  return (
    <ColorContext.Provider value={value}>
      {children}
    </ColorContext.Provider>
  );
};

// Custom hook with error handling
export const useColors = () => {
  const context = useContext(ColorContext);
  
  if (context === undefined) {
    throw new Error('useColors must be used within a ColorProvider');
  }
  
  return context;
};