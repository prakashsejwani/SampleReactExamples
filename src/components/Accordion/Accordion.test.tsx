import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

describe('Accordion Component', () => {
    it('should render all titles', () => {
        render(<Accordion />);
        expect(screen.getByText('HTML')).toBeInTheDocument();
        expect(screen.getByText('CSS')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
    });

    it('should toggle content when title is clicked', () => {
        render(<Accordion />);
        const htmlTitle = screen.getByText('HTML');
        const htmlContent = screen.getByText(/standard markup language/);

        // Initially closed (or hidden via CSS, but let's check class)
        expect(htmlContent.closest('.accordion-content')).not.toHaveClass('open');

        // Click to open
        fireEvent.click(htmlTitle);
        expect(htmlContent.closest('.accordion-content')).toHaveClass('open');

        // Click to close
        fireEvent.click(htmlTitle);
        expect(htmlContent.closest('.accordion-content')).not.toHaveClass('open');
    });

    it('should only have one item open at a time', () => {
        render(<Accordion />);
        const htmlTitle = screen.getByText('HTML');
        const cssTitle = screen.getByText('CSS');

        fireEvent.click(htmlTitle);
        expect(screen.getByText(/standard markup language/).closest('.accordion-content')).toHaveClass('open');

        fireEvent.click(cssTitle);
        expect(screen.getByText(/standard markup language/).closest('.accordion-content')).not.toHaveClass('open');
        expect(screen.getByText(/Cascading Style Sheets/).closest('.accordion-content')).toHaveClass('open');
    });
});
