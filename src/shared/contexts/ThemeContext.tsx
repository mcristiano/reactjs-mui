import { Context, PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';
import { DarkTheme, LightTheme } from '../themes';
import { Box, Theme, ThemeProvider } from '@mui/material';
import { useAppThemeContext2 } from './useAppThemeContext';

interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext({} as IThemeContextData);

export const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

  const toggleTheme = useCallback(() => {
    setThemeName((oldThemeName) => (oldThemeName === 'light' ? 'dark' : 'light'));
  }, []);

  const theme: Theme = useMemo(() => {
    return themeName === 'light' ? LightTheme : DarkTheme;
  }, [themeName]);

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
          {children}
        </Box>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
