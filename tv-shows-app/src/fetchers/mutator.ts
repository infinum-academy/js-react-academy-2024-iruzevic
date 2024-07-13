import { processRequest } from "./processor";

export async function mutatorRaw(url: string, arg: {arg: any}) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(arg),
	});

	return response;
}

export async function mutator(url: string, { arg }: {arg: any}) {
	const response = await mutatorRaw(url, arg);

	return response.json();
}

export async function mutatorLogin(url: string, { arg }: {arg: any}) {
	const response = await mutatorRaw(url, arg);

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
	const authData = localStorage.getItem('authToken');

	const response = await mutatorRaw(url, {
		...arg,
		headers: {
			...arg.headers,
			uid: authData.uid,
			client: authData.client,
			'access-token': authData.accessToken
		},
	});

	return response.json();
}
