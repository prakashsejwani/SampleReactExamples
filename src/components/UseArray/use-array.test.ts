import { renderHook, act } from '@testing-library/react';
import useArray from './use-array';

describe('useArray', () => {
    it('should initialize with default value', () => {
        const { result } = renderHook(() => useArray([1, 2, 3]));
        expect(result.current.array).toEqual([1, 2, 3]);
    });

    it('should push new elements', () => {
        const { result } = renderHook(() => useArray([1]));
        act(() => {
            result.current.push(2);
        });
        expect(result.current.array).toEqual([1, 2]);
    });

    it('should update element at index', () => {
        const { result } = renderHook(() => useArray([1, 2, 3]));
        act(() => {
            result.current.update(1, 4);
        });
        expect(result.current.array).toEqual([1, 4, 3]);
    });

    it('should remove element at index', () => {
        const { result } = renderHook(() => useArray([1, 2, 3]));
        act(() => {
            result.current.remove(1);
        });
        expect(result.current.array).toEqual([1, 3]);
    });

    it('should filter elements', () => {
        const { result } = renderHook(() => useArray([1, 2, 3, 4]));
        act(() => {
            result.current.filter(n => n > 2);
        });
        expect(result.current.array).toEqual([3, 4]);
    });

    it('should reset to default value', () => {
        const { result } = renderHook(() => useArray([1, 2]));
        act(() => {
            result.current.push(3);
            result.current.set();
        });
        expect(result.current.array).toEqual([1, 2]);
    });

    it('should clear all elements', () => {
        const { result } = renderHook(() => useArray([1, 2]));
        act(() => {
            result.current.clear();
        });
        expect(result.current.array).toEqual([]);
    });
});
