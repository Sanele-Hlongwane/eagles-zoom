import "../../globals.css";
import SideNav from "@/components/SideNav";
export default function MeetingLayout({ children }) {
  return (
    <main className="w-full h-[94vh] flex justify-center items-center bg-foreground text-gray-100">
      {/* <StreamVideoProvider> */}
	<SideNav />
        {children}
        {/* </StreamVideoProvider> */}
    </main>
  );
}
