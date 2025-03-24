"use client";

import { fetchGraphQL, GraphQLResponse } from "@/lib/fetchGraphQL";
import { notFound, redirect, useParams } from "next/navigation";
import { FC, useState, useEffect } from "react";
import { getImageUrl } from "@/lib/helpers";
import { lora } from "@/lib/fonts";
import { LabelsPanel } from "@/components/layout/LabelsPanel";
import { DatePanel } from "@/components/layout/DatePanel";
import { Perex } from "@/components/layout/Perex";
import Image from "next/image";
import { Spacer } from "@/components/common/Spacer";

const GET_CONTENT = `
  query GetContentById($id: ID!) {
    contents_by_id(id: $id) {
      id
      translations(filter: { language: { code: { _eq: "cs-CZ" } } }) {
        name
        content
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

//Note: for client component, use React Query eventually

const Content: FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<GraphQLResponse["data"] | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const result = await fetchGraphQL(GET_CONTENT, { id: id });

          if (!result) {
            setError(true);
            notFound();
          }

          setData(result);
        } catch (error) {
          console.error(error);
          notFound();
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error loading content</div>;
  }

  const contentData = data?.contents_by_id;

  if (!contentData) {
    redirect("/error");
  }

  const { translations, theme, labels } = contentData;

  if (!translations || translations.length === 0) {
    redirect("/error");
  }

  const { date_updated, name, perex, image, content } = translations[0];
  const imageUrl = image ? getImageUrl(image.id) : "/defaultImage.png";

  return (
    <>
      <LabelsPanel labels={labels} />

      <h2
        className={`${lora.className} text-[32px] text-text-primary font-semibold`}
      >
        {name}
      </h2>

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

      <Spacer />
      <hr />
      <Spacer />

      <Image src={imageUrl} alt={name} width={664} height={443} priority />

      <Perex perex={perex} />

      {/* TODO parse html safely, avoid dangerouslySetInnerHTML to render the content html */}
      {content}
    </>
  );
};

export default Content;
