import { FC } from "react";
import Link from "next/link";
import { getBreadcrumbsInfo } from "@/lib/helpers";
import { PRO_LEKARE_TITLE } from "@/lib/constants";
import Image from "next/image";

type BreadcrumbsProps = {
  pathname: string;
};

export const Breadcrumbs: FC<BreadcrumbsProps> = ({ pathname }) => {
  const breadcrumbsData = getBreadcrumbsInfo(pathname);
  const breadcrumbsDataSize = breadcrumbsData.length;

  return (
    <nav
      aria-label="Drobečková navigace"
      className="text-xs text-text-secondary mb-4"
    >
      <div className="flex items-center">
        <Link href="/" className=" hover:text-red-primary">
          {PRO_LEKARE_TITLE}
        </Link>

        {breadcrumbsData.map((segment, index) => {
          const isLast = index === breadcrumbsDataSize - 1;

          return (
            <div key={segment.id} className="flex items-center">
              <Image
                src="/double_arrow_right.svg"
                alt="Breadcrumb separator"
                width={12}
                height={12}
                className="mx-1"
              />

              {isLast ? (
                <>{segment.label}</>
              ) : (
                <Link href={segment.href} className=" hover:text-red-primary">
                  {segment.label}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};
