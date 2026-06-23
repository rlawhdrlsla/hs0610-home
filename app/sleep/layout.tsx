import { Noto_Sans_KR, Manrope, Plus_Jakarta_Sans } from 'next/font/google';
import { Toaster } from '@/components/sleep/ui/sonner';
import { LanguageProvider } from '@/lib/sleep/i18n/LanguageContext';
import './sleep.css';

const notoSansKR = Noto_Sans_KR({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
});

const manrope = Manrope({
  variable: '--font-heading',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export default function SleepLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${notoSansKR.variable} ${manrope.variable} ${plusJakarta.variable}`}>
      <LanguageProvider>
        {children}
      </LanguageProvider>
      <Toaster richColors position="top-center" />
    </div>
  );
}
