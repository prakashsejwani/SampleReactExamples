import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useMediaQuery } from './UseMediaQuery';

describe('useMediaQuery', () => {
    let matches: boolean;
    let listeners: Array<() => void>;

    beforeEach(() => {
        matches = false;
        listeners = [];
        vi.stubGlobal(
            'matchMedia',
            vi.fn((query: string) => ({
                get matches() {
                    return matches;
                },
                addEventListener: vi.fn((_event: string, listener: () => void) => {
                    listeners.push(listener);
                }),
                removeEventListener: vi.fn((_event: string, listener: () => void) => {
                    const i = listeners.indexOf(listener);
                    if (i !== -1) listeners.splice(i, 1);
                }),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }))
        );
    });

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it('should return the current match state', () => {
        matches = true;
        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
        expect(result.current).toBe(true);
    });

    it('should return false when query does not match', () => {
        matches = false;
        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
        expect(result.current).toBe(false);
    });

    it('should update when match state changes', () => {
        matches = false;
        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
        expect(result.current).toBe(false);

        act(() => {
            matches = true;
            listeners.forEach((listener) => listener({ matches: true } as MediaQueryListEvent));
        });
        expect(result.current).toBe(true);
    });

    it('should subscribe to matchMedia change events', () => {
        const { result } = renderHook(() => useMediaQuery('(max-width: 768px)'));
        expect(listeners.length).toBe(1);
    });

    it('should remove listener on unmount', () => {
        const removeEventListener = vi.fn();
        vi.stubGlobal(
            'matchMedia',
            vi.fn(() => ({
                get matches() {
                    return false;
                },
                addEventListener: vi.fn((_event: string, listener: () => void) => {
                    listeners.push(listener);
                }),
                removeEventListener,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }))
        );
        const { unmount } = renderHook(() => useMediaQuery('(max-width: 768px)'));
        unmount();
        expect(removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    });

    it('should pass the query string to matchMedia', () => {
        const matchMedia = vi.fn(() => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
        }));
        vi.stubGlobal('matchMedia', matchMedia);
        renderHook(() => useMediaQuery('only screen and (max-width: 768px)'));
        expect(matchMedia).toHaveBeenCalledWith('only screen and (max-width: 768px)');
    });
});
