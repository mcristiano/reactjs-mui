import { useContext } from 'react';
import { ThemeContext } from './ThemeContext';


export const useAppThemeContext = () => {
  return useContext(ThemeContext);
};

