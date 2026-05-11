'use client';

interface MobileNavProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

const navItems = [
  { id: 'home', label: 'Home', icon: 'fas fa-home' },
  { id: 'mempelai', label: 'Mempelai', icon: 'fas fa-heart' },
  { id: 'acara', label: 'Acara', icon: 'fas fa-calendar' },
  { id: 'galeri', label: 'Galeri', icon: 'fas fa-images' },
  { id: 'rsvp', label: 'RSVP', icon: 'fas fa-envelope' },
];

export default function MobileNav({ activeSection, onNavigate }: MobileNavProps) {
  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <button
          key={item.id}
          className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
          onClick={() => onNavigate(item.id)}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
