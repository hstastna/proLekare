import { FC } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { Spacer } from "../common/Spacer";

type HeadingProps = {
  navItem: {
    href: string;
    label: string;
  };
};

export const Heading: FC<HeadingProps> = ({ navItem }) => (
  <>
    <Breadcrumbs pathname={navItem.href} />
    <h1 className="text-3xl text-text-header font-semibold uppercase mb-5">
      {navItem.label}
    </h1>
    <hr />
    <Spacer />
  </>
);
