'use client';

import { StarRatingInput } from "@/components/shared/StarRatingInput/StarRatingInput";
import { getCurrentUserEmail } from "@/fetchers/auth";
import { IReview } from "@/typings/Reviews.type";
import { DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface IReviewItemProps {
	rating: IReview;
	onReviewDelete: (review: IReview) => void;
}

export const ReviewItem = ({ review, onReviewDelete }: IReviewItemProps) => {
	const [canDelete, setCanDelete] = useState(false);

	useEffect(() => {
		if (review.user.email === getCurrentUserEmail()) {
			setCanDelete(true);
		}
	}, [review]);

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

			{canDelete &&
				<IconButton
					onClick={onDeleteHandler}
					colorScheme="red"
					aria-label="Delete review"
					icon={<DeleteIcon />}
				/>
			}
		</Flex>
	);
}
