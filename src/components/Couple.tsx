'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface CoupleProps {
  data: {
    groomName: string;
    groomFullName: string;
    groomParents: string;
    groomPhoto: string;
    groomInstagram: string;
    brideName: string;
    brideFullName: string;
    brideParents: string;
    bridePhoto: string;
    brideInstagram: string;
  };
}

export default function Couple({ data }: CoupleProps) {
  return (
    <section className="couple section">
      <div className="container">
        <AnimateOnScroll className="couple-card" animation="fade-right">
          <div className="couple-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.bridePhoto} alt={data.brideName} />
          </div>
          <h2 className="couple-name">{data.brideFullName}</h2>
          <p className="couple-parents" dangerouslySetInnerHTML={{ __html: data.brideParents.replace(/\n/g, '<br />') }} />
          <div className="couple-social">
            <a href={data.brideInstagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="couple-separator" animation="zoom-in">
          <span className="ampersand">&</span>
        </AnimateOnScroll>

        <AnimateOnScroll className="couple-card" animation="fade-left">
          <div className="couple-photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.groomPhoto} alt={data.groomName} />
          </div>
          <h2 className="couple-name">{data.groomFullName}</h2>
          <p className="couple-parents" dangerouslySetInnerHTML={{ __html: data.groomParents.replace(/\n/g, '<br />') }} />
          <div className="couple-social">
            <a href={data.groomInstagram} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
