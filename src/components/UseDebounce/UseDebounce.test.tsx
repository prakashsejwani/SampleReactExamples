import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import UseDebounceDemo from './UseDebounce';

describe('useDebounce Hook', () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('debounces input correctly', () => {
        render(<UseDebounceDemo />);

        const input = screen.getByPlaceholderText('Type something...');

        // Simulate typing
        fireEvent.change(input, { target: { value: 'h' } });
        fireEvent.change(input, { target: { value: 'he' } });
        fireEvent.change(input, { target: { value: 'hel' } });

        // The immediate value should be visible
        expect(screen.getByText('hel')).toHaveClass('immediate');

        // Currently the debounced string shouldn't have changed to 'hel' yet
        expect(screen.queryByText('hel', { selector: '.debounced' })).not.toBeInTheDocument();

        // Fast-forward time by 1000ms
        act(() => {
            vi.advanceTimersByTime(1000);
        });

        // Now the debounced should be 'hel'
        expect(screen.getByText('hel', { selector: '.debounced' })).toBeInTheDocument();
    });
});
