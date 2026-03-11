import { renderHook, act } from '@testing-library/react';
import { useSet } from './UseSet';

describe('useSet', () => {
    it('should initialize with an empty set by default', () => {
        const { result } = renderHook(() => useSet<string>());
        expect(result.current.set.size).toBe(0);
    });

    it('should initialize with values from an array', () => {
        const { result } = renderHook(() => useSet(['a', 'b', 'c']));
        expect(result.current.set.size).toBe(3);
        expect(result.current.set.has('a')).toBe(true);
        expect(result.current.set.has('b')).toBe(true);
        expect(result.current.set.has('c')).toBe(true);
    });

    it('should initialize with values from a Set', () => {
        const { result } = renderHook(() => useSet(new Set([1, 2, 3])));
        expect(result.current.set.size).toBe(3);
        expect(result.current.set.has(1)).toBe(true);
    });

    it('should add an item', () => {
        const { result } = renderHook(() => useSet<string>());
        act(() => {
            result.current.add('hello');
        });
        expect(result.current.set.has('hello')).toBe(true);
        expect(result.current.set.size).toBe(1);
    });

    it('should not duplicate items when adding an existing item', () => {
        const { result } = renderHook(() => useSet(['hello']));
        const prevSet = result.current.set;
        act(() => {
            result.current.add('hello');
        });
        // Should return same reference (no state update)
        expect(result.current.set).toBe(prevSet);
        expect(result.current.set.size).toBe(1);
    });

    it('should remove an item', () => {
        const { result } = renderHook(() => useSet(['hello', 'world']));
        act(() => {
            result.current.remove('hello');
        });
        expect(result.current.set.has('hello')).toBe(false);
        expect(result.current.set.size).toBe(1);
    });

    it('should not update state when removing a non-existent item', () => {
        const { result } = renderHook(() => useSet(['hello']));
        const prevSet = result.current.set;
        act(() => {
            result.current.remove('world');
        });
        expect(result.current.set).toBe(prevSet);
    });

    it('should toggle an item on', () => {
        const { result } = renderHook(() => useSet<string>());
        act(() => {
            result.current.toggle('hello');
        });
        expect(result.current.set.has('hello')).toBe(true);
    });

    it('should toggle an item off', () => {
        const { result } = renderHook(() => useSet(['hello']));
        act(() => {
            result.current.toggle('hello');
        });
        expect(result.current.set.has('hello')).toBe(false);
    });

    it('should clear all items', () => {
        const { result } = renderHook(() => useSet(['a', 'b', 'c']));
        act(() => {
            result.current.clear();
        });
        expect(result.current.set.size).toBe(0);
    });

    it('should reset to initial state', () => {
        const { result } = renderHook(() => useSet(['a', 'b']));
        act(() => {
            result.current.add('c');
            result.current.remove('a');
        });
        act(() => {
            result.current.reset();
        });
        expect(result.current.set.size).toBe(2);
        expect(result.current.set.has('a')).toBe(true);
        expect(result.current.set.has('b')).toBe(true);
        expect(result.current.set.has('c')).toBe(false);
    });

    it('has() should return true for existing items', () => {
        const { result } = renderHook(() => useSet(['hello']));
        expect(result.current.has('hello')).toBe(true);
    });

    it('has() should return false for non-existing items', () => {
        const { result } = renderHook(() => useSet(['hello']));
        expect(result.current.has('world')).toBe(false);
    });
});
