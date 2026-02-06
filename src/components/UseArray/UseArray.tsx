import useArray from './use-array';


export default function UseArrayDemo() {
    const { array, push, update, remove, filter, set, clear } = useArray([1, 2, 3]);

    return (
        <div className="hook-demo">
            <div className="array-display">
                {JSON.stringify(array)}
            </div>
            <div className="btn-grid">
                <button onClick={() => push(Math.floor(Math.random() * 100))}>Push Random</button>
                <button onClick={() => update(0, 999)}>Update index 0</button>
                <button onClick={() => remove(0)}>Remove index 0</button>
                <button onClick={() => filter((n: number) => n > 5)}>Filter &gt; 5</button>
                <button onClick={() => set()}>Reset</button>
                <button onClick={() => clear()}>Clear</button>
            </div>
        </div>
    );
}
