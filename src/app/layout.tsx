import type { Metadata } from 'next';
import { Playfair_Display, Poppins, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-couple-name',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Wedding Invitation | Nauval & Azizah',
  description: 'Kami mengundang Anda untuk hadir di hari bahagia kami.',
  openGraph: {
    title: 'Wedding Invitation | Nauval & Azizah',
    description: 'Kami mengundang Anda untuk hadir di hari bahagia kami.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${playfair.variable} ${poppins.variable} ${cormorant.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
