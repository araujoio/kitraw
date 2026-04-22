import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '@/styles/globals.css';

type Props = { children: React.ReactNode; params: Promise<{locale: string}>; };
 
export default async function LocaleLayout({children, params}: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) { 
    notFound();
  }
  
  return (
    <html lang={ locale } suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            { children }
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
