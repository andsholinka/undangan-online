'use client';

interface SidebarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  initials: string;
}

const navItems = [
  { id: 'home', label: 'Home', icon: 'fas fa-home' },
  { id: 'mempelai', label: 'Mempelai', icon: 'fas fa-heart' },
  { id: 'acara', label: 'Acara', icon: 'fas fa-calendar' },
  { id: 'cerita', label: 'Our Story', icon: 'fas fa-book-open' },
  { id: 'galeri', label: 'Galeri', icon: 'fas fa-images' },
  { id: 'hadiah', label: 'Hadiah', icon: 'fas fa-gift' },
  { id: 'rsvp', label: 'RSVP', icon: 'fas fa-envelope' },
];

export default function Sidebar({ activeSection, onNavigate, initials }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <i className="fas fa-rings-wedding sidebar-logo-icon"></i>
        <span className="sidebar-logo-text">{initials}</span>
      </div>

      <nav className="sidebar-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <i className={item.icon}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-divider"></div>

      <div className="sidebar-playlist">
        <p className="sidebar-playlist-title">Wedding Playlist</p>
        <div className="sidebar-playlist-item">
          <div className="playlist-cover">
            <i className="fas fa-music"></i>
          </div>
          <div className="playlist-info">
            <span className="playlist-name">Our Song</span>
            <span className="playlist-artist">Wedding Day</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
