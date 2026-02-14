import { useQuery } from "@tanstack/react-query";
import { graphqlFetch, isGraphQLConfigured } from "@/lib/graphql-client";
import { GET_PRODUCTS, GET_PRODUCT_BY_SLUG } from "@/graphql/queries";
import { WooProduct } from "@/graphql/types";

export const useProducts = () => {
  const configured = isGraphQLConfigured();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => graphqlFetch<{ products: { nodes: WooProduct[] } }>(GET_PRODUCTS),
    enabled: configured,
  });

  return {
    products: data?.products?.nodes ?? [],
    loading: configured ? isLoading : false,
    error,
    configured,
  };
};

export const useProduct = (slug: string | undefined) => {
  const configured = isGraphQLConfigured();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product", slug],
    queryFn: () => graphqlFetch<{ product: WooProduct }>(GET_PRODUCT_BY_SLUG, { slug }),
    enabled: configured && !!slug,
  });

  return {
    product: data?.product ?? null,
    loading: configured ? isLoading : false,
    error,
    configured,
  };
};
