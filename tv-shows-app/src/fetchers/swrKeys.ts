const apiURL = 'https://tv-shows.infinum.academy';

export const swrKeys = {
	login: `${apiURL}/users/sign_in`,
	register: `${apiURL}/users`,
	profile: `${apiURL}/users/me`,
	showsList: `${apiURL}/shows`,
	showListItem: (id: string) => `${apiURL}/shows/${id}`,
	showsTopRatedList: `${apiURL}/shows/top_rated`,
	reviewsList: `${apiURL}/reviews`,
	showReviewsList: (id: string) => `${apiURL}/shows/${id}/reviews`,
	showReviewItem: (id: string) => `${apiURL}/reviews/${id}`,
}
