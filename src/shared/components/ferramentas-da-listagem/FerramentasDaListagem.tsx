import { Box, TextField, Button, Paper, useTheme, Icon, InputAdornment } from '@mui/material';
import { Environment } from '../../environment';

interface IFerramentasDaListagemProps {
  textoDaBusca?: string;
  mostrarInputDeBusca?: boolean;
  aoMudarTextoDeBusca?: (novoTexto: string) => void;
  //
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClickBotaoNovo?: () => void;
}

export const FerramentasDaListagem = ({
  textoDaBusca = '',
  mostrarInputDeBusca = false,
  aoMudarTextoDeBusca,
  //
  textoBotaoNovo = 'Novo',
  mostrarBotaoNovo = true,
  aoClickBotaoNovo,
}: IFerramentasDaListagemProps) => {
  const theme = useTheme();
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
      {mostrarInputDeBusca && (
        <TextField
          size='small'
          placeholder={Environment.INPUT_BUSCA_PLACEHOLDER}
          value={textoDaBusca}
          onChange={(e) => aoMudarTextoDeBusca?.(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Icon>search</Icon>
              </InputAdornment>
            ),
          }}
        />
      )}
      <Box flex={1} display={'flex'} justifyContent={'end'}>
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            endIcon={<Icon>add</Icon>}
            onClick={aoClickBotaoNovo}
          >
            {textoBotaoNovo}
          </Button>
        )}
      </Box>
    </Box>
  );
};
