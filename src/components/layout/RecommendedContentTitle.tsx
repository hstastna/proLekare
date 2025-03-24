import { FC } from "react";
import { ImageType } from "@/lib/fetchGraphQL";
import { getImageUrl } from "@/lib/helpers";
import Image from "next/image";
import { lora } from "@/lib/fonts";
import Link from "next/link";

type RecommendedContentTitleProps = {
  contentId: string;
  name: string;
  image: ImageType | undefined;
};

export const RecommendedContentTitle: FC<RecommendedContentTitleProps> = ({
  contentId,
  name,
  image,
}) => {
  const imageUrl = image ? getImageUrl(image.id) : "/defaultImage.png";

  return (
    <Link href={`/clanky/${contentId}`}>
      <h2
        className={`${lora.className} text-[32px] text-text-primary font-semibold`}
      >
        {name}
      </h2>

      <div className="relative my-4">
        <Image src={imageUrl} alt={name} width={664} height={443} priority />

        <div
          className="
            absolute top-6 right-0
            px-2 py-1 sm:px-4 sm:py-2
            border border-red-primary bg-red-primary
            text-white uppercase text-[10px] sm:text-sm font-semibold
            rounded-tl-md rounded-bl-md
          "
        >
          Doporučujeme
        </div>
      </div>
    </Link>
  );
};
