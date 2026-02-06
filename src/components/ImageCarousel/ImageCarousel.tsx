import { useState } from "react";
import './ImageCarousel.scss';

interface ImageItem {
  src: string;
  alt: string;
}

export default function ImageCarousel({
  images,
}: {
  images: ReadonlyArray<ImageItem>;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = images.length;

  const goPrev = () => setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const goNext = () => setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));

  return (
    <div className="carousel-container">
      <div className="image-stage">
        <img
          key={images[currentIndex].src}
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
        />

        <button className="nav-btn prev" onClick={goPrev} aria-label="Previous image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button className="nav-btn next" onClick={goNext} aria-label="Next image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="carousel-footer">
        <div className="pagination">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
