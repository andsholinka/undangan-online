'use client';

import { useEffect, useRef } from 'react';

export default function Petals() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const colors = ['#F5E6B8', '#D4AF37', '#C4A882', '#f8e8d4', '#e8d5b7'];

    const createPetal = () => {
      const petal = document.createElement('div');
      petal.classList.add('petal');

      const size = Math.random() * 12 + 8;
      const left = Math.random() * 100;
      const duration = Math.random() * 8 + 6;
      const delay = Math.random() * 2;
      const color = colors[Math.floor(Math.random() * colors.length)];

      petal.style.width = size + 'px';
      petal.style.height = size + 'px';
      petal.style.left = left + '%';
      petal.style.background = color;
      petal.style.animationDuration = duration + 's';
      petal.style.animationDelay = delay + 's';
      petal.style.opacity = String(Math.random() * 0.5 + 0.2);

      container.appendChild(petal);

      setTimeout(() => {
        petal.remove();
      }, (duration + delay) * 1000);
    };

    // Create initial petals
    for (let i = 0; i < 10; i++) {
      setTimeout(createPetal, i * 600);
    }

    // Continuously create petals
    const interval = setInterval(createPetal, 3000);

    return () => {
      clearInterval(interval);
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

  return <div ref={containerRef} className="petals-container" />;
}
