import { Enviroement } from '../../../environment/index';
import { Api } from '../axios-config/axios';

interface IListagemPessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
interface IDetalhePessoa {
  id: number;
  email: string;
  cidadeId: number;
  nomeCompleto: string;
}
type TPessoasComTotalCount = {
  data: IListagemPessoa[];
  totalCount: number;
};

// const getAll = async (page =  1, filter = '') : Promise<TPessoasComTotalCount | Error> => {
//   try {
//     const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroement.LIMITE_DE_LINHAS}&nomeCompleto_${filter}`;
//     const { data, headers } = await Api.get(urlRelativa);

//     if (data) {
//       return {
//         data,
//         totalCount : Number(headers['x-total-count'] || Enviroement.LIMITE_DE_LINHAS),
//       };
//       return new Error('Erro ao listar os dados!');
//     }
//   } catch (error) {

//   }
// };

const getAll = async (page = 1, filter = ''): Promise<TPessoasComTotalCount | Error> => {
  try {
    const urlRelativa = `/pessoas?_page=${page}&_limit=${Enviroement.LIMITE_DE_LINHAS}&nomeCompleto_${filter}`;
    //const { data, headers } = await Api.get(urlRelativa);

    return new Error('Erro ao carregar os dados');
  } catch (error) {
    return new Error('Erro ao listar os dados!');
  }
};

const getById = async (): Promise<any> => {};
const create = async (): Promise<any> => {};
const updateById = async (): Promise<any> => {};
const deleteById = async (): Promise<any> => {};

export const PessoasService = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
