import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';

export const AppRoutes = () => {
  const PAGE_INITIAL = '/pagina-inicial';

  //const { toggleTheme } = useAppThemeContext();
  const { toggleDrawerOpen } = useDrawerContext();

  return (
    <Routes>
      <Route
        path={PAGE_INITIAL}
        element={
          <Button variant='contained' color='primary' onClick={toggleDrawerOpen}>
            Toggle Theme
          </Button>
        }
      />

      <Route path='*' element={<Navigate to={PAGE_INITIAL} />} />
    </Routes>
  );
};
