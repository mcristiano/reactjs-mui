import { Environment } from '../../../environment/index';
import { Api } from '../axios-config/axios';

export interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
export interface IDetalhePessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    //const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&nomeCompleto_like=${filter}`;
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&q=${filter}&attrib=nomeCompleto`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITE_DE_LINHAS),
      };
    }
    return new Error('Erro ao carregar os dados');
  } catch (error) {
    //return new Error('Erro ao listar os dados!');
    return new Error((error as { message: string }).message || ' \n Erro ao listar os dados!');
  }
};

const getById = async (id: number): Promise<{ data: IDetalhePessoa } | Error> => {
  try {
    console.log('id', id);
    const { data } = await Api.get(`pessoas/${id}`);
    console.log('id', id, 'data:', data);

    if (data) {
      return {
        data,
      };
    }
    return new Error('Erro ao consultar os dados');
  } catch (error) {
    //return new Error('Erro ao listar os dados!');
    return new Error((error as { message: string }).message || ' \n Erro ao consultar os dados!');
  }
};
const create = async (dados: Omit<IDetalhePessoa, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalhePessoa>('/pessoas', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro');
  } catch (error) {
    //return new Error('Erro ao listar os dados!');
    return new Error((error as { message: string }).message || ' \n Erro ao criar o registro!');
  }
};

const updateById = async (id: number, dados: IDetalhePessoa): Promise<void | Error> => {
  try {
    const ret = await Api.put(`pessoas/${id}`, dados);
    console.log('ret', ret);
  } catch (error) {
    return new Error((error as { message: string }).message || ' \n Erro ao consultar os dados!');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    return await Api.delete(`pessoas/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || ' \n Erro ao delete os dados!');
  }
};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
