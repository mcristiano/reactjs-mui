import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components/';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';

export const Dashboard = () => (
  <LayoutBaseDePagina titulo='Titulo ;)' barraDeFerramentas={<FerramentasDaListagem mostrarBotaoNovo={false} />}>
    <Box width='100%' display='flex'>
      <Grid container margin={2}>
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            <Card>
              <CardContent>
                <Typography variant='h5' align='center' component='h5'>
                  Total de cidades
                </Typography>

                <Box padding={6} display='flex' justifyContent='center' alignItems='center'>
                  <Typography variant='h1' component='h1'>
                    25
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
            <Card>
              <CardContent>Teste2</CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>

    {'Corpo do LayoutBaseDePagina no Dashboard ...  '}
  </LayoutBaseDePagina>
);
