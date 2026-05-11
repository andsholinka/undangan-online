'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <AnimateOnScroll className="hero-content">
        <p className="section-subtitle">The Wedding Of</p>
        <h1 className="hero-names">Nauval & Azizah</h1>
        <p className="hero-date">Minggu, 23 Agustus 2026</p>
        <div className="hero-divider">
          <span></span>
          <i className="fas fa-heart"></i>
          <span></span>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
