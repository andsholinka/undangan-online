'use client';

import { useState, useEffect } from 'react';
import './admin.css';

interface StoryItem {
  title: string;
  date: string;
  description: string;
}

interface GiftAccount {
  bank: string;
  logo: string;
  number: string;
  name: string;
}

interface ContentData {
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
  story: StoryItem[];
  gallery: string[];
  gift: {
    accounts: GiftAccount[];
    address: string;
  };
  images: {
    cover: string;
    hero: string;
  };
}

export default function AdminPage() {
  const [content, setContent] = useState<ContentData | null>(null);
  const [activeTab, setActiveTab] = useState('couple');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => setMessage('Gagal memuat data'));
  }, []);

  const save = async () => {
    if (!content) return;
    setSaving(true);
    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });
      if (res.ok) {
        setMessage('✓ Tersimpan!');
      } else {
        setMessage('✗ Gagal menyimpan');
      }
    } catch {
      setMessage('✗ Error');
    }
    setSaving(false);
    setTimeout(() => setMessage(''), 3000);
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
    } catch {}
    return null;
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    callback: (url: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMessage('Uploading...');
    const url = await uploadImage(file);
    if (url) {
      callback(url);
      setMessage('✓ Upload berhasil!');
    } else {
      setMessage('✗ Upload gagal');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  if (!content) return <div className="admin-loading">Loading...</div>;

  const tabs = [
    { id: 'couple', label: 'Mempelai', icon: '💑' },
    { id: 'event', label: 'Acara', icon: '📅' },
    { id: 'story', label: 'Love Story', icon: '💕' },
    { id: 'gallery', label: 'Galeri', icon: '🖼️' },
    { id: 'gift', label: 'Hadiah', icon: '🎁' },
    { id: 'images', label: 'Background', icon: '🎨' },
  ];

  return (
    <div className="admin">
      <header className="admin-header">
        <h1>💍 Wedding CMS</h1>
        <div className="admin-actions">
          {message && <span className="admin-message">{message}</span>}
          <button className="btn-save" onClick={save} disabled={saving}>
            {saving ? 'Menyimpan...' : 'Simpan'}
          </button>
          <a href="/" className="btn-preview" target="_blank">Preview</a>
        </div>
      </header>

      <div className="admin-body">
        <nav className="admin-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        <main className="admin-content">
          {activeTab === 'couple' && (
            <CoupleEditor content={content} setContent={setContent} onUpload={handleImageUpload} />
          )}
          {activeTab === 'event' && (
            <EventEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'story' && (
            <StoryEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'gallery' && (
            <GalleryEditor content={content} setContent={setContent} onUpload={handleImageUpload} />
          )}
          {activeTab === 'gift' && (
            <GiftEditor content={content} setContent={setContent} />
          )}
          {activeTab === 'images' && (
            <ImagesEditor content={content} setContent={setContent} onUpload={handleImageUpload} />
          )}
        </main>
      </div>
    </div>
  );
}

// ===== COUPLE EDITOR =====
function CoupleEditor({ content, setContent, onUpload }: {
  content: ContentData;
  setContent: (c: ContentData) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
}) {
  const update = (field: string, value: string) => {
    setContent({ ...content, couple: { ...content.couple, [field]: value } });
  };

  return (
    <div className="editor-section">
      <h2>Mempelai Pria</h2>
      <div className="form-row">
        <label>Nama Panggilan</label>
        <input value={content.couple.groomName} onChange={(e) => update('groomName', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Nama Lengkap</label>
        <input value={content.couple.groomFullName} onChange={(e) => update('groomFullName', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Orang Tua</label>
        <textarea value={content.couple.groomParents} onChange={(e) => update('groomParents', e.target.value)} rows={3} />
      </div>
      <div className="form-row">
        <label>Foto</label>
        <div className="image-upload">
          {content.couple.groomPhoto && <img src={content.couple.groomPhoto} alt="Groom" />}
          <input type="file" accept="image/*" onChange={(e) => onUpload(e, (url) => update('groomPhoto', url))} />
        </div>
      </div>
      <div className="form-row">
        <label>Instagram URL</label>
        <input value={content.couple.groomInstagram} onChange={(e) => update('groomInstagram', e.target.value)} />
      </div>

      <h2>Mempelai Wanita</h2>
      <div className="form-row">
        <label>Nama Panggilan</label>
        <input value={content.couple.brideName} onChange={(e) => update('brideName', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Nama Lengkap</label>
        <input value={content.couple.brideFullName} onChange={(e) => update('brideFullName', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Orang Tua</label>
        <textarea value={content.couple.brideParents} onChange={(e) => update('brideParents', e.target.value)} rows={3} />
      </div>
      <div className="form-row">
        <label>Foto</label>
        <div className="image-upload">
          {content.couple.bridePhoto && <img src={content.couple.bridePhoto} alt="Bride" />}
          <input type="file" accept="image/*" onChange={(e) => onUpload(e, (url) => update('bridePhoto', url))} />
        </div>
      </div>
      <div className="form-row">
        <label>Instagram URL</label>
        <input value={content.couple.brideInstagram} onChange={(e) => update('brideInstagram', e.target.value)} />
      </div>
    </div>
  );
}

// ===== EVENT EDITOR =====
function EventEditor({ content, setContent }: { content: ContentData; setContent: (c: ContentData) => void }) {
  const updateEvent = (field: string, value: string) => {
    setContent({ ...content, event: { ...content.event, [field]: value } });
  };
  const updateAkad = (field: string, value: string) => {
    setContent({ ...content, event: { ...content.event, akad: { ...content.event.akad, [field]: value } } });
  };
  const updateResepsi = (field: string, value: string) => {
    setContent({ ...content, event: { ...content.event, resepsi: { ...content.event.resepsi, [field]: value } } });
  };

  return (
    <div className="editor-section">
      <h2>Info Umum</h2>
      <div className="form-row">
        <label>Tanggal (ISO)</label>
        <input value={content.event.date} onChange={(e) => updateEvent('date', e.target.value)} placeholder="2026-08-23T08:00:00" />
      </div>
      <div className="form-row">
        <label>Tanggal Tampil</label>
        <input value={content.event.displayDate} onChange={(e) => updateEvent('displayDate', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Hashtag</label>
        <input value={content.event.hashtag} onChange={(e) => updateEvent('hashtag', e.target.value)} />
      </div>

      <h2>Akad Nikah</h2>
      <div className="form-row">
        <label>Waktu</label>
        <input value={content.event.akad.time} onChange={(e) => updateAkad('time', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Tempat</label>
        <input value={content.event.akad.venue} onChange={(e) => updateAkad('venue', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Alamat</label>
        <input value={content.event.akad.address} onChange={(e) => updateAkad('address', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Google Maps URL</label>
        <input value={content.event.akad.mapsUrl} onChange={(e) => updateAkad('mapsUrl', e.target.value)} />
      </div>

      <h2>Resepsi</h2>
      <div className="form-row">
        <label>Waktu</label>
        <input value={content.event.resepsi.time} onChange={(e) => updateResepsi('time', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Tempat</label>
        <input value={content.event.resepsi.venue} onChange={(e) => updateResepsi('venue', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Alamat</label>
        <input value={content.event.resepsi.address} onChange={(e) => updateResepsi('address', e.target.value)} />
      </div>
      <div className="form-row">
        <label>Google Maps URL</label>
        <input value={content.event.resepsi.mapsUrl} onChange={(e) => updateResepsi('mapsUrl', e.target.value)} />
      </div>
    </div>
  );
}

// ===== STORY EDITOR =====
function StoryEditor({ content, setContent }: { content: ContentData; setContent: (c: ContentData) => void }) {
  const updateStory = (index: number, field: string, value: string) => {
    const newStory = [...content.story];
    newStory[index] = { ...newStory[index], [field]: value };
    setContent({ ...content, story: newStory });
  };

  const addStory = () => {
    setContent({ ...content, story: [...content.story, { title: '', date: '', description: '' }] });
  };

  const removeStory = (index: number) => {
    setContent({ ...content, story: content.story.filter((_, i) => i !== index) });
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h2>Love Story Timeline</h2>
        <button className="btn-add" onClick={addStory}>+ Tambah</button>
      </div>
      {content.story.map((item, i) => (
        <div key={i} className="card-editor">
          <div className="card-editor-header">
            <span>#{i + 1}</span>
            <button className="btn-remove" onClick={() => removeStory(i)}>✕</button>
          </div>
          <div className="form-row">
            <label>Judul</label>
            <input value={item.title} onChange={(e) => updateStory(i, 'title', e.target.value)} />
          </div>
          <div className="form-row">
            <label>Tanggal</label>
            <input value={item.date} onChange={(e) => updateStory(i, 'date', e.target.value)} />
          </div>
          <div className="form-row">
            <label>Deskripsi</label>
            <textarea value={item.description} onChange={(e) => updateStory(i, 'description', e.target.value)} rows={3} />
          </div>
        </div>
      ))}
    </div>
  );
}

// ===== GALLERY EDITOR =====
function GalleryEditor({ content, setContent, onUpload }: {
  content: ContentData;
  setContent: (c: ContentData) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
}) {
  const removePhoto = (index: number) => {
    setContent({ ...content, gallery: content.gallery.filter((_, i) => i !== index) });
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h2>Galeri Foto</h2>
        <label className="btn-add">
          + Upload Foto
          <input
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => onUpload(e, (url) => setContent({ ...content, gallery: [...content.gallery, url] }))}
          />
        </label>
      </div>
      <div className="gallery-editor-grid">
        {content.gallery.map((url, i) => (
          <div key={i} className="gallery-editor-item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt={`Gallery ${i + 1}`} />
            <button className="btn-remove-overlay" onClick={() => removePhoto(i)}>✕</button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===== GIFT EDITOR =====
function GiftEditor({ content, setContent }: { content: ContentData; setContent: (c: ContentData) => void }) {
  const updateAccount = (index: number, field: string, value: string) => {
    const newAccounts = [...content.gift.accounts];
    newAccounts[index] = { ...newAccounts[index], [field]: value };
    setContent({ ...content, gift: { ...content.gift, accounts: newAccounts } });
  };

  const addAccount = () => {
    setContent({
      ...content,
      gift: { ...content.gift, accounts: [...content.gift.accounts, { bank: '', logo: '', number: '', name: '' }] },
    });
  };

  const removeAccount = (index: number) => {
    setContent({
      ...content,
      gift: { ...content.gift, accounts: content.gift.accounts.filter((_, i) => i !== index) },
    });
  };

  return (
    <div className="editor-section">
      <div className="section-header">
        <h2>Rekening</h2>
        <button className="btn-add" onClick={addAccount}>+ Tambah</button>
      </div>
      {content.gift.accounts.map((acc, i) => (
        <div key={i} className="card-editor">
          <div className="card-editor-header">
            <span>{acc.bank || `Rekening #${i + 1}`}</span>
            <button className="btn-remove" onClick={() => removeAccount(i)}>✕</button>
          </div>
          <div className="form-row">
            <label>Nama Bank</label>
            <input value={acc.bank} onChange={(e) => updateAccount(i, 'bank', e.target.value)} />
          </div>
          <div className="form-row">
            <label>Nomor Rekening</label>
            <input value={acc.number} onChange={(e) => updateAccount(i, 'number', e.target.value)} />
          </div>
          <div className="form-row">
            <label>Atas Nama</label>
            <input value={acc.name} onChange={(e) => updateAccount(i, 'name', e.target.value)} />
          </div>
        </div>
      ))}

      <h2>Alamat Kirim Hadiah</h2>
      <div className="form-row">
        <label>Alamat</label>
        <textarea
          value={content.gift.address}
          onChange={(e) => setContent({ ...content, gift: { ...content.gift, address: e.target.value } })}
          rows={4}
        />
      </div>
    </div>
  );
}

// ===== IMAGES EDITOR =====
function ImagesEditor({ content, setContent, onUpload }: {
  content: ContentData;
  setContent: (c: ContentData) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>, cb: (url: string) => void) => void;
}) {
  const updateImage = (field: string, value: string) => {
    setContent({ ...content, images: { ...content.images, [field]: value } });
  };

  return (
    <div className="editor-section">
      <h2>Background Images</h2>
      <div className="form-row">
        <label>Cover (halaman pembuka)</label>
        <div className="image-upload large">
          {content.images.cover && <img src={content.images.cover} alt="Cover" />}
          <input type="file" accept="image/*" onChange={(e) => onUpload(e, (url) => updateImage('cover', url))} />
        </div>
      </div>
      <div className="form-row">
        <label>Hero (header utama)</label>
        <div className="image-upload large">
          {content.images.hero && <img src={content.images.hero} alt="Hero" />}
          <input type="file" accept="image/*" onChange={(e) => onUpload(e, (url) => updateImage('hero', url))} />
        </div>
      </div>
    </div>
  );
}
