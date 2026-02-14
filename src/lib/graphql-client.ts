// ⚠️ Replace this with your WordPress/WPGraphQL endpoint URL
const GRAPHQL_ENDPOINT = "https://cyan-ferret-794343.hostingersite.com/graphql";

export const isGraphQLConfigured = () => {
  return !GRAPHQL_ENDPOINT.includes("your-wordpress-site.com");
};

export async function graphqlFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
