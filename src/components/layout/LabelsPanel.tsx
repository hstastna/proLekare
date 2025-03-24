import { Label } from "@/lib/fetchGraphQL";
import { FC } from "react";

type LabelsPanelProps = {
  labels: Label[] | undefined;
  hasPipe?: boolean;
};

export const LabelsPanel: FC<LabelsPanelProps> = ({ labels, hasPipe }) => {
  if (!labels || labels.length === 0) {
    return null;
  }

  const labelsSize = labels.length;

  return (
    <>
      {labels?.map((label, index) => {
        const isLast = index === labelsSize - 1;

        return (
          <span
            key={`label-${label.label.name}`}
            className="text-xs text-text-red-secondary font-normal uppercase tracking-wider"
          >
            {hasPipe && index === 0 && <span className="pr-1.5">|</span>}
            {label.label.name}
            {!isLast && <span className="px-1.5">|</span>}
          </span>
        );
      })}
    </>
  );
};
