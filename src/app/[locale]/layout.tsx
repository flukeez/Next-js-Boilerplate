import '@/styles/global.css';

import { notFound } from 'next/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';

import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider';
import StoreProvider from '@/components/StoreProvider';
import { AppConfig } from '@/utils/AppConfig';

export default function RootLayout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!AppConfig.locales.includes(props.params.locale)) notFound();

  const messages = useMessages();

  return (
    <html lang={props.params.locale}>
      <body>
        <StoreProvider>
          <ReactQueryClientProvider>
            <NextIntlClientProvider
              locale={props.params.locale}
              messages={messages}
            >
              {props.children}
            </NextIntlClientProvider>
          </ReactQueryClientProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
