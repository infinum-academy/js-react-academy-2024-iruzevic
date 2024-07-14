'use client';

import { Flex } from "@chakra-ui/react";
import { ReviewItem } from "../ReviewItem/ReviewItem";
import { IReview, IReviewsList } from "@/typings/Reviews.type";

interface IReviewsListProps {
	reviewsList: IReviewsList;
	onReviewDelete: (review: IReview) => void;
}

export const ReviewsList = ({reviewsList, onReviewDelete}: IReviewsListProps) => {
	return (
		<Flex
			direction="column"
			gap={3}
		>
			{reviewsList.reviews.map((review, i) => (
				<ReviewItem key={review.id} review={review} onReviewDelete={onReviewDelete} />
			))}
		</Flex>
	);
}
