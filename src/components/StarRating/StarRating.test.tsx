import { render, screen, fireEvent } from '@testing-library/react';
import StarRating from './StarRating';

describe('StarRating Component', () => {
    it('should render correct number of stars', () => {
        const { container } = render(<StarRating stars={7} />);
        const stars = container.querySelectorAll('.star-wrapper');
        expect(stars.length).toBe(7);
    });

    it('should change rating when a star is clicked', () => {
        const onChange = jest.fn();
        const { container } = render(<StarRating stars={5} onChange={onChange} />);
        const stars = container.querySelectorAll('.star-wrapper');

        fireEvent.click(stars[2]); // 3rd star
        expect(screen.getByText('3')).toBeInTheDocument();
        expect(onChange).toHaveBeenCalledWith(3);
    });

    it('should show hover state', () => {
        const { container } = render(<StarRating stars={5} initialRating={1} />);
        const stars = container.querySelectorAll('.star-wrapper');
        const firstStarSvg = stars[0].querySelector('svg');
        const thirdStarSvg = stars[2].querySelector('svg');

        expect(firstStarSvg).toHaveClass('star-icon-filled');
        expect(thirdStarSvg).not.toHaveClass('star-icon-filled');

        fireEvent.mouseEnter(stars[2]);
        expect(thirdStarSvg).toHaveClass('star-icon-filled');

        fireEvent.mouseLeave(container.querySelector('.stars-row')!);
        expect(thirdStarSvg).not.toHaveClass('star-icon-filled');
        expect(firstStarSvg).toHaveClass('star-icon-filled');
    });
});
