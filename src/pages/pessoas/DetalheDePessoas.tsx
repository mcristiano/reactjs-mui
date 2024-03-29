import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import * as yup from 'yup';

import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDeDetalhe } from '../../shared/components/ferramentas-de-Detalhe/FerramentasDeDetalhe';
import { PessoasService } from '../../shared/services/api/pessoas/PessoasService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../shared/forms';
import { AutoCompleteCidade } from './components/AutoCompleteCidade';

interface IFormData {
  nomeCompleto: string;
  email: string;
  cidadeId: number;
}
// const gPersonSchema: SchemaOf<IFormData> = yup.object({
//   firstName: string().defined(),
// }).defined();

const formValidationSchema: yup.Schema<IFormData> = yup.object().shape({
  //const formValidationSchema: yup.Schema<IFormData> = yup.object({
  nomeCompleto: yup
    .string()
    .required('O nome completo é obrigatório!')
    .min(3, 'O nome completo deve ter no mínimo 3 caracteres!'),
  email: yup.string().required('O e-mail é obrigatório!').email('E-mail inválido!'),
  cidadeId: yup.number().required(),
  //typeError('A Cidade é obrigatória!'),
});
//  .defined();

export const DetalheDePessoas = () => {
  const { id = '0' } = useParams<'id'>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [nome, setNome] = useState('');
  //const formRef = useRef<VFormHandles>(null);
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();

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
          formRef.current?.setData(result.data);
        }
      });
    } else {
      formRef.current?.setData({ nomeCompleto: '', email: '', cidadeId: undefined });
      //formRef.current?.setData({ nomeCompleto: '', email: '', cidadeId: undefined });
    }
  }, [formRef, id, navigate]); // analisar os 3 elementos fora o id

  const handleSave = (dados: IFormData) => {
    console.log(dados);

    formValidationSchema
      .validate(dados, { abortEarly: false })
      .then((dadosValidados: IFormData) => {
        setIsLoading(true);

        if (id === '0') {
          PessoasService.create(dadosValidados).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
            } else {
              alert('Registro salvo com sucesso!');
              if (isSaveAndClose()) {
                navigate('/pessoas');
              } else {
                navigate(`/pessoas/detalhe/${result}`);
              }
            }
          });
        } else {
          PessoasService.updateById(Number(id), { id: Number(id), ...dadosValidados }).then((result) => {
            setIsLoading(false);
            if (result instanceof Error) {
              alert(result.message);
              if (isSaveAndClose()) {
                navigate('/pessoas');
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

  return (
    <LayoutBaseDePagina
      titulo={id === '0' ? 'Nova pessoa' : nome || 'Editando pessoa'}
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
              navigate('/pessoas/detalhe/0');
            },
          }}
          btnVoltar={{
            mostrarBotao: true,
            mostrarCarregando: false,
            aoClicar: () => {
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
                {/* <VTextField fullWidth disabled={isLoading} label='Cidade' name='cidadeId' /> */}
                <AutoCompleteCidade isExternalLoading={isLoading} />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};
