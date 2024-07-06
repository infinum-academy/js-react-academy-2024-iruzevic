export interface IReviewsList {
	title: string;
	reviews: Array<IReview>;
}

export interface IReview {
	title: string;
	content: string;
	rate: number;
}
