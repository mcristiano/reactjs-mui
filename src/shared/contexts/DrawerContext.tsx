import { PropsWithChildren, createContext, useCallback, useState } from 'react';

interface IDrawerOption {
  label: string;
  icon: string;
  path: string;
}

interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

export const DrawerContext = createContext({} as IDrawerContextData);

export const DrawerProvider = ({ children }: PropsWithChildren) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen((oldDrawerOpen) => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  //  return <DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>{children}</DrawerContext.Provider>;
  return (
    <DrawerContext.Provider
      value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}
    >
      {children}
    </DrawerContext.Provider>
  );
};
