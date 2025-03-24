"use client";

import { navItems } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigace"
      className="flex flex-wrap min-h-10 gap-2 sm:gap-4 md:gap-6 lg:gap-9"
    >
      {Object.values(navItems).map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={`flex items-center justify-center text-base border-b-4 ${
            pathname === item.href
              ? "border-red-primary font-semibold text-text-primary"
              : "border-transparent hover:border-divider-gray\
                font-normal text-text-secondary hover:text-text-primary"
          }`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
