import { useContext } from "react";
import { DrawerContext } from "."; './DrawerContext';

export const useDrawerContext = () => {
    return useContext(DrawerContext);
};