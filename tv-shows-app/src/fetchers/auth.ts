export const getAuthData = () => {
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

export const getCurrentUserEmail = () => {
	const authData = localStorage.getItem('authToken');

	if (!authData) {
		return '';
	}

	const data = JSON.parse(authData);

	return data.uid
}
