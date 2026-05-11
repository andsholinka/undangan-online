'use client';

interface MusicToggleProps {
  isPlaying: boolean;
  onToggle: () => void;
}

export default function MusicToggle({ isPlaying, onToggle }: MusicToggleProps) {
  return (
    <button
      className={`music-toggle ${isPlaying ? 'playing' : ''}`}
      onClick={onToggle}
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-music'}`}></i>
    </button>
  );
}
