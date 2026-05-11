'use client';

interface CoverProps {
  guestName: string;
  onOpen: () => void;
  coupleName: string;
  date: string;
  hashtag: string;
  coverImage: string;
}

export default function Cover({ guestName, onOpen, coupleName, date, hashtag, coverImage }: CoverProps) {
  return (
    <section className="cover" style={{ backgroundImage: `url('${coverImage}')` }}>
      <div className="overlay"></div>
      <div className="cover-content">
        <p className="cover-subtitle">Wedding Invitation</p>
        <h1 className="cover-title">{coupleName}</h1>
        <div className="cover-date">{date}</div>
        <div className="cover-hashtag">{hashtag}</div>
        <div className="cover-guest">
          <p>Dear,</p>
          <h2>{guestName}</h2>
        </div>
        <button className="btn-open" onClick={onOpen}>
          <i className="fas fa-envelope-open"></i> Buka Undangan
        </button>
      </div>
    </section>
  );
}
