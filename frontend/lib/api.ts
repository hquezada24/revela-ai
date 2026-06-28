// lib/api.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    credentials: "include",

    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },

    ...options,
  });

  if (!response.ok) {
    throw new Error(`Invalid response from API: ${response.status}`);
  }

  const contentType = response.headers.get("content-type");
  if (
    response.status === 204 ||
    !contentType ||
    !contentType.includes("application/json")
  ) {
    return {};
  }

  const json: Record<string, any> = await response.json();
  return json;
}
