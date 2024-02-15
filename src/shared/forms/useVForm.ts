import { useRef } from 'react';
import { VFormHandles } from '.';

export const useVForm = () => {
  const formRef = useRef<VFormHandles>(null); // analisar se vale a pena esse impost do VFormHandles

  return { formRef, save: formRef.current?.submitForm };
};
