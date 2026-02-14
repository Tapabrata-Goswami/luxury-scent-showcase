import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlFetch, isGraphQLConfigured } from "@/lib/graphql-client";
import {
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  APPLY_COUPON,
} from "@/graphql/queries";
import { WooCart } from "@/graphql/types";

export const useWooCart = () => {
  const configured = isGraphQLConfigured();
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: () => graphqlFetch<{ cart: WooCart }>(GET_CART),
    enabled: configured,
  });

  const invalidateCart = () => queryClient.invalidateQueries({ queryKey: ["cart"] });

  const addToCartMutation = useMutation({
    mutationFn: ({ productId, quantity = 1 }: { productId: number; quantity?: number }) =>
      graphqlFetch(ADD_TO_CART, { productId, quantity }),
    onSuccess: invalidateCart,
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ key, quantity }: { key: string; quantity: number }) =>
      graphqlFetch(UPDATE_CART_ITEM, { key, quantity }),
    onSuccess: invalidateCart,
  });

  const removeItemMutation = useMutation({
    mutationFn: (key: string) =>
      graphqlFetch(REMOVE_FROM_CART, { keys: [key] }),
    onSuccess: invalidateCart,
  });

  const applyCouponMutation = useMutation({
    mutationFn: (code: string) =>
      graphqlFetch(APPLY_COUPON, { code }),
    onSuccess: invalidateCart,
  });

  return {
    cart: data?.cart ?? null,
    loading: configured ? isLoading : false,
    error,
    configured,
    addToCart: (productId: number, quantity = 1) => addToCartMutation.mutateAsync({ productId, quantity }),
    updateQuantity: (key: string, quantity: number) => updateQuantityMutation.mutateAsync({ key, quantity }),
    removeItem: (key: string) => removeItemMutation.mutateAsync(key),
    applyCoupon: (code: string) => applyCouponMutation.mutateAsync(code),
    refetch: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  };
};
