'use client';

import { Flex, Text } from "@chakra-ui/react"
import { ReviewsList } from "../../review/ReviewsList/ReviewsList"
import { ReviewsForm } from "../ReviewForm/ReviewForm";
import { IReview } from "@/typings/Reviews.type";
import { ShowCard } from "../ShowCard/ShowCard";
import { swrKeys } from "@/fetchers/swrKeys";
import { fetcherSecure } from "@/fetchers/fetcher";
import { mutatorDeleteSecure, mutatorSecure } from "@/fetchers/mutator";
import { Loader } from "@/components/shared/Loader/Loader";
import useSWRMutation from "swr/mutation";
import { processRequest } from "@/fetchers/processor";
import useSWR, {useSWRConfig} from "swr";

export const ShowReviewSection = ({ showId }: { showId: string }) => {
	const { mutate } = useSWRConfig();
	const {
		data: dataShow,
		isLoading: isLoadingShow,
	} = useSWR(swrKeys.showListItem(showId), fetcherSecure);

	const {
		data: dataReviews,
		isLoading: isLoadingShowReviews,
	} = useSWR(swrKeys.showReviewsList(showId), fetcherSecure);

	const { trigger: triggerReviewAdd } = useSWRMutation(swrKeys.reviewsList, mutatorSecure);

	useSWRMutation(swrKeys.showReviewItem(showId), mutatorDeleteSecure);

	const onAddShowReview = async (review: IReview) => {
		const reviewAddResponse = await triggerReviewAdd({
			comment: review.comment,
			rating: review.rating,
			show_id: showId,
		});

		if (processRequest(reviewAddResponse).status === 'success') {
			mutate(swrKeys.showReviewsList(showId));
			mutate(swrKeys.showListItem(showId));
		}
	}

	const onReviewDelete = async (review: IReview) => {
		const reviewDeleteResponse = await mutatorDeleteSecure(swrKeys.showReviewItem(review.id));

		if (reviewDeleteResponse) {
			mutate(swrKeys.showReviewsList(showId));
			mutate(swrKeys.showListItem(showId));
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
					title: dataShow.show.title,
					description: dataShow.show.description,
					imageUrl: dataShow.show.image_url,
					averageRating: dataShow.show.average_rating,
				}} />

				<ReviewsForm onAdd={onAddShowReview} />

				{isLoadingShowReviews ?
					<Loader /> :
					<>
						{dataReviews?.reviews?.length ?
							<ReviewsList
								reviewsList={dataReviews?.reviews}
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
