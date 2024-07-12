'use client';
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { tabs } from "../constants/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Tab = ({ label, route, icon }) => {
  const pathname = usePathname();

  let isActive = pathname === route;
  const isMeetingPage = pathname.startsWith("/meeting");
  if (isMeetingPage) {
    return null; // Ensure no rendering on meeting pages
  }
  return (
    <div
      id="Tab"
      className={cn(
        "px-4 pl-6 py-3 my-3 mx-2 text-white flex justify-start items-center rounded-xl",
        {
          "bg-primary": isActive,
        }
      )}
    >
      <Link href={route} className="flex gap-3 lg:gap-4 items-center">
        <Image
          src={icon}
          width={30}
          height={30}
          alt={label}
          className="w-5 md:w-6 lg:w-8 h-auto"
        />
        <p className="text-lg lg:text-xl font-medium lg:font-semibold">
          {label}
        </p>
      </Link>
    </div>
  );
};

const SideNav = () => {
  const pathname = usePathname();
  const isMeetingPage = pathname.startsWith("/meeting");
  if (isMeetingPage) {
    return null; // Ensure no rendering on meeting pages
  }
  return (
    <div
      id="sideNav"
      className="w-[185px] md:w-[210px] lg:w-[250px] xl:w-[260px] h-full bg-gray-900 text-white relative pt-5 select-none"
    >
      {tabs.map(({ label, icon, route }, index) => {
        return <Tab key={index} label={label} route={route} icon={icon} />;
      })}
    </div>
  );
};

export default SideNav;
