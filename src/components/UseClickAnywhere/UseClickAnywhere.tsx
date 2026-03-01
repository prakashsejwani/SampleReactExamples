import { useState, useEffect, useRef } from 'react';
import './styles.scss';

export function useClickAnywhere(handler: (event: MouseEvent) => void) {
    const savedHandler = useRef(handler);

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const listener = (event: MouseEvent) => {
            savedHandler.current(event);
        };

        document.addEventListener('click', listener);

        return () => {
            document.removeEventListener('click', listener);
        };
    }, []);
}

export default function UseClickAnywhereDemo() {
    const [count, setCount] = useState(0);

    useClickAnywhere(() => {
        setCount((prev) => prev + 1);
    });

    return (
        <div className="use-click-anywhere-demo">
            <h2>useClickAnywhere Hook</h2>
            <div className="demo-content">
                <p className="instruction">
                    Click anywhere on this page to increment the counter below.
                </p>
                <div className="counter-box">
                    <span className="count-label">Global Clicks:</span>
                    <span className="count-value">{count}</span>
                </div>
            </div>
        </div>
    );
}
