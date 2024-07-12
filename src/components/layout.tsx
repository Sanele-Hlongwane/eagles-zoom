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
    
      <StreamVideoProvider>
        <div className={roboto.className}>
          
          <main className="w-full h-[94vh] flex justify-start items-start bg-foreground text-gray-100>
              <SideNav />
          {children}</main>
          <ToastContainer />
        </div>
      </StreamVideoProvider>
    
  );
}
