'use client';

import { StarRatingInput } from "@/components/shared/StarRatingInput/StarRatingInput";
import { IReview } from "@/typings/Reviews.type";
import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";

interface IReviewItemProps {
	rating: IReview;
	onReviewDelete: (review: IReview) => void;
}

export const ReviewItem = ({ review, onReviewDelete }: IReviewItemProps) => {
	const onDeleteHandler = () => {
		onReviewDelete(review);
	};

	return (
		<Flex
			gap={2}
			justifyContent='space-between'
			pb={2}
			borderBottom='1px solid white'
		>
			<Flex
				flexDirection='column'
				gap={2}
			>
				<Text>
					{review.comment}
				</Text>

				<Flex
					gap={2}
					alignItems='center'
				>
					<StarRatingInput
						value={review.rating}
					/>
					<Text
						fontSize='sm'
						fontWeight='bold'
					>
						{review.rating} / 5
					</Text>
				</Flex>
			</Flex>

			<IconButton
				onClick={onDeleteHandler}
				colorScheme="red"
				aria-label="Delete review"
				icon={<DeleteIcon />}
			/>
		</Flex>
	);
}
