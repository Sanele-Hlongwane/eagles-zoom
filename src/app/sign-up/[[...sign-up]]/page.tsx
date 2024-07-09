// Page component with blurred background except for SignUp component
import { SignUp } from "@clerk/nextjs";
import Image from 'next/image';  // Import Image from Next.js

const Page = () => {
  return (
    <div className="relative h-screen">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/EaglesRingLogo.png')`, filter: 'blur(8px)' }}></div>
      <div className="flex items-center justify-center h-screen">
        {/* SignUp Component */}
        <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md">
          <SignUp />
        </div>
      </div>
    </div>
  );
};

export default Page;
