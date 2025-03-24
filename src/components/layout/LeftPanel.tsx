import { FC } from "react";

type LeftPanelProps = {
  children: React.ReactNode;
};

export const LeftPanel: FC<LeftPanelProps> = ({ children }) => (
  <div id="leftPanel" className="max-w-full sm:max-w-[664px] w-full">
    {children}
  </div>
);
