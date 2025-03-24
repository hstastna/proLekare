import { Heading } from "@/components/layout/Heading";
import { navItems } from "@/lib/constants";
import { FC, ReactNode } from "react";

type ContentsLayoutProps = {
  children: ReactNode;
};

const ContentsLayout: FC<ContentsLayoutProps> = ({ children }) => (
  <>
    <Heading navItem={navItems.clanky} />
    <div>{children}</div>
  </>
);

export default ContentsLayout;
