import useCycle from './use-cycle';
import './UseCycle.scss';

export default function UseCycleDemo() {
    const [value, cycle] = useCycle('Red', 'Green', 'Blue', 'Yellow');

    return (
        <div className="hook-demo">
            <div className="value-display">
                Color: <span style={{ color: value }}>{value}</span>
            </div>
            <div className="btn-grid">
                <button onClick={cycle}>Next Color</button>
            </div>
        </div>
    );
}
