import { useField } from '@unform/core';
import { TextField, TextFieldProps } from '@mui/material';
import { useEffect, useState, PropsWithChildren } from 'react';

type TVTextFieldProps = TextFieldProps & {
  name: string;
};

export const VTextField = ({ name, ...rest }: PropsWithChildren<TVTextFieldProps>) => {
  const { fieldName, registerField, defaultValue, error, clearError } = useField(name);
  const [value, setValue] = useState(defaultValue || '');

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
      //
    });
  }, [registerField, fieldName, value]);

  return (
    <>
      <TextField
        {...rest}
        error={!!error}
        helperText={error}
        defaultValue={defaultValue}
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          rest.onChange?.(e);
        }}
        //onKeyDown={(e) => (error ? clearError() : undefined)}
        onKeyDown={(e) => {
          error && clearError();
          rest.onKeyDown?.(e);
        }}

        // onChange={e => { setValue(e.target.value); rest.onChange?.(e); }}
        // onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
      />
    </>
  );
};
