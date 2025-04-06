import { Spacer } from "@/components/common/Spacer";
import { ContentWithPerex } from "@/components/layout/ContentWithPerex";
import { NextContentButton } from "@/components/layout/NextContentButton";
import { RecommendedContent } from "@/components/layout/RecommendedContent";
import { CONTENTS_PER_PAGE } from "@/lib/constants";
import { fetchGraphQL } from "@/lib/fetchGraphQL";
import { notFound } from "next/navigation";
import { FC } from "react";

const filterByShortcutAndDateRangeQueryPart = `
  filter: {
    _and: [
      {
        web: {
          shortcut: {
            _eq: "PL"
          }
        }
      },
      {
        _or: [
          { public_from: { _null: true } },
          { public_from: { _lte: $actualDate } }
        ],
        _and: [
          {
            _or: [
              { public_till: { _null: true } },
              { public_till: { _gte: $actualDate } }
            ]
          }
        ]
      }
    ]
  }
`;

const numberOfContentsQueryPart = `
  contents_aggregated(${filterByShortcutAndDateRangeQueryPart}) {
    count {
      id
    }
  }
`;

const GET_CONTENTS_WITH_NUMBER_AND_PUBLIC_FROM_DATE = `
  query GetContentWithNumberAndPublicFromDate($actualDate: String!, $offset: Int!) {
    ${numberOfContentsQueryPart}

    contents(
      ${filterByShortcutAndDateRangeQueryPart},
      sort: ["-date_updated"],
      limit: ${CONTENTS_PER_PAGE},
      offset: $offset
    )
    {
      id
        translations(filter: { language: { code: { _eq: "cs-CZ" } } }) {
        name
        perex
        date_updated
        image {
          id
        }
      }
      theme {
        name
      }
      labels {
        label {
          name
        }
      }
    }
  }
`;

// Note: use "offset" for paging to skip some amount of items, "page" does not work!!!

// Note: public_from is null, use date_updated for sorting, "-" for descending

type ContentsProps = {
  searchParams: Promise<Record<string, string>>;
};

const Contents: FC<ContentsProps> = async ({ searchParams }) => {
  const page = (await searchParams)?.page || "1";
  const offset = (parseInt(page, 10) - 1) * CONTENTS_PER_PAGE;

  const data = await fetchGraphQL(
    GET_CONTENTS_WITH_NUMBER_AND_PUBLIC_FROM_DATE,
    { actualDate: new Date().toISOString(), offset }
  );

  const contents = data?.contents;
  const totalPages = Math.ceil(
    (data?.contents_aggregated?.[0]?.count?.id || 0) / CONTENTS_PER_PAGE
  );

  if (!data || !Array.isArray(contents)) {
    notFound();
  }

  return (
    <>
      {contents.map((content, index) => {
        if (index === 0) {
          return <RecommendedContent key={content.id} article={content} />;
        }

        return (
          <span key={content.id}>
            <Spacer height={20} />
            <hr />
            <Spacer height={20} />
            <ContentWithPerex article={content} />
          </span>
        );
      })}

      <Spacer />
      <NextContentButton totalPages={totalPages} />
    </>
  );
};

export default Contents;
