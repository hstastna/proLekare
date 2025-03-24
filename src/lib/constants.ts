export const PRO_LEKARE_TITLE = "proLékaře";
export const PRO_LEKARE_CZ_TITLE = "proLékaře.cz";
export const PRO_LEKARE_DESCRIPTION = "Největší informační zdroj pro lékaře";

export const HOSTNAME = "https://directus.devmed.cz";
export const GQL_ENDPOINT = `${HOSTNAME}/graphql`;

export const CONTENTS_PER_PAGE = 5;

type NavItemIds =
  | "clanky"
  | "casopisy"
  | "specializace"
  | "vzdelavani"
  | "kongresy"
  | "videa"
  | "podcasty"
  | "praxe";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: { [key: string]: NavItem };
};

export const navItems: { [K in NavItemIds]: NavItem } = {
  clanky: {
    id: "clanky",
    label: "Články",
    href: "/clanky",
  },
  casopisy: {
    id: "casopisy",
    label: "Časopisy",
    href: "/casopisy",
  },
  specializace: {
    id: "specializace",
    label: "Specializace",
    href: "/specializace",
  },
  vzdelavani: {
    id: "vzdelavani",
    label: "Vzdělávání",
    href: "/vzdelavani",
  },
  kongresy: {
    id: "kongresy",
    label: "Kongresy",
    href: "/kongresy",
  },
  videa: {
    id: "videa",
    label: "Videa",
    href: "/videa",
  },
  podcasty: {
    id: "podcasty",
    label: "Podcasty",
    href: "/podcasty",
  },
  praxe: {
    id: "praxe",
    label: "Praxe",
    href: "/praxe",
  },
};
