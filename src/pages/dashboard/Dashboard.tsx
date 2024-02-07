import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem, FerramentasDeDetalhe } from '../../shared/components/';

export const Dashboard = () => (
  <LayoutBaseDePagina
    titulo='Titulo'
    //barraDeFerramentas={<FerramentasDaListagem mostrarInputDeBusca={true}

    barraDeFerramentas={
      <FerramentasDeDetalhe
        btnSalvar={{
          mostrarBotao: true,
          mostrarCarregando: false,
          aoClicar: () => {
            /* função de clique */
          },
        }}
        btnSalvarEFechar={{
          mostrarBotao: true,
          mostrarCarregando: false,
          aoClicar: () => {
            /* função de clique */
          },
        }}
        btnNovo={{
          textoBotao: 'Novo',
          mostrarBotao: true,
          mostrarCarregando: false,
          aoClicar: () => {
            /* função de clique */
          },
        }}
        btnVoltar={{
          mostrarBotao: true,
          mostrarCarregando: false,
          aoClicar: () => {
            /* função de clique */
          },
        }}
        btnApagar={{
          mostrarBotao: true,
          mostrarCarregando: false,
          aoClicar: () => {
            /* função de clique */
          },
        }}
      />
    }
  >
    {'Corpo do LayoutBaseDePagina no Dashboard  '}
  </LayoutBaseDePagina>
);
