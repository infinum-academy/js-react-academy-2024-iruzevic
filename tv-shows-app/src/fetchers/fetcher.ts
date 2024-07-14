import { getAuthData } from "./auth";

export async function fetcherRaw<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	return await fetch(input, init);
}

export async function fetcherSecure(input: string) {
	const response = await fetcherRaw(input, {
		headers: getAuthData(),
	});

	return response.json();
}
 