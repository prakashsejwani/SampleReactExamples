import { useState, useCallback } from 'react';


export default function useBoolean(initialValue: boolean) {
  const [value, setValue] = useState(Boolean(initialValue));

  const setTrue = useCallback(() => {
    setValue(true);
  }, []);

  const setFalse = useCallback(() => {
    setValue(false);
  }, []);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return { value, setTrue, setFalse, toggle };
}