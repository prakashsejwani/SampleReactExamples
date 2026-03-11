import { useState, useEffect } from 'react';
import './styles.scss';

export interface WindowSize {
    width: number;
    height: number;
}

export function useWindowSize(): WindowSize {
    const [size, setSize] = useState<WindowSize>(() => ({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0,
    }));

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

export default function UseWindowSizeDemo() {
    const screen = useWindowSize();

    return (
        <div className="use-window-size-demo">
            <h2>useWindowSize Hook</h2>
            <div className="demo-content">
                <p>The current window dimensions are:</p>
                <code>{JSON.stringify(screen, null, 2)}</code>
            </div>
        </div>
    );
}
