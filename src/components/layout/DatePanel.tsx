import { formatDateToCZ } from "@/lib/helpers";
import { FC } from "react";

type DatePanelProps = {
  date_updated: string;
  className?: string;
};

export const DatePanel: FC<DatePanelProps> = ({ date_updated, className }) => {
  const formattedDate = formatDateToCZ(date_updated);

  return (
    <p
      className={`font-normal text-text-secondary ${
        className ? className : "text-base mt-1 mb-4"
      }`}
    >
      {formattedDate}
    </p>
  );
};
