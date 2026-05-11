'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function Bismillah() {
  return (
    <section className="bismillah section">
      <AnimateOnScroll className="container">
        <div className="bismillah-text">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
        <p className="bismillah-translation">
          Dengan menyebut nama Allah Yang Maha Pengasih lagi Maha Penyayang
        </p>
        <p className="invitation-text">
          Dengan memohon Rahmat dan Ridho Allah SWT.<br />
          Kami bermaksud untuk menyelenggarakan<br />
          acara pernikahan kami:
        </p>
      </AnimateOnScroll>
    </section>
  );
}
