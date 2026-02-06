import { renderHook, act } from '@testing-library/react';
import useCounter2 from './use-counter-2';

describe('useCounter2', () => {
    it('should initialize with initial value', () => {
        const { result } = renderHook(() => useCounter2(10));
        expect(result.current.count).toBe(10);
    });

    it('should increment', () => {
        const { result } = renderHook(() => useCounter2(0));
        act(() => {
            result.current.increment();
        });
        expect(result.current.count).toBe(1);
    });

    it('should decrement', () => {
        const { result } = renderHook(() => useCounter2(5));
        act(() => {
            result.current.decrement();
        });
        expect(result.current.count).toBe(4);
    });

    it('should reset to initial value (from Ref)', () => {
        const { result } = renderHook(() => useCounter2(5));
        act(() => {
            result.current.increment();
            result.current.reset();
        });
        expect(result.current.count).toBe(5);
    });

    it('should maintain stable functions', () => {
        const { result, rerender } = renderHook(() => useCounter2(0));
        const firstIncrement = result.current.increment;
        rerender();
        expect(result.current.increment).toBe(firstIncrement);
    });
});
