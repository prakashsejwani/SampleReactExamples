import { useCallback, useRef, useState } from 'react';
import './UseCounter2.scss';

export default function useCounter2(initialValue: number = 0) {
  const initialRef = useRef(initialValue);
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const decrement = useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  const reset = useCallback(() => {
    setCount(initialRef.current);
  }, []);

  return { count, increment, decrement, reset, setCount };
}
