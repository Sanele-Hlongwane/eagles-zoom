// Page component with blurred background except for SignIn component
import { SignIn } from "@clerk/nextjs";
import Image from 'next/image';  // Import Image from Next.js

const Page = () => {
  return (
    <div className="relative h-screen">
      
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/EaglesRingLogo.png')`, filter: 'blur(8px)' }}></div>
      
      <div className="flex items-center justify-center h-screen">
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default Page;
