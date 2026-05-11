'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface EventProps {
  data: {
    displayDate: string;
    akad: { time: string; venue: string; address: string; mapsUrl: string };
    resepsi: { time: string; venue: string; address: string; mapsUrl: string };
  };
}

export default function Event({ data }: EventProps) {
  return (
    <section className="event section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Acara Pernikahan</h2>
        </AnimateOnScroll>
        <div className="event-cards">
          <AnimateOnScroll className="event-card" animation="fade-right">
            <div className="event-icon">
              <i className="fas fa-mosque"></i>
            </div>
            <h3>Akad Nikah</h3>
            <div className="event-detail">
              <p><i className="far fa-calendar"></i> {data.displayDate}</p>
              <p><i className="far fa-clock"></i> {data.akad.time}</p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>{data.akad.venue}<br />{data.akad.address}</span>
              </p>
            </div>
            <a href={data.akad.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-maps">
              <i className="fas fa-map-marked-alt"></i> Lihat Lokasi
            </a>
          </AnimateOnScroll>

          <AnimateOnScroll className="event-card" animation="fade-left">
            <div className="event-icon">
              <i className="fas fa-glass-cheers"></i>
            </div>
            <h3>Resepsi</h3>
            <div className="event-detail">
              <p><i className="far fa-calendar"></i> {data.displayDate}</p>
              <p><i className="far fa-clock"></i> {data.resepsi.time}</p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>{data.resepsi.venue}<br />{data.resepsi.address}</span>
              </p>
            </div>
            <a href={data.resepsi.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-maps">
              <i className="fas fa-map-marked-alt"></i> Lihat Lokasi
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
