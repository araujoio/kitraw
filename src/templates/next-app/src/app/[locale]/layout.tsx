import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';

type Props = { children: React.ReactNode; params: Promise<{locale: string}>; };
 
export default async function RootLayout({children, params}: Props) {
  const { locale } = await params;
  
  return (
    <html lang = { locale } suppressHydrationWarning>
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
