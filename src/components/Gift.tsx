'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

export default function Gift() {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2500);
    }).catch(() => {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedText(text);
      setTimeout(() => setCopiedText(''), 2500);
    });
  };

  return (
    <section className="gift section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Wedding Gift</h2>
          <p className="gift-text">
            Bagi keluarga dan sahabat yang ingin mengirimkan hadiah, kami akan dengan senang hati menerimanya.
          </p>
        </AnimateOnScroll>

        <div className="gift-cards">
          <AnimateOnScroll className="gift-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg"
              alt="BCA"
              className="bank-logo"
            />
            <p className="account-number">1234567890</p>
            <p className="account-name">a.n. Nauval</p>
            <button className="btn-copy" onClick={() => copyToClipboard('1234567890')}>
              <i className={copiedText === '1234567890' ? 'fas fa-check' : 'far fa-copy'}></i>{' '}
              {copiedText === '1234567890' ? 'Tersalin!' : 'Salin'}
            </button>
          </AnimateOnScroll>

          <AnimateOnScroll className="gift-card">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg"
              alt="Mandiri"
              className="bank-logo"
            />
            <p className="account-number">0987654321</p>
            <p className="account-name">a.n. Azizah</p>
            <button className="btn-copy" onClick={() => copyToClipboard('0987654321')}>
              <i className={copiedText === '0987654321' ? 'fas fa-check' : 'far fa-copy'}></i>{' '}
              {copiedText === '0987654321' ? 'Tersalin!' : 'Salin'}
            </button>
          </AnimateOnScroll>
        </div>

        <AnimateOnScroll className="gift-address">
          <h3><i className="fas fa-gift"></i> Kirim Hadiah</h3>
          <p>
            Jl. Mawar No. 10, RT 02/RW 03<br />
            Kel. Melati, Kec. Indah<br />
            Jakarta Selatan, 12345
          </p>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
