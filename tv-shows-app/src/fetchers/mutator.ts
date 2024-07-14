
import { getAuthData } from "./auth";
import { processRequest } from "./processor";

export async function mutatorRaw<T>(input: string | URL | globalThis.Request, init?: RequestInit): Promise<T> {
	const defaultHeaders = {
		'Accept': 'application/json',
		'Content-Type': 'application/json',
	};

	return await fetch(input, {
		...init,
		method: init?.method || 'POST',
		headers: {
			...defaultHeaders,
			...init?.headers,
		},
		body: JSON.stringify(init.body),
	});
}

export async function mutator(url: string, { arg }: {arg: any}) {
	const response = await mutatorRaw(url, arg);

	return response.json();
}

export async function mutatorLogin(url: string, { arg }: {arg: any}) {
	const response = await mutatorRaw(url, {
		body: arg,
	});

	const responseData = await response.json();

	const data = processRequest(responseData);

	if (data.status === 'success') {
		const authData = {
			uid: responseData.user.email,
			client: response.headers.get('client'),
			accessToken: response.headers.get('access-token'),
		};

		localStorage.setItem('authToken', JSON.stringify(authData));
	}

	return data;
}

export async function mutatorSecure(url: string, { arg }: {arg: any}) {
	const response = await mutatorRaw(url, {
		headers: getAuthData(),
		body: arg,
	});

	return response.json();
}

export async function mutatorDeleteSecure(url: string) {
	const response = await mutatorRaw(url, {
		method: 'DELETE',
		headers: getAuthData(),
	});

	if (response.ok) {
		return true;
	}

	return false;
}
