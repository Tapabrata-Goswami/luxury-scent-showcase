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

async function fetchMenuWithFallback(location: string): Promise<MenuResponse> {
  try {
    return await graphqlFetch<MenuResponse>(GET_MENU, { location });
  } catch {
    // Location enum doesn't exist, fallback to all menu items
    return await graphqlFetch<MenuResponse>(GET_ALL_MENU_ITEMS);
  }
}

export const useWooMenu = (location = "PRIMARY") => {
  const configured = isGraphQLConfigured();

  const { data, isLoading } = useQuery({
    queryKey: ["menu", location],
    queryFn: () => fetchMenuWithFallback(location),
    enabled: configured,
    staleTime: 5 * 60 * 1000,
  });

  return {
    items: data?.menuItems?.nodes ?? [],
    loading: configured ? isLoading : false,
    configured,
  };
};
