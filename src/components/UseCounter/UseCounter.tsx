import useCounter from './use-counter';
import './UseCounter.scss';

export default function UseCounterDemo() {
    const { count, increment, decrement, reset } = useCounter(0);

    return (
        <div className="hook-demo">
            <div className="value-display">Count: {count}</div>
            <div className="btn-grid">
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>Reset</button>
            </div>
        </div>
    );
}
