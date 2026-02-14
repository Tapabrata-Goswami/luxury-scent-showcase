import { useQuery } from "@tanstack/react-query";
import { graphqlFetch, isGraphQLConfigured } from "@/lib/graphql-client";
import { GET_MENU, GET_ALL_MENU_ITEMS } from "@/graphql/menu-queries";

export interface MenuItem {
  id: string;
  label: string;
  url: string;
  path: string;
  parentId: string | null;
  order: number;
}

interface MenuResponse {
  menuItems: { nodes: MenuItem[] };
}

export const useWooMenu = (location = "PRIMARY") => {
  const configured = isGraphQLConfigured();

  // Try location-based query first, fallback to all menu items
  const locationQuery = useQuery({
    queryKey: ["menu", location],
    queryFn: () => graphqlFetch<MenuResponse>(GET_MENU, { location }),
    enabled: configured,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const fallbackQuery = useQuery({
    queryKey: ["menu", "all"],
    queryFn: () => graphqlFetch<MenuResponse>(GET_ALL_MENU_ITEMS),
    enabled: configured && !!locationQuery.error,
    staleTime: 5 * 60 * 1000,
  });

  const items = locationQuery.data?.menuItems?.nodes
    ?? fallbackQuery.data?.menuItems?.nodes
    ?? [];

  const loading = configured
    ? locationQuery.isLoading || (!!locationQuery.error && fallbackQuery.isLoading)
    : false;

  return { items, loading, configured };
};
