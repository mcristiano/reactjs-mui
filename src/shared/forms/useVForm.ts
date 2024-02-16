import { useCallback, useRef } from 'react';
import { VFormHandles } from '.';

export const useVForm = () => {
  const formRef = useRef<VFormHandles>(null); // analisar se vale a pena esse impost do VFormHandles
  const isSaveAndClose = useRef(false);
  const isSaveAndNew = useRef(false);

  const handleSave = useCallback(() => {
    isSaveAndClose.current = false;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);
  const handleSaveAndNew = useCallback(() => {
    isSaveAndClose.current = false;
    isSaveAndNew.current = true;
    formRef.current?.submitForm();
  }, []);
  const handleSaveAndClose = useCallback(() => {
    isSaveAndClose.current = true;
    isSaveAndNew.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleIsSaveAndNew = useCallback(() => {
    return isSaveAndNew.current;
  }, []);
  const handleIsSaveAndClose = useCallback(() => {
    return isSaveAndClose.current;
  }, []);

  return {
    formRef,
    save: handleSave,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };

  //return { formRef, save: formRef.current?.submitForm };
};
