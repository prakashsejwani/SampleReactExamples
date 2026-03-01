import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DataTable from './DataTable';

describe('DataTable Component', () => {
    it('renders correctly', () => {
        render(<DataTable />);

        expect(screen.getByText('Users Data Table')).toBeInTheDocument();

        // Default show is 10, so 10 rows should be present. We can just check that Next and Previous buttons are in document
        const previousButton = screen.getByText('Previous');
        const nextButton = screen.getByText('Next');

        expect(previousButton).toBeInTheDocument();
        expect(nextButton).toBeInTheDocument();
    });

    it('can paginate when Next is clicked', () => {
        render(<DataTable />);

        const nextButton = screen.getByText('Next');
        expect(screen.getByText('Page 1 of 6')).toBeInTheDocument();

        fireEvent.click(nextButton);
        expect(screen.getByText('Page 2 of 6')).toBeInTheDocument();
    });
});
