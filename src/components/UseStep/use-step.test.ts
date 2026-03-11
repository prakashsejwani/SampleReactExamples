import { renderHook, act } from '@testing-library/react';
import { useStep } from './UseStep';

describe('useStep', () => {
    // --- Initialization ---
    it('should initialize at step 0 by default', () => {
        const { result } = renderHook(() => useStep(4));
        expect(result.current.currentStep).toBe(0);
    });

    it('should initialize at a custom step', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: 2 }));
        expect(result.current.currentStep).toBe(2);
    });

    it('should clamp an out-of-range initialStep to 0', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: -5 }));
        expect(result.current.currentStep).toBe(0);
    });

    it('should clamp an out-of-range initialStep to maxStep', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: 99 }));
        expect(result.current.currentStep).toBe(3);
    });

    it('should expose the correct totalSteps', () => {
        const { result } = renderHook(() => useStep(5));
        expect(result.current.totalSteps).toBe(5);
    });

    // --- isFirst / isLast ---
    it('should be isFirst on step 0', () => {
        const { result } = renderHook(() => useStep(4));
        expect(result.current.isFirst).toBe(true);
        expect(result.current.isLast).toBe(false);
    });

    it('should be isLast on the final step', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: 3 }));
        expect(result.current.isFirst).toBe(false);
        expect(result.current.isLast).toBe(true);
    });

    it('should be neither isFirst nor isLast on a middle step', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: 2 }));
        expect(result.current.isFirst).toBe(false);
        expect(result.current.isLast).toBe(false);
    });

    // --- next() ---
    it('should advance to the next step', () => {
        const { result } = renderHook(() => useStep(4));
        act(() => { result.current.next(); });
        expect(result.current.currentStep).toBe(1);
    });

    it('should not advance past the last step', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: 3 }));
        act(() => { result.current.next(); });
        expect(result.current.currentStep).toBe(3);
    });

    // --- prev() ---
    it('should go back to the previous step', () => {
        const { result } = renderHook(() => useStep(4, { initialStep: 2 }));
        act(() => { result.current.prev(); });
        expect(result.current.currentStep).toBe(1);
    });

    it('should not go before step 0', () => {
        const { result } = renderHook(() => useStep(4));
        act(() => { result.current.prev(); });
        expect(result.current.currentStep).toBe(0);
    });

    // --- goTo() ---
    it('should jump to a specific step', () => {
        const { result } = renderHook(() => useStep(5));
        act(() => { result.current.goTo(3); });
        expect(result.current.currentStep).toBe(3);
    });

    it('should clamp goTo below 0 to step 0', () => {
        const { result } = renderHook(() => useStep(5, { initialStep: 2 }));
        act(() => { result.current.goTo(-1); });
        expect(result.current.currentStep).toBe(0);
    });

    it('should clamp goTo above max to last step', () => {
        const { result } = renderHook(() => useStep(5));
        act(() => { result.current.goTo(100); });
        expect(result.current.currentStep).toBe(4);
    });

    // --- reset() ---
    it('should reset to the initial step', () => {
        const { result } = renderHook(() => useStep(5, { initialStep: 2 }));
        act(() => { result.current.next(); result.current.next(); });
        act(() => { result.current.reset(); });
        expect(result.current.currentStep).toBe(2);
    });

    it('should reset to step 0 when no initialStep was given', () => {
        const { result } = renderHook(() => useStep(5));
        act(() => { result.current.next(); result.current.next(); });
        act(() => { result.current.reset(); });
        expect(result.current.currentStep).toBe(0);
    });
});
