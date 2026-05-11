'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Footer() {
  return (
    <footer className="footer">
      <AnimateOnScroll className="container">
        <h2 className="footer-title">Thank You</h2>
        <p className="footer-names">Nauval & Azizah</p>
        <div className="footer-hashtag">#NauvalAzizahForever</div>
        <p className="footer-credit">
          Made with <i className="fas fa-heart"></i>
        </p>
      </AnimateOnScroll>
    </footer>
  );
}
