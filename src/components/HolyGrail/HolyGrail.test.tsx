import { render, screen } from '@testing-library/react';
import HolyGrail from './HolyGrail';

describe('HolyGrail Component', () => {
    it('should render all semantic parts', () => {
        render(<HolyGrail />);
        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Navigation')).toBeInTheDocument();
        expect(screen.getByText('Main Content')).toBeInTheDocument();
        expect(screen.getByText('Sidebar')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });
});
