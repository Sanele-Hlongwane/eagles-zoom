import { Roboto } from 'next/font/google';
import '@/app/globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import SideNav from './SideNav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@stream-io/video-react-sdk/dist/css/styles.css';
import StreamVideoProvider from "@/providers/StreamClientProvider";

const roboto = Roboto({ weight: '400', subsets: ['latin'] });

export const metadata = {
  title: 'Eagles Ring',
  description: 'Find Investments opportunities and investors',
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <StreamVideoProvider>
        <div className={roboto.className}>
          <SideNav />
          <main className='container'>{children}</main>
          <ToastContainer />
        </div>
      </StreamVideoProvider>
    </ClerkProvider>
  );
}
