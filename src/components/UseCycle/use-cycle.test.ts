import { renderHook, act } from '@testing-library/react';
import useCycle from './use-cycle';

describe('useCycle', () => {
    it('should initialize with the first value', () => {
        const { result } = renderHook(() => useCycle('a', 'b', 'c'));
        expect(result.current[0]).toBe('a');
    });

    it('should cycle through values', () => {
        const { result } = renderHook(() => useCycle('a', 'b', 'c'));
        act(() => {
            result.current[1]();
        });
        expect(result.current[0]).toBe('b');
        act(() => {
            result.current[1]();
        });
        expect(result.current[0]).toBe('c');
    });

    it('should wrap around to the first value after the last', () => {
        const { result } = renderHook(() => useCycle('a', 'b'));
        act(() => {
            result.current[1](); // b
            result.current[1](); // a
        });
        expect(result.current[0]).toBe('a');
    });

    it('should throw error if no values provided', () => {
        // We expect it to throw during initialization
        expect(() => renderHook(() => useCycle())).toThrow("useCycle requires at least one value");
    });
});
