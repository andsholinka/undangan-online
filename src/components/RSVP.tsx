'use client';

import { useState, useEffect, FormEvent } from 'react';
import AnimateOnScroll from './AnimateOnScroll';

interface Wish {
  name: string;
  message: string;
  attendance: string;
  guests: string;
  timestamp: string;
}

export default function RSVP() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guests: '',
    message: '',
  });
  const [showToast, setShowToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch('/api/wishes')
      .then((res) => res.json())
      .then((data) => {
        setWishes([...data].reverse());
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.attendance) return;

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const newWish = await res.json();
        setWishes([newWish, ...wishes]);
        setFormData({ name: '', attendance: '', guests: '', message: '' });
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch {
      // silent fail
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section className="rsvp section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">RSVP</h2>
          <p className="rsvp-text">Konfirmasi kehadiran Anda</p>
        </AnimateOnScroll>

        <AnimateOnScroll>
          <form className="rsvp-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Nama Lengkap"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <select
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                required
              >
                <option value="">Konfirmasi Kehadiran</option>
                <option value="hadir">Insya Allah Hadir</option>
                <option value="tidak">Maaf, Tidak Bisa Hadir</option>
                <option value="ragu">Masih Ragu</option>
              </select>
            </div>
            <div className="form-group">
              <input
                type="number"
                placeholder="Jumlah Tamu"
                min="1"
                max="5"
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              />
            </div>
            <div className="form-group">
              <textarea
                placeholder="Ucapan & Doa untuk kedua mempelai..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              ></textarea>
            </div>
            <button type="submit" className="btn-submit" disabled={isSubmitting}>
              <i className="fas fa-paper-plane"></i>{' '}
              {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
            </button>
          </form>
        </AnimateOnScroll>

        {wishes.length > 0 && (
          <AnimateOnScroll className="wishes-container">
            <h3>Ucapan & Doa</h3>
            <div className="wishes-list">
              {wishes.filter((w) => w.message).map((wish, index) => (
                <div key={index} className="wish-item">
                  <div className="wish-name">{wish.name}</div>
                  <div className="wish-message">{wish.message}</div>
                  <div className="wish-time">{formatDate(wish.timestamp)}</div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        )}
      </div>

      {showToast && (
        <div className="toast">Terima kasih atas konfirmasi Anda! 🤍</div>
      )}
    </section>
  );
}
