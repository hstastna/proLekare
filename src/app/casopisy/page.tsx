import { FC } from "react";
import { UnderConstructionPage } from "@/components/common/UnderConstructionPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Under Construction",
};

const Casopisy: FC = () => {
  return <UnderConstructionPage />;
};

export default Casopisy;
