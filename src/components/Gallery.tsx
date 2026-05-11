'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface GalleryProps {
  photos: string[];
}

export default function Gallery({ photos }: GalleryProps) {
  return (
    <section className="gallery section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Our Gallery</h2>
        </AnimateOnScroll>
        <div className="gallery-grid">
          {photos.map((photo, index) => (
            <AnimateOnScroll
              key={index}
              className="gallery-item"
              animation="zoom-in"
              delay={index * 80}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo} alt={`Gallery ${index + 1}`} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
