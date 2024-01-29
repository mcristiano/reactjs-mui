import { Button } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';

export const AppRoutes = () => {
  const PAGE_INITIAL = '/pagina-inicial';

  return (
    <Routes>
      <Route path={PAGE_INITIAL} element={<Button>Teste</Button>} />

      <Route path="*" element={<Navigate to={PAGE_INITIAL} />} />
    </Routes>
  );
};
