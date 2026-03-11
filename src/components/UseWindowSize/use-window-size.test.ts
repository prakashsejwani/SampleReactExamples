import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useWindowSize } from './UseWindowSize';

describe('useWindowSize', () => {
    const setWindowDimensions = (width: number, height: number) => {
        Object.defineProperty(window, 'innerWidth', { value: width, writable: true, configurable: true });
        Object.defineProperty(window, 'innerHeight', { value: height, writable: true, configurable: true });
    };

    const triggerResize = () => {
        act(() => {
            window.dispatchEvent(new Event('resize'));
        });
    };

    beforeEach(() => {
        setWindowDimensions(1024, 768);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('should return current window width and height', () => {
        const { result } = renderHook(() => useWindowSize());
        expect(result.current).toEqual({ width: 1024, height: 768 });
    });

    it('should return an object with height and width as numbers', () => {
        setWindowDimensions(800, 600);
        const { result } = renderHook(() => useWindowSize());
        expect(result.current).toHaveProperty('height', 600);
        expect(result.current).toHaveProperty('width', 800);
        expect(typeof result.current.height).toBe('number');
        expect(typeof result.current.width).toBe('number');
    });

    it('should update when window is resized', () => {
        const { result } = renderHook(() => useWindowSize());
        expect(result.current).toEqual({ width: 1024, height: 768 });

        setWindowDimensions(400, 300);
        triggerResize();

        expect(result.current).toEqual({ width: 400, height: 300 });
    });

    it('should remove resize listener on unmount', () => {
        const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { unmount } = renderHook(() => useWindowSize());
        unmount();
        expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
        removeEventListenerSpy.mockRestore();
    });
});
