'use client';

import AnimateOnScroll from './AnimateOnScroll';

const photos = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1529636798458-92182e662485?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=400&fit=crop',
];

export default function Gallery() {
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
              delay={index * 100}
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
