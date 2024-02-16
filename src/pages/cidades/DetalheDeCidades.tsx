import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-Detalhe/FerramentasDeDetalhe';
import { CidadesService } from '../../shared/services/api/cidades/CidadesService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';

interface IFormData {
  nome: string;
}

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  nome: yup.string().required().min(3),

  //typeError('A Cidade é obrigatória!'),
});
//  .defined();

export const DetalheDeCidades = () => {
  const { id = '0' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  //const formRef = useRef<VFormHandles>(null);
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

  useEffect(() => {
    if (id !== '0') {
      setIsLoading(true);

      CidadesService.getById(Number(id)).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          navigate('/cidades');
        } else {
          setNome(result.data.nome);
          setIsLoading(false);
          formRef.current?.setData(result.data);
        }
      });
    } else {
      formRef.current?.setData({ nome: '' });
      //formRef.current?.setData({ nomeCompleto: '', email: '', cidadeId: undefined });
    }
  }, [formRef, id, navigate]); // analisar os 3 elementos fora o id

  const handleSave = (dados: IFormData) => {
    // console.log(formValidationSchema);

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados: IFormData) => {
        setIsLoading(true);

        if (id === '0') {
          CidadesService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Registro salvo com sucesso!');
              if (isSaveAndClose()) {
                navigate('/cidades');
              } else {
                navigate(`/cidades/detalhe/${result}`);
              }
            }
          });
        } else {
          CidadesService.updateById(Number(id), { id: Number(id), ...dadosValidados }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              if (isSaveAndClose()) {
                navigate('/cidades');
              }
            }
          });
        }
      })
      .catch((errors: yup.ValidationError) => {
        //const validationErrors: IVFormErrors = {};
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach((error) => {
          if (!error.path) return;
          validationErrors[error.path] = error.message;
        });

        console.log(validationErrors);
        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          alert('Registro apagado com sucesso!');
          navigate('/cidades');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo={id === '0' ? 'Nova cidade' : nome || 'Editando cidade'}
      barraDeFerramentas={
        <FerramentasDeDetalhe
          btnSalvar={{
            mostrarBotao: true,
            mostrarCarregando: false,
            //aoClicar: () => { formRef.current?.submitForm(); },
            aoClicar: save,
          }}
          btnSalvarEFechar={{
            mostrarBotao: true,
            mostrarCarregando: false,
            aoClicar: () => {
              saveAndClose;
            },
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
              navigate('/cidades/detalhe/0');
            },
          }}
          btnVoltar={{
            mostrarBotao: true,
            mostrarCarregando: false,
            aoClicar: () => {
              navigate('/cidades');
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
                  label='Nome'
                  name='nome'
                  onChange={(e) => setNome(e.target.value)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
