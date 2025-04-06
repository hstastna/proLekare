import { GQL_ENDPOINT } from "./constants";

export type ImageType = { id: string; width?: number; height?: number } | null;

type Translation = {
  content: string;
  date_updated: string;
  image?: ImageType;
  name: string;
  perex: string;
};

export type Label = {
  label: { name: string };
};

export type Content = {
  id: string;
  translations: Translation[];
  labels?: Label[];
  public_from?: string | null;
  public_till?: string | null;
  theme?: { name: string };
  web?: { shortcut: string };
};

type GraphQLError = {
  message: string;
  code?: string;
  extensions?: { errors: GraphQLError[] };
  locations?: { line: number; column: number }[];
  path?: string[];
};

type Aggregated = {
  count: {
    id: number;
  };
};

// Actually data type is very restricted, extend eventually
type GraphQLResponse = {
  data?: {
    contents?: Content[];
    contents_aggregated?: Aggregated[];
    contents_by_id?: Content;
  } | null;
  errors?: GraphQLError[];
};

export const fetchGraphQL = async (
  query: string,
  variables: Record<string, unknown> = {},
  options?: {
    revalidate?: number;
    tags?: string[];
  }
): Promise<GraphQLResponse["data"]> => {
  try {
    const response = await fetch(GQL_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      next: {
        ...options,
        revalidate: options?.revalidate || 5 * 60,
      },
    });

    if (!response.ok) {
      throw new Error(`Network error: ${response.statusText}`);
    }

    const { data, errors } = (await response.json()) as GraphQLResponse;

    if (errors && errors.length > 0) {
      throw new Error(
        `GraphQL Error: ${errors
          .map((error: GraphQLError) => error.message)
          .join(", ")}`
      );
    }

    return data;
  } catch (error: unknown) {
    console.error(error);

    throw new Error(
      `Failed to fetch data from GraphQL: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
};
