import type { Metadata } from 'next';
import './globals.css';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'পানি পান মাস্টারক্লাস',
  description: 'সঠিক নিয়মে পানি পান শিখুন — ইসলামিক শরিয়াহ ও বৈজ্ঞানিক পদ্ধতিতে',
  keywords: 'পানি, পানি পান, ইসলামিক, স্বাস্থ্য, কোর্স',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
