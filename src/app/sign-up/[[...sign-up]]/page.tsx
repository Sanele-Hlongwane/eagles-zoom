import { SignUp } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex items-center justify-center h-screen" style={{ marginTop: '10vh' }}>
      <SignUp />
    </div>
  );
};

export default Page;
