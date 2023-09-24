import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import TrpcProvider from '@/components/providers/trpc-provider';
import { ConfettiProvider } from '@/components/providers/confetti-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LMS-System',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ConfettiProvider />
          <ToasterProvider />
          <TrpcProvider>{children}</TrpcProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
