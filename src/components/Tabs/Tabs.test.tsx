import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

describe('Tabs Component', () => {
    it('should render all tab buttons', () => {
        render(<Tabs />);
        expect(screen.getByRole('tab', { name: 'HTML' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'CSS' })).toBeInTheDocument();
        expect(screen.getByRole('tab', { name: 'JavaScript' })).toBeInTheDocument();
    });

    it('should show first tab content by default', () => {
        render(<Tabs />);
        expect(screen.getByText(/standard markup language/)).toBeInTheDocument();
    });

    it('should switch content when tab is clicked', () => {
        render(<Tabs />);
        const cssTab = screen.getByRole('tab', { name: 'CSS' });

        fireEvent.click(cssTab);
        expect(screen.getByText(/Cascading Style Sheets/)).toBeInTheDocument();
        expect(screen.queryByText(/standard markup language/)).not.toBeInTheDocument();

        expect(cssTab).toHaveClass('active');
        expect(screen.getByRole('tab', { name: 'HTML' })).not.toHaveClass('active');
    });
});
