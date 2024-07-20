import { getAuthData } from "./auth";

export function fetcherRaw(input: string | URL | globalThis.Request, init?: RequestInit) {
	return fetch(input, init);
}

export async function fetcherSecure(input: string) {
	const response = await fetcherRaw(input, {
		headers: getAuthData(),
	});

	return response.json();
}

export async function fetcher<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	try {
		const response = await fetch(input, {
			credentials: 'include',
			...init,
		});
		if (!response.ok) {
			throw new Error(`Response status: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		throw new Error(`Response status: ${error}`);
	}
}
