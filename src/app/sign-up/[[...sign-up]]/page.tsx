import { SignUp } from "@clerk/nextjs";
import Image from 'next/image';  // Import Image from Next.js

const Page = () => {
  return (
    <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/EaglesRingLogo.png')` }}>
      {/* Replace 'your-image.jpg' with the path to your actual image */}
      <div className="flex items-center justify-center h-screen bg-opacity-75">
        <SignUp />
      </div>
    </div>
  );
};

export default Page;
