import { Routes, Route, Navigate } from 'react-router-dom';
import { useDrawerContext } from '../shared/contexts';
import { useEffect } from 'react';
import { Dashboard } from '../pages';
import { ListagemDePessoas } from '../pages';
import { DetalheDePessoas } from '../pages/pessoas/DetalheDePessoas';

export const AppRoutes = () => {
  const PAGE_INITIAL = '/pagina-inicial';

  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: 'home', path: '/pagina-inicial', label: 'Pagina Inicial' },
      { icon: 'people', path: '/pessoas', label: 'Pessoas' },
    ]);
  }),
    [];

  return (
    <Routes>
      <Route path={PAGE_INITIAL} element={<Dashboard />} />
      <Route path='/pessoas' element={<ListagemDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />

      <Route path='*' element={<Navigate to={PAGE_INITIAL} />} />
    </Routes>
  );
};
