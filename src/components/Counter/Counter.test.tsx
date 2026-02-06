import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter Component', () => {
    it('should render initial count of 0', () => {
        render(<Counter />);
        expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('should increment count when button is clicked', () => {
        render(<Counter />);
        const button = screen.getByText('Increment');
        fireEvent.click(button);
        expect(screen.getByText('1')).toBeInTheDocument();
        fireEvent.click(button);
        expect(screen.getByText('2')).toBeInTheDocument();
    });
});
