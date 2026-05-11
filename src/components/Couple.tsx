'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Couple() {
  return (
    <section className="couple section">
      <div className="container">
        {/* Bride */}
        <AnimateOnScroll className="couple-card" animation="fade-right">
          <div className="couple-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=400&fit=crop&crop=face"
              alt="Mempelai Wanita"
            />
          </div>
          <h2 className="couple-name">Azizah</h2>
          <p className="couple-parents">
            Putri dari<br />
            Bapak ...<br />
            &<br />
            Ibu ...
          </p>
          <div className="couple-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="couple-separator" animation="zoom-in">
          <span className="ampersand">&</span>
        </AnimateOnScroll>

        {/* Groom */}
        <AnimateOnScroll className="couple-card" animation="fade-left">
          <div className="couple-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
              alt="Mempelai Pria"
            />
          </div>
          <h2 className="couple-name">Nauval</h2>
          <p className="couple-parents">
            Putra dari<br />
            Bapak ...<br />
            &<br />
            Ibu ...
          </p>
          <div className="couple-social">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
