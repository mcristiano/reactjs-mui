import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { FerramentasDaListagem } from '../../shared/components';
import { CidadesService, IListagemCidade } from '../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment/index';
import {
  Icon,
  IconButton,
  LinearProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from '@mui/material';

export const ListagemDeCidades = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { debounce } = useDebounce(2000);
  const navigate = useNavigate();

  const [rows, setRows] = useState<IListagemCidade[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fBusca = useMemo(() => {
    return searchParams.get('busca') || '';
  }, [searchParams]);

  const fPagina = useMemo(() => {
    return Number(searchParams.get('pagina') || '1');
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(fPagina, fBusca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          alert(result.message);
          return;
        } else {
          setRows(result.data);
          setTotalCount(result.totalCount);
        }
      });
    });
  }, [debounce, fBusca, fPagina]);

  const handleDelete = (id: number) => {
    if (confirm('Realmente deseja apagar?')) {
      CidadesService.deleteById(id).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
        } else {
          setRows((oldRows) => {
            return [...oldRows.filter((oldRow) => oldRow.id !== id)];
          });
          alert('Registro apagado com sucesso!');
        }
      });
    }
  };

  return (
    <LayoutBaseDePagina
      titulo='Listagem de Cidades'
      barraDeFerramentas={
        <FerramentasDaListagem
          mostrarInputDeBusca={true}
          textoBotaoNovo='Nova'
          textoDaBusca={fBusca}
          aoMudarTextoDeBusca={(texto) => setSearchParams({ busca: texto, pagina: '1' }, { replace: true })}
          aoClickBotaoNovo={() => navigate(`/cidades/detalhe/0`)}
        />
      }
    >
      <TableContainer component={Paper} variant='outlined' sx={{ m: 1, width: 'auto', height: '100%' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={100}>Ações</TableCell>
              <TableCell>Nome</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  <IconButton size='small' onClick={() => handleDelete(row.id)}>
                    <Icon>delete</Icon>
                  </IconButton>

                  <IconButton size='small' onClick={() => navigate(`/cidades/detalhe/${row.id}`)}>
                    <Icon>edit</Icon>
                  </IconButton>
                </TableCell>
                <TableCell>{row.nome}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          {totalCount === 0 && !isLoading && <caption>{Environment.LISTAGEM_VAZIA}</caption>}

          <TableFooter>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={3}>
                  <LinearProgress variant='indeterminate' />
                </TableCell>
              </TableRow>
            )}

            {totalCount > 0 && totalCount > Environment.LIMITE_DE_LINHAS && (
              <TableRow>
                <TableCell colSpan={3}>
                  <Pagination
                    page={fPagina}
                    count={Math.ceil(totalCount / Environment.LIMITE_DE_LINHAS)}
                    onChange={(_, newPage) =>
                      setSearchParams({ busca: fBusca, pagina: newPage.toString() }, { replace: true })
                    }
                  />
                </TableCell>
              </TableRow>
            )}
          </TableFooter>
        </Table>
      </TableContainer>
    </LayoutBaseDePagina>
  );
};
