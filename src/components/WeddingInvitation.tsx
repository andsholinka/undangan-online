'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Cover from './Cover';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';
import NowPlaying from './NowPlaying';
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

export interface ContentData {
  couple: {
    groomName: string;
    groomFullName: string;
    groomParents: string;
    groomPhoto: string;
    groomInstagram: string;
    brideName: string;
    brideFullName: string;
    brideParents: string;
    bridePhoto: string;
    brideInstagram: string;
  };
  event: {
    date: string;
    displayDate: string;
    hashtag: string;
    akad: { time: string; venue: string; address: string; mapsUrl: string };
    resepsi: { time: string; venue: string; address: string; mapsUrl: string };
  };
  story: { title: string; date: string; description: string }[];
  gallery: string[];
  gift: {
    accounts: { bank: string; logo: string; number: string; name: string }[];
    address: string;
  };
  images: {
    cover: string;
    hero: string;
  };
}

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [content, setContent] = useState<ContentData | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const guestName = searchParams.get('to') || 'Tamu Undangan';

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => {});
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
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

  const scrollToSection = useCallback((sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const main = mainRef.current;
    if (!main) return;

    const sections = ['home', 'mempelai', 'acara', 'cerita', 'galeri', 'hadiah', 'rsvp'];

    const handleScroll = () => {
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom > 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    main.addEventListener('scroll', handleScroll);
    return () => main.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  if (!content) return null;

  const coupleDisplay = `${content.couple.groomName} & ${content.couple.brideName}`;

  return (
    <>
      {!isOpen && (
        <Cover
          guestName={guestName}
          onOpen={handleOpen}
          coupleName={coupleDisplay}
          date={content.event.displayDate}
          hashtag={content.event.hashtag}
          coverImage={content.images.cover}
        />
      )}

      {isOpen && (
        <div className="app-layout">
          <Sidebar activeSection={activeSection} onNavigate={scrollToSection} initials={`${content.couple.groomName.charAt(0)} & ${content.couple.brideName.charAt(0)}`} />
          <div className="main-content" ref={mainRef}>
            <div id="home">
              <Hero
                coupleName={coupleDisplay}
                date={content.event.displayDate}
                heroImage={content.images.hero}
              />
            </div>
            <div id="bismillah"><Bismillah /></div>
            <div id="mempelai">
              <Couple data={content.couple} />
            </div>
            <div id="countdown">
              <Countdown targetDate={content.event.date} />
            </div>
            <div id="acara">
              <Event data={content.event} />
            </div>
            <div id="cerita">
              <LoveStory stories={content.story} />
            </div>
            <div id="galeri">
              <Gallery photos={content.gallery} />
            </div>
            <div id="hadiah">
              <Gift data={content.gift} />
            </div>
            <div id="rsvp"><RSVP /></div>
            <div id="quran"><QuranVerse /></div>
            <Footer coupleName={coupleDisplay} hashtag={content.event.hashtag} />
          </div>
          <NowPlaying isPlaying={isPlaying} onToggle={toggleMusic} coupleName={coupleDisplay} />
          <MobileNav activeSection={activeSection} onNavigate={scrollToSection} />
        </div>
      )}

      <audio ref={audioRef} loop preload="auto">
        <source src="/api/music" type="audio/mpeg" />
      </audio>
    </>
  );
}
