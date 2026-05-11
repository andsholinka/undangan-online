'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Event() {
  return (
    <section className="event section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Acara Pernikahan</h2>
        </AnimateOnScroll>
        <div className="event-cards">
          {/* Akad */}
          <AnimateOnScroll className="event-card" animation="fade-right">
            <div className="event-icon">
              <i className="fas fa-mosque"></i>
            </div>
            <h3>Akad Nikah</h3>
            <div className="event-detail">
              <p><i className="far fa-calendar"></i> Minggu, 23 Agustus 2026</p>
              <p><i className="far fa-clock"></i> 08:00 - 10:00 WIB</p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>Masjid Al-Ikhlas<br />Jl. Mawar No. 10, Jakarta Selatan</span>
              </p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-maps">
              <i className="fas fa-map-marked-alt"></i> Lihat Lokasi
            </a>
          </AnimateOnScroll>

          {/* Resepsi */}
          <AnimateOnScroll className="event-card" animation="fade-left">
            <div className="event-icon">
              <i className="fas fa-glass-cheers"></i>
            </div>
            <h3>Resepsi</h3>
            <div className="event-detail">
              <p><i className="far fa-calendar"></i> Minggu, 23 Agustus 2026</p>
              <p><i className="far fa-clock"></i> 11:00 - 14:00 WIB</p>
              <p>
                <i className="fas fa-map-marker-alt"></i>
                <span>Gedung Serbaguna Melati<br />Jl. Melati No. 5, Jakarta Selatan</span>
              </p>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn-maps">
              <i className="fas fa-map-marked-alt"></i> Lihat Lokasi
            </a>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
