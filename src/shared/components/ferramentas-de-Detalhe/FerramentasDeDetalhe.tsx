import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';
import { PropsWithChildren } from 'react';

interface IBotoesCfg extends PropsWithChildren {
  textoBotao?: string;
  mostrarBotao: boolean;
  mostrarCarregando: boolean;
  aoClickar?: () => void;
  icon?: string;
}

interface IFerramentasDeDetalheProps extends PropsWithChildren {
  btnSalvar?: IBotoesCfg;
  btnSalvarEFechar: IBotoesCfg;
  btnApagar?: IBotoesCfg;

  btnNovo?: IBotoesCfg;
  btnVoltar?: IBotoesCfg;
}
/*
interface ButtonComponentProps extends PropsWithChildren {
  textoBotao: string;
  icon: string;
  onClick?: () => void;
}

const ButtonComponent: ({ textoBotao, icon, onClick, ...rest }: ButtonComponentProps) => {
  return (
    <Button color="primary" disableElevation variant="contained" 
      startIcon={<Icon>{icon}</Icon>} 
      onClick={onClick} {...rest}>
        {textoBotao}
    </Button>
  );
};

interface ButtonPlusProps {
  textoBotao?: string;
  mostrarBotao: boolean;
  mostrarCarregando: boolean;
  aoClickar?: () => void;
  icon?: string;
}

const ButtonPlus: React.FC<ButtonPlusProps> = ({ textoBotao, mostrarBotao, mostrarCarregando, aoClickar, icon }) => {
  return (
    <>
      {mostrarCarregando && <Skeleton width={100} height={60} />}
      {mostrarBotao && !mostrarCarregando && (
        <ButtonComponent textoBotao={textoBotao} icon={icon} onClick={aoClickar} />
      )}
    </>
  );
};



// const ButtonPlus = (botaoCfg?: IBotoesCfg) => {
//   {
//     if (!botaoCfg) {
//       return;
//     }

//     const { textoBotao, mostrarBotao, mostrarCarregando, aoClickar, icon } = botaoCfg;
//     {
//       mostrarCarregando;
//     }

//     <Skeleton width={100} height={60} />;
//     mostrarBotao && !mostrarCarregando && (
//       <Button color='primary' disableElevation variant='contained' startIcon={<Icon>{icon}</Icon>} onClick={aoClickar}>
//         {textoBotao}
//       </Button>
//     );
//   }
// };
// */

export const FerramentasDeDetalhe = ({
  btnSalvar,
  btnSalvarEFechar,
  btnApagar,
  btnNovo,
  btnVoltar,
}: IFerramentasDeDetalheProps) => {
  const theme = useTheme();
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

  return (
    <Box
      gap={1}
      height={theme.spacing(5)}
      marginX={1}
      padding={1}
      paddingX={2}
      display={'flex'}
      alignItems={'center'}
      component={Paper}
    >
      {/* //-------------------------------------------------------------------- */}
      {btnSalvar?.mostrarCarregando && <Skeleton width={100} height={60} />}
      {/* <ButtonPlus botaoCfg={btnSalvar} /> */}
      {btnSalvar?.mostrarBotao && !btnSalvar?.mostrarCarregando && (
        <Button color='primary' disableElevation variant='contained' startIcon={<Icon>save</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Salvar
          </Typography>
        </Button>
      )}
      {!smDown && !mdDown && (
        <Box>
          {btnSalvarEFechar?.mostrarCarregando && <Skeleton width={100} height={60} />}
          {btnSalvarEFechar.mostrarBotao && !btnSalvarEFechar?.mostrarCarregando && (
            <Button color='primary' disableElevation variant='outlined' startIcon={<Icon>save</Icon>}>
              <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
                Salvar e Voltar
              </Typography>
            </Button>
          )}
        </Box>
      )}
      {/* //---------------------------------------------------------------------- */}
      {btnApagar?.mostrarCarregando && <Skeleton width={100} height={60} />}
      {btnApagar?.mostrarBotao && !btnApagar?.mostrarCarregando && (
        <Button color='primary' disableElevation variant='outlined' startIcon={<Icon>remove</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Apagar
          </Typography>
        </Button>
      )}
      {btnNovo?.mostrarCarregando && !mdDown && <Skeleton width={100} height={60} />}
      {btnNovo?.mostrarBotao && !btnNovo?.mostrarCarregando && !mdDown && (
        <Button color='primary' disableElevation variant='outlined' startIcon={<Icon>add</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            {btnNovo.textoBotao}
          </Typography>
        </Button>
      )}
      {btnVoltar?.mostrarBotao &&
        (btnSalvar?.mostrarBotao ||
          btnSalvarEFechar.mostrarBotao ||
          btnApagar?.mostrarBotao ||
          btnNovo?.mostrarBotao ||
          btnVoltar?.mostrarBotao) && <Divider variant={'middle'} orientation='vertical' flexItem={true} />}
      {btnVoltar?.mostrarCarregando && <Skeleton width={100} height={60} />}
      {btnVoltar?.mostrarBotao && !btnVoltar?.mostrarCarregando && (
        <Button color='primary' disableElevation variant='outlined' startIcon={<Icon>arrow_back</Icon>}>
          <Typography variant='button' whiteSpace='nowrap' textOverflow='ellipsis' overflow='hidden'>
            Voltar
          </Typography>
        </Button>
      )}
    </Box>
  );
};
