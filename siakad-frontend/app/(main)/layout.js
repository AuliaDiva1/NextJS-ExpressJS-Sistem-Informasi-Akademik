import Layout from '../../layout/layout';
import Providers from '../providers';

export const metadata = {
  title: 'SIAKAD',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function AppLayout({ children }) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  );
}
