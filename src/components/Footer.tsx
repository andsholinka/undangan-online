'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface FooterProps {
  coupleName: string;
  hashtag: string;
}

export default function Footer({ coupleName, hashtag }: FooterProps) {
  return (
    <footer className="footer">
      <AnimateOnScroll className="container">
        <h2 className="footer-title">Thank You</h2>
        <p className="footer-names">{coupleName}</p>
        <div className="footer-hashtag">{hashtag}</div>
        <p className="footer-credit">
          Made with <i className="fas fa-heart"></i>
        </p>
      </AnimateOnScroll>
    </footer>
  );
}
