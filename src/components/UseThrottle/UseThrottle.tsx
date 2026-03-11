import { useRef, useCallback, useState } from 'react';
import './styles.scss';

type ThrottledFn<T extends (...args: unknown[]) => unknown> = (...args: Parameters<T>) => void;

export function useThrottle<T extends (...args: unknown[]) => unknown>(
    callback: T,
    delay: number
): ThrottledFn<T> {
    const lastInvokeTimeRef = useRef<number>(0);

    return useCallback<ThrottledFn<T>>(
        (...args: Parameters<T>) => {
            const now = Date.now();
            if (now - lastInvokeTimeRef.current >= delay) {
                lastInvokeTimeRef.current = now;
                callback(...args);
            }
        },
        [callback, delay]
    );
}

export default function UseThrottleDemo() {
    const [throttledCount, setThrottledCount] = useState(0);
    const [lastTriggered, setLastTriggered] = useState<string>('—');

    const throttledIncrement = useThrottle(() => {
        setThrottledCount((c) => c + 1);
        setLastTriggered(new Date().toLocaleTimeString());
    }, 500);

    return (
        <div className="use-throttle-demo">
            <h2>useThrottle Hook</h2>
            <div className="demo-content">
                <p className="instruction">
                    Click the button repeatedly. The counter below updates at most once per 500ms (throttled).
                </p>

                <div className="input-group">
                    <button
                        type="button"
                        className="trigger-btn"
                        onClick={() => throttledIncrement()}
                    >
                        Click me (throttled)
                    </button>
                </div>

                <div className="output-group">
                    <div className="output-row">
                        <span className="output-label">Throttled invocations</span>
                        <span className="output-value count">{throttledCount}</span>
                    </div>
                    <div className="output-row">
                        <span className="output-label">Last triggered</span>
                        <span className="output-value timestamp">{lastTriggered}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
