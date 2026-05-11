'use client';

import AnimateOnScroll from './AnimateOnScroll';

interface LoveStoryProps {
  stories: { title: string; date: string; description: string }[];
}

export default function LoveStory({ stories }: LoveStoryProps) {
  const animations = ['fade-right', 'fade-left'] as const;

  return (
    <section className="story section">
      <div className="container">
        <AnimateOnScroll>
          <h2 className="section-title">Our Love Story</h2>
        </AnimateOnScroll>
        <div className="timeline">
          {stories.map((story, index) => (
            <AnimateOnScroll key={index} className="timeline-item" animation={animations[index % 2]}>
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
