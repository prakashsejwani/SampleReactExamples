import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UseClickAnywhereDemo from './UseClickAnywhere';

describe('useClickAnywhere Hook', () => {
    it('increments global click counter', () => {
        render(<UseClickAnywhereDemo />);

        const countDisplay = screen.getByText('0', { selector: '.count-value' });
        expect(countDisplay).toBeInTheDocument();

        // Fire click event on document body
        fireEvent.click(document.body);

        const updatedCountDisplay = screen.getByText('1', { selector: '.count-value' });
        expect(updatedCountDisplay).toBeInTheDocument();
    });
});
