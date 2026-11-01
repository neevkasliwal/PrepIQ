// Mock API Client with Configurable Backend URL for future integration
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.prepiq.edu/v1";

export async function mockFetch<T>(
  endpoint: string,
  options?: {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    mockFallback?: () => T;
  }
): Promise<T> {
  // Simulating network latency for realistic SaaS feel
  await new Promise((resolve) => setTimeout(resolve, 80));

  if (options?.mockFallback) {
    return options.mockFallback();
  }

  throw new Error(`[PrepIQ Client] Endpoint ${endpoint} is awaiting real backend connection.`);
}

export { BASE_URL };

