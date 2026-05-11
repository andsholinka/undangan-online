'use client';

import AnimateOnScroll from './AnimateOnScroll';

export default function QuranVerse() {
  return (
    <section className="quran section">
      <AnimateOnScroll className="container">
        <div className="quran-verse">
          <p className="arabic">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً
          </p>
          <p className="translation">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan
            untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia
            menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>
          <p className="reference">— QS. Ar-Rum: 21</p>
        </div>
      </AnimateOnScroll>
    </section>
  );
}
