'use client';

import { Flex, Text } from "@chakra-ui/react"
import { ReviewsList } from "../../review/ReviewsList/ReviewsList"
import { ReviewsForm } from "../ReviewForm/ReviewForm";
import { IReview } from "@/typings/Reviews.type";
import { useState } from "react";
import { ShowCard } from "../ShowCard/ShowCard";
import useSWR from "swr";
import { swrKeys } from "@/fetchers/swrKeys";
import { fetcherSecure } from "@/fetchers/fetcher";
import { mutatorDeleteSecure, mutatorSecure } from "@/fetchers/mutator";
import { Loader } from "@/components/shared/Loader/Loader";

export const ShowReviewSection = ({showId}) => {
	const [reviewsList, setReviewsList] = useState({reviews: []});
	const [showCard, setShowCard] = useState({});

	const {
		isLoading: isLoadingShow
	} = useSWR(`${swrKeys.showsList}/${showId}`, fetcherSecure, {
		onSuccess: (data) => {
			setShowCard(data.show);
		}
	});

	const {
		data: reviewsData,
	} = useSWR(`${swrKeys.showsList}/${showId}/reviews`, fetcherSecure, {
		onSuccess: (data) => {
			const newReviewsList = {
				reviews: data.reviews,
			}

			setReviewsList(newReviewsList);
		}
	});

	const onAddShowReview = async (review: IReview) => {
		const createResponse = await mutatorSecure(swrKeys.reviews, {
			arg: {
				comment: review.comment,
				rating: review.rating,
				show_id: showId,
			}
		});

		setReviewsList({
			reviews: [createResponse.review, ...reviewsList.reviews],
		});
	}

	const onReviewDelete = async (review: IReview) => {
		const deleteResponse = await mutatorDeleteSecure(`${swrKeys.reviews}/${review.id}`);

		if (deleteResponse) {
			setReviewsList({
				reviews: reviewsList.reviews.filter((r) => r.id !== review.id),
			});
		}
	}

	if (isLoadingShow) {
		return <Loader />
	}

	return (
		<>
			<Flex
				direction='column'
				gap={4}
				pb={4}
			>
				<ShowCard show={{
					title: showCard.title,
					description: showCard.description,
					imageUrl: showCard.image_url,
					averageRating: showCard.average_rating,
				}} />

				<ReviewsForm onAdd={onAddShowReview} />

				{
					reviewsList?.reviews?.length ?
					<ReviewsList
						reviewsList={reviewsList}
						onReviewDelete={onReviewDelete}
					/> :
					<Text
						px={4}
						textAlign='center'
						fontWeight='bold'
					>
						No reviews yet
					</Text>
				}
			</Flex>
		</>
	);
}
