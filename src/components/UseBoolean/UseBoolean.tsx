import useBoolean from './use-boolean';

export default function UseBooleanDemo() {
    const { value, setTrue, setFalse, toggle } = useBoolean(false);

    return (
        <div className="hook-demo">
            <div className="value-display">
                Status: <span className={value ? 'true' : 'false'}>{String(value)}</span>
            </div>
            <div className="btn-grid">
                <button onClick={setTrue}>Set True</button>
                <button onClick={setFalse}>Set False</button>
                <button onClick={toggle}>Toggle</button>
            </div>
        </div>
    );
}
