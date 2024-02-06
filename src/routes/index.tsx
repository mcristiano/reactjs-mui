import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';

export const AppRoutes = () => {
  const PAGE_INITIAL = '/pagina-inicial';

  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([{ icon: 'home', path: '/pagina-inicial', label: 'Pagina Inicial' }]);
  }),
    [];

  return (
    <Routes>
      <Route path={PAGE_INITIAL} element={<Dashboard />} />

      <Route path='*' element={<Navigate to={PAGE_INITIAL} />} />
    </Routes>
  );
};
