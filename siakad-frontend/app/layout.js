import Providers from './providers';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import './globals.css';

export const metadata = {
  title: 'SIAKAD - Sistem Informasi Akademik Sekolah'
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <title>{metadata.title}</title>
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
