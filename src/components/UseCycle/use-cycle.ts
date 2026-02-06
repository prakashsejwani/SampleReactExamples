import { useState } from 'react';
import './UseCycle.scss';

export default function useCycle<T>(...values: T[]): [T, () => void] {
  if (values.length === 0) {
    throw new Error("useCycle requires at least one value");
  }

  const [index, setIndex] = useState(0);

  const cycle = () => {
    setIndex((prev) => (prev + 1) % values.length);
  };

  return [
    values[index],
    cycle,
  ];
}