import { FC } from "react";

type SpacerProps = {
  height?: number;
};

export const Spacer: FC<SpacerProps> = ({ height }) => (
  <div
    className={`w-full ${height ? "" : "h-default"}`}
    style={height ? { height: `${height}px` } : {}}
  />
);
