import { useEffect, useMemo, useState } from 'react';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { CidadesService } from '../../../shared/services/api/cidades/CidadesService';
import { useDebounce } from '../../../shared/hooks/UseDebounce';
import { useField } from '@unform/core';

type TAutoCompleteOptions = {
  selectedId: number;
  label: string;
};

interface IAutoCompleteCidadeProps {
  isExternalLoading: boolean;
}

export const AutoCompleteCidade = ({ isExternalLoading = false }: IAutoCompleteCidadeProps) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField('cidadeId');
  const [options, setOptions] = useState<TAutoCompleteOptions[]>([]);
  const { debounce } = useDebounce(2000);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => selectedId,
      setValue: (_, newSelectedId) => setSelectedId(newSelectedId),
    });
  }, [fieldName, registerField, selectedId]); // */

  useEffect(() => {
    setIsLoading(true);

    debounce(() => {
      CidadesService.getAll(1, busca).then((result) => {
        setIsLoading(false);
        if (result instanceof Error) {
          return;
        } else {
          //console.log('result::', result);
          setOptions(result.data.map((item) => ({ selectedId: item.id, label: item.nome })));
          //console.log('options::', options);
        }
      });
    });
  }, [busca]);

  const autoCompleteSelectedOption = useMemo(() => {
    if (!selectedId) return null;
    const selectedOption = options.find((option) => option.selectedId === selectedId);
    if (!selectedOption) return null;
    return selectedOption;
  }, [selectedId, options]);

  return (
    <Autocomplete
      value={autoCompleteSelectedOption}
      openText='Abrir'
      closeText='Fechar'
      noOptionsText='Sem resultados'
      loadingText='Carregando . . .'
      disablePortal
      disabled={isExternalLoading}
      loading={isLoading}
      popupIcon={isExternalLoading || isLoading ? <CircularProgress size={16} /> : undefined}
      onInputChange={(_, newBusca) => setBusca(newBusca)}
      onChange={(_, value) => {
        setSelectedId(value?.selectedId);
        setBusca('');
        clearError();
      }}
      options={options}
      renderInput={(params) => <TextField {...params} error={!!error} helperText={error} label='Cidade' />}
    />
  );
};
