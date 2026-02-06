import { useState } from 'react';
import './UseArray.scss';

export default function useArray<T>(defaultValue: T[] = []) {
  const [array, setArray] = useState<T[]>(defaultValue);

  const push = (value: T) => {
    setArray((prev: T[]) => [...prev, value]);
  };

  const update = (index: number, value: T) => {
    setArray((prev: T[]) =>
      prev.map((item: T, i: number) => (i === index ? value : item))
    );
  };

  const remove = (index: number) => {
    setArray((prev: T[]) => prev.filter((_, i: number) => i !== index));
  }

  const filter = (predicate: (value: T, index: number, array: T[]) => boolean) => {
    setArray((prev: T[]) => prev.filter(predicate));
  };

  const set = () => {
    setArray(defaultValue);
  };

  const clear = () => {
    setArray([]);
  };

  return { array, push, update, remove, filter, set, clear }
}