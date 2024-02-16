import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard } from '../pages';
import { ListagemDePessoas, DetalheDePessoas, ListagemDeCidades, DetalheDeCidades } from '../pages';

export const AppRoutes = () => {
  const PAGE_INITIAL = '/pagina-inicial';

  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      { icon: 'home', path: '/pagina-inicial', label: 'Pagina Inicial' },
      { icon: 'people', path: '/pessoas', label: 'Pessoas' },
      { icon: 'location_city', path: '/cidades', label: 'Cidades' },
    ]);
    // }),
    //   []; /pqp
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path={PAGE_INITIAL} element={<Dashboard />} />
      <Route path='/pessoas' element={<ListagemDePessoas />} />
      <Route path='/pessoas/detalhe/:id' element={<DetalheDePessoas />} />

      <Route path='/cidades' element={<ListagemDeCidades />} />
      <Route path='/cidades/detalhe/:id' element={<DetalheDeCidades />} />

      <Route path='*' element={<Navigate to={PAGE_INITIAL} />} />
    </Routes>
  );
};
