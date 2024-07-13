export async function fetcher<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	const response = await fetch(input, {
		...init,
	});

	return response;
}

export async function fetcherSecure<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	const authData = localStorage.getItem('authToken');

	let authHeaders = {};

	if (authData) {
		const auth = JSON.parse(authData);

		authHeaders = {
			uid: auth.uid,
			client: auth.client,
			'access-token': auth.accessToken,
		};
	}

	const response = await fetch(input, {
		...init,
		headers: {
			...init?.headers,
			...authHeaders,
		}
	});

	return response.json();
}
