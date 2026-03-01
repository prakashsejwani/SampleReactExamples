import { useState, useEffect } from 'react';
import './styles.scss';

export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set a timeout to delay the update
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Clear the timeout if the value or delay changes,
        // or when the component unmounts. This represents
        // the core "debounce" behavior.
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function UseDebounceDemo() {
    const [keyword, setKeyword] = useState('');
    const debouncedKeyword = useDebounce(keyword, 1000);

    return (
        <div className="use-debounce-demo">
            <h2>useDebounce Hook</h2>
            <div className="demo-content">
                <p className="instruction">
                    Start typing to observe the hook debounce the input value by 1 second.
                </p>

                <div className="input-group">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Type something..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>

                <div className="output-group">
                    <div className="output-row">
                        <span className="output-label">Immediate value:</span>
                        <span className="output-value immediate">{keyword}</span>
                    </div>
                    <div className="output-row">
                        <span className="output-label">Debounced keyword:</span>
                        <span className="output-value debounced">{debouncedKeyword}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
