import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppThemeContext } from '../shared/contexts';

export const AppRoutes = () => {
  const PAGE_INITIAL = '/pagina-inicial';

  const { toggleTheme } = useAppThemeContext();

  return (
    <Routes>
      <Route
        path={PAGE_INITIAL}
        element={
          <Button variant='contained' color='primary' onClick={toggleTheme}>
            Teste
          </Button>
        }
      />

      <Route path='*' element={<Navigate to={PAGE_INITIAL} />} />
    </Routes>
  );
};
