import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';
import { useThrottle } from './UseThrottle';

describe('useThrottle', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should return a function', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        expect(typeof result.current).toBe('function');
    });

    it('should invoke the callback when the throttled function is called', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        act(() => {
            result.current();
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments to the callback', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        act(() => {
            result.current('a', 1);
        });
        expect(callback).toHaveBeenCalledWith('a', 1);
    });

    it('should invoke callback only once when called multiple times within the delay window', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        act(() => {
            result.current();
            result.current();
            result.current();
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should invoke callback again after the delay has passed', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        act(() => {
            result.current();
        });
        act(() => {
            vi.advanceTimersByTime(100);
        });
        act(() => {
            result.current();
        });
        expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should not invoke callback on the second call within the same window', () => {
        const callback = vi.fn();
        const { result } = renderHook(() => useThrottle(callback, 100));
        act(() => {
            result.current();
        });
        act(() => {
            result.current();
        });
        act(() => {
            vi.advanceTimersByTime(50);
        });
        act(() => {
            result.current();
        });
        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should use the same callback reference when delay does not change', () => {
        const callback = vi.fn();
        const { result, rerender } = renderHook(
            ({ delay }) => useThrottle(callback, delay),
            { initialProps: { delay: 100 } }
        );
        const first = result.current;
        rerender({ delay: 100 });
        expect(result.current).toBe(first);
    });

    it('should return a new throttled function when delay changes', () => {
        const callback = vi.fn();
        const { result, rerender } = renderHook(
            ({ delay }) => useThrottle(callback, delay),
            { initialProps: { delay: 100 } }
        );
        const first = result.current;
        rerender({ delay: 200 });
        expect(result.current).not.toBe(first);
    });
});
