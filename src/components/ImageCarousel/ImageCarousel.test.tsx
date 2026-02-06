import { render, screen, fireEvent } from '@testing-library/react';
import ImageCarousel from './ImageCarousel';

const IMAGES = [
    { src: 'img1.jpg', alt: 'Alt 1' },
    { src: 'img2.jpg', alt: 'Alt 2' },
    { src: 'img3.jpg', alt: 'Alt 3' },
];

describe('ImageCarousel Component', () => {
    it('should render the first image initially', () => {
        render(<ImageCarousel images={IMAGES} />);
        const img = screen.getByRole('img');
        expect(img).toHaveAttribute('src', 'img1.jpg');
        expect(img).toHaveAttribute('alt', 'Alt 1');
    });

    it('should go to next image', () => {
        render(<ImageCarousel images={IMAGES} />);
        const nextBtn = screen.getByLabelText('Next image');

        fireEvent.click(nextBtn);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'img2.jpg');
    });

    it('should wrap around from last to first', () => {
        render(<ImageCarousel images={IMAGES} />);
        const nextBtn = screen.getByLabelText('Next image');

        fireEvent.click(nextBtn); // 2
        fireEvent.click(nextBtn); // 3
        fireEvent.click(nextBtn); // back to 1

        expect(screen.getByRole('img')).toHaveAttribute('src', 'img1.jpg');
    });

    it('should jump to image from pagination dot', () => {
        render(<ImageCarousel images={IMAGES} />);
        const dot3 = screen.getByLabelText('Go to image 3');

        fireEvent.click(dot3);
        expect(screen.getByRole('img')).toHaveAttribute('src', 'img3.jpg');
        expect(dot3).toHaveClass('active');
    });
});
