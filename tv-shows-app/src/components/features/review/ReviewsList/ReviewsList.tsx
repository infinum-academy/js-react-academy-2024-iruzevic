'use client';

import { Container, Flex, Heading } from "@chakra-ui/react";
import { ReviewItem } from "../ReviewItem/ReviewItem";
import { IReviewsList } from "@/typings/Reviews.type";

interface IReviewsListProps {
	reviewsList: IReviewsList;
	onReviewDelete: (review: IReview) => void;
}

export const ReviewsList = ({reviewsList, onReviewDelete}: IReviewsListProps) => {
	return (
		<Container
			maxW='container.md'
			borderColor='gray.200'
			px={5}
			pb={5}
		>
			<Flex
				direction="column"
				gap={3}
			>
				{reviewsList.reviews.map((review, i) => (
					<ReviewItem key={i} review={review} onReviewDelete={onReviewDelete} />
				))}
			</Flex>
		</Container>
	);
}
