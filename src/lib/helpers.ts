import { HOSTNAME, NavItem, navItems } from "./constants";

export const getBreadcrumbsInfo = (pathName: string) => {
  const segments = pathName
    .trim()
    .split("/")
    .filter((segment) => segment !== "");

  const info = [];
  let items: { [key: string]: NavItem } = navItems;

  for (const segment of segments) {
    const item = items[segment];

    if (item) {
      info.push({
        id: `breadcrumb-${item.id}`,
        label: item.label,
        href: item.href,
      });

      if (item.children) {
        items = item.children;
      }
    }
  }

  return info;
};

export const getImageUrl = (imageId: string) =>
  `${HOSTNAME}/assets/${imageId}.jpg`;

export const formatDateToCZ = (dateString: string) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  const czFormat = new Intl.DateTimeFormat("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

  const parts = czFormat.split(" ");
  if (parts.length === 3) {
    return `${parts[0]} ${parts[1]}, ${parts[2]}`;
  }

  return czFormat;
};
