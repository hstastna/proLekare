import { FC, ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import Image from "next/image";
import "./globals.css";
import Navigation from "@/components/layout/Navigation";
import Link from "next/link";
import { PRO_LEKARE_CZ_TITLE, PRO_LEKARE_DESCRIPTION } from "@/lib/constants";
import { Spacer } from "@/components/common/Spacer";
import { LeftPanel } from "@/components/layout/LeftPanel";
import { RightPanel } from "@/components/layout/RightPanel";
import { sourceSans3 } from "@/lib/fonts";

export const metadata: Metadata = {
  title: PRO_LEKARE_CZ_TITLE,
  description: PRO_LEKARE_DESCRIPTION,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

type RootLayoutProps = {
  children: ReactNode;
};

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="cs">
    <body className={`${sourceSans3.className} antialiased`}>
      <div className="mx-auto max-w-[1100px] px-[42px] pb-10 shadow-lg">
        <header className="flex justify-between items-center pt-10 pb-6">
          <Link href="/" className="mr-4 sm:mr-6 md:mr-8 min-w-[124px]">
            <Image
              src="/logoPL.svg"
              alt={PRO_LEKARE_CZ_TITLE}
              width={248}
              height={40}
              priority
            />
          </Link>
          <Navigation />
        </header>

        <hr />

        <Spacer />

        <main className="flex flex-col sm:flex-row justify-between gap-default">
          <LeftPanel>{children}</LeftPanel>
          <RightPanel />
        </main>
      </div>
    </body>
  </html>
);

export default RootLayout;
