import { IUser } from "./User.type";

export interface IReviewsList {
	reviews: Array<IReview>;
}

export interface IReview {
	id: string;
	comment: string;
	rating: number;
	user: IUser;
}
