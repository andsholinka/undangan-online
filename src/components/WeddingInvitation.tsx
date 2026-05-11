'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Cover from './Cover';
import Hero from './Hero';
import Bismillah from './Bismillah';
import Couple from './Couple';
import Countdown from './Countdown';
import Event from './Event';
import LoveStory from './LoveStory';
import Gallery from './Gallery';
import Gift from './Gift';
import RSVP from './RSVP';
import QuranVerse from './QuranVerse';
import Footer from './Footer';
import Petals from './Petals';
import MusicToggle from './MusicToggle';

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    // Try to play music
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        setIsPlaying(false);
      });
    }
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [isPlaying]);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <>
      {!isOpen && <Cover guestName={guestName} onOpen={handleOpen} />}

      {isOpen && (
        <main>
          <MusicToggle isPlaying={isPlaying} onToggle={toggleMusic} />
          <Hero />
          <Bismillah />
          <Couple />
          <Countdown targetDate="2026-08-23T08:00:00" />
          <Event />
          <LoveStory />
          <Gallery />
          <Gift />
          <RSVP />
          <QuranVerse />
          <Footer />
          <Petals />
        </main>
      )}

      <audio ref={audioRef} loop preload="auto">
        <source src="/api/music" type="audio/mpeg" />
      </audio>
    </>
  );
}
