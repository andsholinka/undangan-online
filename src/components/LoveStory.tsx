'use client';

import AnimateOnScroll from './AnimateOnScroll';

const stories = [
  {
    title: 'Pertama Bertemu',
    date: 'Januari 2022',
    description:
      'Cinta kami adalah cerita tentang dua jiwa yang bertemu tanpa disengaja. Tidak ada yang menyangka, sebuah pertemuan biasa justru menjadi awal dari kisah luar biasa.',
    animation: 'fade-right' as const,
  },
  {
    title: 'Menjalin Hubungan',
    date: 'Juni 2022',
    description:
      'Dari obrolan ringan hingga diskusi mendalam, kami menemukan bahwa kami saling melengkapi. Setiap langkah dalam perjalanan takdir ini, telah membawa kami lebih dekat satu sama lain.',
    animation: 'fade-left' as const,
  },
  {
    title: 'Lamaran',
    date: 'Maret 2026',
    description:
      'Dengan penuh keberanian dan cinta, sebuah pertanyaan diajukan dan dijawab dengan penuh kebahagiaan. Kami siap memulai babak baru dalam hidup kami.',
    animation: 'fade-right' as const,
  },
  {
    title: 'Forever Starts Here',
    date: 'Agustus 2026',
    description:
      'Dengan penuh rasa syukur, kami ingin merayakan cinta kami di hari yang istimewa. Cinta yang sakral, cinta yang bermuara pada cinta-Nya.',
    animation: 'fade-left' as const,
  },
];

export default function LoveStory() {
  return (
    <section className="story section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Our Love Story</h2>
        </AnimateOnScroll>
        <div className="timeline">
          {stories.map((story, index) => (
            <AnimateOnScroll key={index} className="timeline-item" animation={story.animation}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <h3>{story.title}</h3>
                <span className="timeline-date">{story.date}</span>
                <p>{story.description}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
