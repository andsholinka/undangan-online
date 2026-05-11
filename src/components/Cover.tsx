'use client';

interface CoverProps {
  guestName: string;
  onOpen: () => void;
}

export default function Cover({ guestName, onOpen }: CoverProps) {
  return (
    <section className="cover">
      <div className="overlay"></div>
      <div className="cover-content">
        <p className="cover-subtitle">Wedding Invitation</p>
        <h1 className="cover-title">Nauval & Azizah</h1>
        <div className="cover-date">23 Agustus 2026</div>
        <div className="cover-hashtag">#NauvalAzizahForever</div>
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
