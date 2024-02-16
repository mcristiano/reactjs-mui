import { Environment } from '../../../environment/index';
import { Api } from '../axios-config/axios';

export interface IListagemCidade {
  id: number;
  nome: string;
}
export interface IDetalheCidade {
  id: number;
  nome: string;
}
type TCidadesComTotalCount = {
  data: IListagemCidade[];
  totalCount: number;
};

const getAll = async (page = 1, filter = ''): Promise<TCidadesComTotalCount | Error> => {
  try {
    const urlRelativa = `/cidades?_page=${page}&_limit=${Environment.LIMITE_DE_LINHAS}&q=${filter}&attrib=nome`;

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

const getById = async (id: number): Promise<{ data: IDetalheCidade } | Error> => {
  try {
    const { data } = await Api.get(`cidades/${id}`);

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
const create = async (dados: Omit<IDetalheCidade, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetalheCidade>('/cidades', dados);

    if (data) {
      return data.id;
    }
    return new Error('Erro ao criar o registro');
  } catch (error) {
    //return new Error('Erro ao listar os dados!');
    return new Error((error as { message: string }).message || ' \n Erro ao criar o registro!');
  }
};

const updateById = async (id: number, dados: IDetalheCidade): Promise<void | Error> => {
  try {
    const ret = await Api.put(`cidades/${id}`, dados);
    console.log('ret::', ret);
  } catch (error) {
    return new Error((error as { message: string }).message || ' \n Erro ao consultar os dados!');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    return await Api.delete(`cidades/${id}`);
  } catch (error) {
    return new Error((error as { message: string }).message || ' \n Erro ao delete os dados!');
  }
};

export const CidadesService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
