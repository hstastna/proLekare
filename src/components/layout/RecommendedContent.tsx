import { Content } from "@/lib/fetchGraphQL";
import { FC } from "react";
import { LabelsPanel } from "./LabelsPanel";
import { RecommendedContentTitle } from "./RecommendedContentTitle";
import { redirect } from "next/navigation";
import { Perex } from "./Perex";
import { DatePanel } from "./DatePanel";

type RecommendedContentProps = {
  article: Content;
};

export const RecommendedContent: FC<RecommendedContentProps> = ({
  article,
}) => {
  const { id, translations, labels } = article;

  if (!translations || translations.length === 0) {
    redirect("/error");
  }

  const { date_updated, name, perex, image } = translations?.[0];

  return (
    <>
      <RecommendedContentTitle contentId={id} name={name} image={image} />

      <LabelsPanel labels={labels} />

      <DatePanel date_updated={date_updated} />

      <Perex perex={perex} />
    </>
  );
};
