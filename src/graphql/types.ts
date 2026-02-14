// WPGraphQL + WooGraphQL types

export interface WooImage {
  sourceUrl: string;
  altText: string;
}

export interface WooCategory {
  name: string;
  slug: string;
}

export interface WooProduct {
  id: string;
  databaseId: number;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  sku: string;
  price: string;
  regularPrice: string;
  stockStatus: "IN_STOCK" | "OUT_OF_STOCK" | "ON_BACKORDER";
  image: WooImage;
  galleryImages: { nodes: WooImage[] };
  productCategories: { nodes: WooCategory[] };
}

export interface WooCartItem {
  key: string;
  quantity: number;
  total: string;
  product: {
    node: Pick<WooProduct, "id" | "databaseId" | "slug" | "name" | "price" | "image">;
  };
}

export interface WooCart {
  contents: { nodes: WooCartItem[] };
  subtotal: string;
  shippingTotal: string;
  total: string;
  availableShippingMethods?: {
    rates: { id: string; label: string; cost: string }[];
  }[];
  appliedCoupons?: { code: string; discountAmount: string }[];
}

export interface ACFPageFields {
  heroTitle?: string;
  heroSubtitle?: string;
  heroImage?: { sourceUrl: string };
  brandStory?: string;
  ctaText?: string;
  ctaLink?: string;
}
