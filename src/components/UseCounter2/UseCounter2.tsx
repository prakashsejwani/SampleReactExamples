import useCounter2 from './use-counter-2';


export default function UseCounter2Demo() {
    const { count, increment, decrement, reset } = useCounter2(10);

    return (
        <div className="hook-demo">
            <div className="value-display">Count: {count}</div>
            <div className="btn-grid">
                <button onClick={increment}>+</button>
                <button onClick={decrement}>-</button>
                <button onClick={reset}>Reset to 10</button>
            </div>
        </div>
    );
}
