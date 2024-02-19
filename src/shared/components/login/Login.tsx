import { PropsWithChildren, useState } from 'react';
import * as yup from 'yup';

import { useAuthContext } from './../../contexts';
import { Box, Button, Card, CardActions, CardContent, CircularProgress, TextField, Typography } from '@mui/material';

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(5),
});

export const Login = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, logout, login } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  const handleSubmit = () => {
    loginSchema
      .validate({ email, password }, { abortEarly: false })
      .then((dadosValidados) => {
        login(dadosValidados.email, dadosValidados.password);
      })
      .catch((errors: yup.ValidationError) => {
        errors.inner.forEach((error) => {
          if (error.path === 'email') {
            setEmailError(error.message);
          } else if (error.path === 'password') {
            setPasswordError(error.message);
          }
        });
      });
  };

  if (isAuthenticated) return <>{children}</>;

  return (
    <Box width='100vw' height='100vh' display='flex' justifyContent='center' alignItems='center'>
      <Card>
        <CardContent>
          <Box display={'flex'} flexDirection='column' gap={2} width='250'>
            <Typography variant='h6' align='center'>
              Identifique-se
            </Typography>

            <TextField
              fullWidth={true}
              value={email}
              type='email'
              label='Email'
              error={!!emailError}
              helperText={emailError}
              disabled={isLoading}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={() => setEmailError('')}
            />

            <TextField
              fullWidth
              type='password'
              label='Senha'
              value={password}
              error={!!passwordError}
              helperText={passwordError}
              disabled={isLoading}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={() => setPasswordError('')}
            />
          </Box>
        </CardContent>
        <CardActions>
          <Box width='100%' display='flex' justifyContent='center'>
            <Button
              variant='contained'
              disabled={isLoading}
              onClick={handleSubmit}
              endIcon={isLoading ? <CircularProgress /> : undefined}
            >
              Entrar
            </Button>
          </Box>
        </CardActions>
      </Card>
    </Box>
  );
};
