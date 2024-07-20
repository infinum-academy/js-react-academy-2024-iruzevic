interface IAuthData {
	uid?: string;
	client?: string;
	'access-token'?: string;
}

export const getAuthData = (): IAuthData => {
	const authData = localStorage.getItem('authToken');

	if (!authData) {
		return {};
	}

	const data = JSON.parse(authData);

	return {
		uid: data.uid,
		client: data.client,
		'access-token': data.accessToken
	}
}

export const getCurrentUserEmail = (): string => {
	const authData = localStorage.getItem('authToken');

	if (!authData) {
		return '';
	}

	const data = JSON.parse(authData);

	return data.uid
}
