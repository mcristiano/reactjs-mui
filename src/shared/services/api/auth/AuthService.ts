import { Api } from '../axios-config/axios';

interface IAuth {
  access_token: string;
}

const auth = async (email: string, password: string): Promise<IAuth | Error> => {
  try {
    const { data } = await Api.get('/auth', { data: { email, password } });

    if (data) {
      return data;
    }
    return new Error('Erro no login');
  } catch (error) {
    return new Error((error as { message: string }).message || ' \n Erro no login!');
  }
};

export const AuthService = { auth };
