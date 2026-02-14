import { useQuery } from "@tanstack/react-query";
import { graphqlFetch, isGraphQLConfigured } from "@/lib/graphql-client";
import { GET_MENU } from "@/graphql/menu-queries";

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

  const { data, isLoading } = useQuery({
    queryKey: ["menu", location],
    queryFn: () => graphqlFetch<MenuResponse>(GET_MENU, { location }),
    enabled: configured,
    staleTime: 5 * 60 * 1000, // cache 5 min
  });

  return {
    items: data?.menuItems?.nodes ?? [],
    loading: configured ? isLoading : false,
    configured,
  };
};
