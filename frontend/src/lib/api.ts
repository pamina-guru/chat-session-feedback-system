const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export async function fetchJson<T>(path: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {}),
        },
        cache: "no-store",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
        throw (
            data ?? {
                code: "UNKNOWN_ERROR",
                message: "Something went wrong",
            }
        );
    }

    return data as T;
}