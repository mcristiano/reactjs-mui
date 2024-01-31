import { PropsWithChildren, createContext, useCallback, useState } from 'react';

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
}

export const DrawerContext = createContext({} as IDrawerContextData);

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  return <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>{children}</DrawerContext.Provider>;
};
