import { renderHook, act } from '@testing-library/react';
import useCounter from './use-counter';

describe('useCounter', () => {
    it('should initialize with initial value', () => {
        const { result } = renderHook(() => useCounter(10));
        expect(result.current.count).toBe(10);
    });

    it('should use 0 as default initial value', () => {
        const { result } = renderHook(() => useCounter());
        expect(result.current.count).toBe(0);
    });

    it('should increment', () => {
        const { result } = renderHook(() => useCounter(0));
        act(() => {
            result.current.increment();
        });
        expect(result.current.count).toBe(1);
    });

    it('should decrement', () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.decrement();
        });
        expect(result.current.count).toBe(4);
    });

    it('should reset to initial value', () => {
        const { result } = renderHook(() => useCounter(5));
        act(() => {
            result.current.increment();
            result.current.increment();
            result.current.reset();
        });
        expect(result.current.count).toBe(5);
    });

    it('should set count directly', () => {
        const { result } = renderHook(() => useCounter(0));
        act(() => {
            result.current.setCount(100);
        });
        expect(result.current.count).toBe(100);
    });
});
