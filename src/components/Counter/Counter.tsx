import { useState } from 'react';
import './Counter.scss';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter-showcase">
      <div className="counter-value">{count}</div>
      <button
        className="counter-button"
        onClick={() => setCount(prev => prev + 1)}
      >
        Increment
      </button>
    </div>
  );
}
