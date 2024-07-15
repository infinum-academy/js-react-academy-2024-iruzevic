'use client';

import { Flex, Text } from "@chakra-ui/react"
import { ReviewsList } from "../../review/ReviewsList/ReviewsList"
import { ReviewsForm } from "../ReviewForm/ReviewForm";
import { IReview, IReviewsList } from "@/typings/Reviews.type";
import { useEffect, useState } from "react";
import { ShowCard } from "../ShowCard/ShowCard";
import { swrKeys } from "@/fetchers/swrKeys";
import { fetcherSecure } from "@/fetchers/fetcher";
import { mutatorDeleteSecure, mutatorSecure } from "@/fetchers/mutator";
import { Loader } from "@/components/shared/Loader/Loader";
import useSWRMutation from "swr/mutation";
import { processRequest } from "@/fetchers/processor";
import { IShow } from "@/typings/Show.type";

export const ShowReviewSection = ({ showId }: { showId: string }) => {
	const [reviewsList, setReviewsList] = useState({ reviews: [] });
	const [showCard, setShowCard] = useState({} as IShow);

	const {
		trigger: triggerShow,
		isMutating: isLoadingShow,
	} = useSWRMutation(swrKeys.showListItem(showId), fetcherSecure, {
		onSuccess: (data) => {
			setShowCard(data.show as IShow);
		}
	});

	const {
		trigger: triggerReviews,
		isMutating: isLoadingShowReviews,
	} = useSWRMutation(swrKeys.showReviewsList(showId), fetcherSecure, {
		onSuccess: (data) => {
			console.log(data);

			setReviewsList(data as IReviewsList);
		}
	});

	const { trigger: triggerReviewAdd } = useSWRMutation(swrKeys.reviewsList, mutatorSecure);

	useSWRMutation(swrKeys.showReviewItem(showId), mutatorDeleteSecure);

	useEffect(() => {
		triggerShow();
		triggerReviews();
	}, []);

	const onAddShowReview = async (review: IReview) => {
		const reviewAddResponse = await triggerReviewAdd({
			comment: review.comment,
			rating: review.rating,
			show_id: showId,
		});

		if (processRequest(reviewAddResponse).status === 'success') {
			await triggerShow(swrKeys.showListItem(showId));
			await triggerReviews(swrKeys.showReviewsList(showId));
		}
	}

	const onReviewDelete = async (review: IReview) => {
		const reviewDeleteResponse = await mutatorDeleteSecure(swrKeys.showReviewItem(review.id));

		if (reviewDeleteResponse) {
			await triggerShow(swrKeys.showListItem(showId));
			await triggerReviews(swrKeys.showReviewsList(showId));
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

				{isLoadingShowReviews ?
					<Loader /> :
					<>
						{reviewsList?.reviews?.length ?
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
					</>
				}
			</Flex>
		</>
	);
}
