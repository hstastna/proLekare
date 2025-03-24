import { Content } from "@/lib/fetchGraphQL";
import { FC } from "react";
import Image from "next/image";
import { getImageUrl } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { LabelsPanel } from "./LabelsPanel";
import { Perex } from "./Perex";
import { DatePanel } from "./DatePanel";
import { lora } from "@/lib/fonts";
import Link from "next/link";

type ContentWithPerexProps = {
  article: Content;
};

export const ContentWithPerex: FC<ContentWithPerexProps> = ({ article }) => {
  const { id, translations, theme, labels } = article;

  if (!translations || translations.length === 0) {
    redirect("/error");
  }

  const { date_updated, name, perex, image } = translations[0];
  const imageUrl = image ? getImageUrl(image.id) : "/defaultImage.png";

  return (
    <>
      <div className="flex gap-default mb-5">
        <Link href={`/clanky/${id}`}>
          <div className="relative w-[136px] h-[91px]">
            <Image
              src={imageUrl}
              alt={name}
              width={136}
              height={91}
              className="mt-[34px] w-[136px] h-[91px]"
              sizes="(max-width: 400px) 75px, 136px"
              priority
            />
          </div>
        </Link>

        <div>
          <LabelsPanel labels={labels} hasPipe />

          <Link href={`/clanky/${id}`}>
            <h3
              className={`${lora.className} text-xl text-text-primary font-semibold mt-3 mb-1.5`}
            >
              {name}
            </h3>
          </Link>

          <div className="flex gap-2">
            {theme && (
              <>
                <h2 className="text-sm text-text-primary font-normal">
                  {theme?.name}
                </h2>
                <span className="text-sm text-text-secondary font-normal px-1">
                  |
                </span>
              </>
            )}

            <DatePanel date_updated={date_updated} className="text-sm" />
          </div>
        </div>
      </div>

      <Perex perex={perex} />
    </>
  );
};
