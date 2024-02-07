import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-Detalhe/FerramentasDeDetalhe';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useEffect, useState } from 'react';
import { LinearProgress } from '@mui/material';

export const DetalheDePessoas = () => {
  const { id = '0' } = useParams<'id'>();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');

  useEffect(() => {
    if (id !== '0') {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setNome(result.data.nomeCompleto);
          setIsLoading(false);

          console.log(result);
        }
      });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    console.log('delete', id);
  };

  const handleSave = (id: number) => {
    console.log('save', id);
  };

  return (
    <LayoutBaseDePagina
      titulo={id === '0' ? 'Nova pessoa' : nome || 'Editando pessoa'}
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
            aoClicar: () => handleSave(Number(id)),
          }}
          btnApagar={{
            mostrarBotao: id !== '0',
            mostrarCarregando: false,
            aoClicar: () => handleDelete(Number(id)),
          }}
          btnNovo={{
            textoBotao: 'Novo',
            mostrarBotao: id !== '0',
            mostrarCarregando: false,
            aoClicar: () => {
              navigate('/pessoas/detalhe/0');
            },
          }}
          btnVoltar={{
            mostrarBotao: true,
            mostrarCarregando: false,
            aoClicar: () => {
              console.log('voltar');
              navigate('/pessoas');
            },
          }}
        />
      }
    >
      {isLoading && <LinearProgress variant='indeterminate' />}

      {`Detalhe de pessoa: ${id}`}
    </LayoutBaseDePagina>
  );
};
