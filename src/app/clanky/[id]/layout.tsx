import { FC, ReactNode } from "react";

type ContentLayoutProps = {
  children: ReactNode;
};

const ContentLayout: FC<ContentLayoutProps> = ({ children }) => (
  <>
    <div>{children}</div>
  </>
);

export default ContentLayout;
