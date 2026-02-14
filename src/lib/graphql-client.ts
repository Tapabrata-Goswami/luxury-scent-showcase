// ⚠️ Replace this with your WordPress/WPGraphQL endpoint URL
const GRAPHQL_ENDPOINT = "https://cyan-ferret-794343.hostingersite.com/graphql";

const SESSION_KEY = "woo-session-token";

const getSessionToken = (): string | null => {
  return localStorage.getItem(SESSION_KEY);
};

const setSessionToken = (token: string) => {
  localStorage.setItem(SESSION_KEY, token);
};

export const isGraphQLConfigured = () => {
  return !GRAPHQL_ENDPOINT.includes("your-wordpress-site.com");
};

export async function graphqlFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };

  const sessionToken = getSessionToken();
  if (sessionToken) {
    headers["woocommerce-session"] = `Session ${sessionToken}`;
  }

  const res = await fetch(GRAPHQL_ENDPOINT, {
    method: "POST",
    headers,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`GraphQL request failed: ${res.status}`);
  }

  // Store session token from response
  const newSession = res.headers.get("woocommerce-session");
  if (newSession) {
    setSessionToken(newSession);
  }

  const json = await res.json();

  if (json.errors?.length) {
    throw new Error(json.errors[0].message);
  }

  return json.data as T;
}
