import { useState, useCallback, useMemo } from 'react';

export function useSet<T>(initialState?: Set<T> | T[]) {
    // Memoize the initial set so that reset returns back to what was captured on mount
    const initialSet = useMemo(
        () => new Set<T>(initialState),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        []
    );
    const [set, setSet] = useState<Set<T>>(initialSet);

    const add = useCallback((item: T) => {
        setSet((prev) => {
            if (prev.has(item)) return prev;
            const newSet = new Set(prev);
            newSet.add(item);
            return newSet;
        });
    }, []);

    const remove = useCallback((item: T) => {
        setSet((prev) => {
            if (!prev.has(item)) return prev;
            const newSet = new Set(prev);
            newSet.delete(item);
            return newSet;
        });
    }, []);

    const toggle = useCallback((item: T) => {
        setSet((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(item)) {
                newSet.delete(item);
            } else {
                newSet.add(item);
            }
            return newSet;
        });
    }, []);

    const reset = useCallback(() => {
        setSet(initialSet);
    }, [initialSet]);

    const clear = useCallback(() => {
        setSet(new Set<T>());
    }, []);

    const has = useCallback(
        (item: T) => {
            return set.has(item);
        },
        [set]
    );

    return { set, add, remove, toggle, reset, clear, has };
}

export default function Component() {
    // Note: 'has' added to destructuring since it is used in the example markup below.
    const { set, add, remove, toggle, reset, clear, has } = useSet(new Set(['hello']));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '600px', margin: '0 auto', color: '#fff', background: 'radial-gradient(circle at top left, #1e293b, #0f172a)', padding: '2.5rem', borderRadius: '2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.05)' }}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button
                    style={{ padding: '0.5rem 1rem', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => add(Date.now().toString())}
                >
                    Add
                </button>
                <button
                    style={{ padding: '0.5rem 1rem', background: has('hello') ? '#ef4444' : '#9ca3af', color: 'white', border: 'none', borderRadius: '4px', cursor: has('hello') ? 'pointer' : 'not-allowed' }}
                    onClick={() => remove('hello')}
                    disabled={!has('hello')}
                >
                    Remove 'hello'
                </button>
                <button
                    style={{ padding: '0.5rem 1rem', background: '#8b5cf6', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => toggle('hello')}
                >
                    Toggle hello
                </button>
                <button
                    style={{ padding: '0.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => reset()}
                >
                    Reset
                </button>
                <button
                    style={{ padding: '0.5rem 1rem', background: '#f59e0b', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => clear()}
                >
                    Clear
                </button>
            </div>
            <pre style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255, 255, 255, 0.1)', overflowX: 'auto', textAlign: 'left', color: '#818cf8' }}>
                {JSON.stringify(Array.from(set), null, 2)}
            </pre>
        </div>
    );
}
