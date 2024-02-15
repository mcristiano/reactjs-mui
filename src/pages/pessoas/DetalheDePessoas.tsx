import { useNavigate, useParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';

import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-Detalhe/FerramentasDeDetalhe';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { useEffect, useRef, useState } from 'react';

import { VTextField, VForm, VFormHandles } from '../../shared/forms';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}

export const DetalheDePessoas = () => {
  const { id = '0' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  const formRef = useRef<VFormHandles>(null);

  useEffect(() => {
    if (id !== '0') {
      setIsLoading(true);

      PessoasService.getById(Number(id)).then((result) => {
        //console.log('id:', id, 'result:', result);
        if (result instanceof Error) {
          alert(result.message);
          navigate('/pessoas');
        } else {
          setNome(result.data.nomeCompleto);
          setIsLoading(false);
          formRef.current?.setData(result.data);
        }
      });
    } else {
      formRef.current?.setData({ nomeCompleto: '', email: '', cidadeId: undefined });
      //formRef.current?.setData({ nomeCompleto: '', email: '', cidadeId: undefined });
      //setData({ nomeCompleto: '', email: '', cidadeId: 0 });
    }
  }, [id]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      PessoasService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/pessoas');
        }
      });
    }
  };

  const handleSave = (dados: IFormData) => {
    setIsLoading(true);

    if (id === '0') {
      console.log('id:', id);
      PessoasService.create(dados).then((result) => {
        console.log('id:', id, 'result:', result);
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
        } else {
          console.log('registro salvo com sucesso id:', result);

          alert('Registro salvo com sucesso!');
          navigate(`/pessoas/detalhe/${result}`);
        }
      });
    } else {
      PessoasService.updateById(Number(id), { id: Number(id), ...dados }).then((result) => {
        console.log('id:', id, 'result:', result);
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          // } else {
          //   alert('Registro salvo com sucesso!');
          //   navigate('/pessoas');
        }
      });
    }
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
              formRef.current?.submitForm();
            },
          }}
          btnSalvarEFechar={{
            mostrarBotao: true,
            mostrarCarregando: false,
            aoClicar: () => {},
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
      <VForm ref={formRef} onSubmit={handleSave} placeholder={'placeholder'}>
        <Box margin={1} display='flex' flexDirection='column' component={Paper} variant='outlined'>
          <Grid container direction='column' padding={2} spacing={2}>
            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Geral</Typography>
            </Grid>

            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <VTextField
                  fullWidth
                  disabled={isLoading}
                  label='Nome Completo'
                  name='nomeCompleto'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <VTextField fullWidth disabled={isLoading} label='email' name='email' />
              </Grid>
            </Grid>
            <Grid container item direction='row' spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <VTextField fullWidth disabled={isLoading} label='Cidade' name='cidadeId' />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
