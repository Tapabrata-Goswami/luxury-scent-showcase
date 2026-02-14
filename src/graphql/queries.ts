// WPGraphQL + WooGraphQL query strings

export const GET_PRODUCTS = `
  query GetProducts($first: Int = 20) {
    products(first: $first) {
      nodes {
        ... on SimpleProduct {
          id
          databaseId
          slug
          name
          description
          shortDescription
          sku
          price
          regularPrice
          stockStatus
          image {
            sourceUrl
            altText
          }
          galleryImages {
            nodes {
              sourceUrl
              altText
            }
          }
          productCategories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      ... on SimpleProduct {
        id
        databaseId
        slug
        name
        description
        shortDescription
        sku
        price
        regularPrice
        stockStatus
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
      }
    }
  }
`;

export const GET_CART = `
  query GetCart {
    cart {
      contents {
        nodes {
          key
          quantity
          total
          product {
            node {
              ... on SimpleProduct {
                id
                databaseId
                slug
                name
                price
                image {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }
      }
      subtotal
      shippingTotal
      total
      availableShippingMethods {
        rates {
          id
          label
          cost
        }
      }
    }
  }
`;

export const ADD_TO_CART = `
  mutation AddToCart($productId: Int!, $quantity: Int = 1) {
    addToCart(input: { productId: $productId, quantity: $quantity }) {
      cart {
        subtotal
        shippingTotal
        total
        contents {
          itemCount
        }
      }
    }
  }
`;

export const UPDATE_CART_ITEM = `
  mutation UpdateCartItem($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: { items: [{ key: $key, quantity: $quantity }] }) {
      cart {
        subtotal
        shippingTotal
        total
      }
    }
  }
`;

export const REMOVE_FROM_CART = `
  mutation RemoveFromCart($keys: [ID]!) {
    removeItemsFromCart(input: { keys: $keys }) {
      cart {
        subtotal
        shippingTotal
        total
      }
    }
  }
`;

export const APPLY_COUPON = `
  mutation ApplyCoupon($code: String!) {
    applyCoupon(input: { code: $code }) {
      cart {
        appliedCoupons {
          code
          discountAmount
        }
        subtotal
        total
      }
    }
  }
`;

export const CHECKOUT_MUTATION = `
  mutation Checkout($input: CheckoutInput!) {
    checkout(input: $input) {
      order {
        id
        databaseId
        orderNumber
        status
        total
      }
      result
      redirect
    }
  }
`;

export const GET_ACF_PAGE = `
  query GetPageACF($slug: ID!) {
    page(id: $slug, idType: URI) {
      title
      content
      acfFields {
        heroTitle
        heroSubtitle
        heroImage {
          sourceUrl
        }
        brandStory
        ctaText
        ctaLink
      }
    }
  }
`;
