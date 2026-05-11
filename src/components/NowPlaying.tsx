'use client';

import { useState, useEffect, useRef } from 'react';

interface NowPlayingProps {
  isPlaying: boolean;
  onToggle: () => void;
  coupleName: string;
}

export default function NowPlaying({ isPlaying, onToggle, coupleName }: NowPlayingProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const volumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = document.querySelector('audio');
    if (!audio) return;

    audio.volume = volume;

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleDurationChange = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('durationchange', handleDurationChange);

    if (audio.duration) setDuration(audio.duration);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('durationchange', handleDurationChange);
    };
  }, [volume]);

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = document.querySelector('audio');
    if (!audio || !progressRef.current) return;
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    audio.currentTime = percentage * duration;
  };

  const handleVolumeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = document.querySelector('audio');
    if (!audio || !volumeRef.current) return;
    const rect = volumeRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newVolume = Math.max(0, Math.min(1, clickX / rect.width));
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = document.querySelector('audio');
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.7;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) return 'fa-volume-mute';
    if (volume < 0.5) return 'fa-volume-down';
    return 'fa-volume-up';
  };

  return (
    <footer className="now-playing">
      <div className="np-info">
        <div className="np-cover">
          <i className="fas fa-heart"></i>
        </div>
        <div className="np-details">
          <span className="np-title">Wedding Song</span>
          <span className="np-artist">{coupleName}</span>
        </div>
      </div>

      <div className="np-controls">
        <div className="np-buttons">
          <button className="np-btn" aria-label="Previous">
            <i className="fas fa-step-backward"></i>
          </button>
          <button className="np-btn np-play" onClick={onToggle} aria-label={isPlaying ? 'Pause' : 'Play'}>
            <i className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'}`}></i>
          </button>
          <button className="np-btn" aria-label="Next">
            <i className="fas fa-step-forward"></i>
          </button>
        </div>
        <div className="np-progress">
          <span className="np-time">{formatTime(currentTime)}</span>
          <div className="np-bar" ref={progressRef} onClick={handleProgressClick}>
            <div className="np-bar-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <span className="np-time">{formatTime(duration)}</span>
        </div>
      </div>

      <div className="np-volume">
        <button className="np-btn" onClick={toggleMute} aria-label="Volume">
          <i className={`fas ${getVolumeIcon()}`}></i>
        </button>
        <div className="np-volume-bar" ref={volumeRef} onClick={handleVolumeClick}>
          <div className="np-volume-fill" style={{ width: `${isMuted ? 0 : volume * 100}%` }}></div>
        </div>
      </div>
    </footer>
  );
}
