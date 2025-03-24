import { FC } from "react";

type PerexProps = {
  perex: string;
};

export const Perex: FC<PerexProps> = ({ perex }) => (
  <p className="text-base font-normal text-text-secondary mt-1">{perex}</p>
);
