'use client';

import { useState } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

interface GiftProps {
  data: {
    accounts: { bank: string; logo: string; number: string; name: string }[];
    address: string;
  };
}

export default function Gift({ data }: GiftProps) {
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
          {data.accounts.map((acc, i) => (
            <AnimateOnScroll key={i} className="gift-card">
              {acc.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={acc.logo} alt={acc.bank} className="bank-logo" />
              )}
              <p className="account-number">{acc.number}</p>
              <p className="account-name">a.n. {acc.name}</p>
              <button className="btn-copy" onClick={() => copyToClipboard(acc.number)}>
                <i className={copiedText === acc.number ? 'fas fa-check' : 'far fa-copy'}></i>{' '}
                {copiedText === acc.number ? 'Tersalin!' : 'Salin'}
              </button>
            </AnimateOnScroll>
          ))}
        </div>

        {data.address && (
          <AnimateOnScroll className="gift-address">
            <h3><i className="fas fa-gift"></i> Kirim Hadiah</h3>
            <p dangerouslySetInnerHTML={{ __html: data.address.replace(/\n/g, '<br />') }} />
          </AnimateOnScroll>
        )}
      </div>
    </section>
  );
}
