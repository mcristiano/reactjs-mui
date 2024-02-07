import { useCallback, useRef } from 'react';
//export const useDebounce = <T>(value: T, delay: number) => {
export const useDebounce = (delay: number = 1000, notDelayInFirstTime = true) => {
  const debouncing = useRef<NodeJS.Timeout>();
  const IsFirstTime = useRef(notDelayInFirstTime);

  const debounce = useCallback(
    (func: () => void) => {
      if (IsFirstTime.current) {
        IsFirstTime.current = false;
        func();
      } else {
        if (debouncing.current) {
          clearTimeout(debouncing.current);
        }
        debouncing.current = setTimeout(() => func(), delay);
      }
    },
    [delay],
  );
  return { debounce };
};
