'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface HeroProps {
  coupleName: string;
  date: string;
  heroImage: string;
}

export default function Hero({ coupleName, date, heroImage }: HeroProps) {
  return (
    <section className="hero" style={{ backgroundImage: `url('${heroImage}')` }}>
      <div className="hero-overlay"></div>
      <AnimateOnScroll className="hero-content">
        <p className="section-subtitle">The Wedding Of</p>
        <h1 className="hero-names">{coupleName}</h1>
        <p className="hero-date">{date}</p>
        <div className="hero-divider">
          <span></span>
          <i className="fas fa-heart"></i>
          <span></span>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
