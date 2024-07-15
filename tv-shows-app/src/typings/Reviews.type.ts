export interface IReviewsList {
	reviews: Array<IReview>;
}

export interface IReview {
	comment: string;
	rating: number;
}
