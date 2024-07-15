'use client';

import { Flex, Text } from "@chakra-ui/react"
import { ReviewsList } from "../../review/ReviewsList/ReviewsList"
import { ReviewsForm } from "../ReviewForm/ReviewForm";
import { IReview } from "@/typings/Reviews.type";
import { useEffect, useState } from "react";
import { ShowDetails } from "../ShowDetails/ShowDetails";
import { set } from "ol/transform";

const mockReviewsList = {
	reviews: [
		{
			comment: 'Review 1',
			rating: 1,
		},
		{
			comment: 'Review 2',
			rating: 2,
		},
	],
};

const mockShowDetails = {
	title: 'Arrow',
	imageUrl: 'https://static.wikia.nocookie.net/arrow/images/1/1e/Arrow_Season_8_Poster.jpg',
	description: 'Arrow is an American superhero television series developed by Greg Berlanti, Marc Guggenheim, and Andrew Kreisberg based on the DC Comics character Green Arrow, a costumed crime-fighter created by Mort Weisinger and George Papp, and is set in the Arrowverse, sharing continuity with other Arrowverse television series.',
	averageRating: 0,
};

export const ShowReviewSection = () => {
	const [reviewsList, setReviewsList] = useState(mockReviewsList);
	const [showDetails, setShowDetails] = useState(mockShowDetails);

	useEffect(() => {
		const loadedList = loadFromLocalStorage();

		setReviewsList(loadedList);
	}, []);

	useEffect(() => {
		calculateAverageRating();

		if (reviewsList !== mockReviewsList) {
			saveToLocalStorage();
		}
	}, [reviewsList]);

	const saveToLocalStorage = () => {
		localStorage.setItem('reviews-lists', JSON.stringify(reviewsList));
	}

	const loadFromLocalStorage = () => {
		const reviewsListOutput = localStorage.getItem('reviews-lists');

		if (!reviewsListOutput) {
			return mockReviewsList;
		}

		return JSON.parse(reviewsListOutput);
	}

	const onAddShowReview = (review: IReview) => {
		const newReviewList = {
			title: reviewsList.title,
			reviews: [review, ...reviewsList.reviews],
		}

		setReviewsList(newReviewList);
	}

	const onReviewDelete = (review: IReview) => {
		const newReviewList = {
			title: reviewsList.title,
			reviews: reviewsList.reviews.filter(r => r !== review),
		}

		setReviewsList(newReviewList);
	}

	const calculateAverageRating = () => {
		let totalRating = 0;
		
		reviewsList.reviews.forEach((review) => {
			return totalRating += review.rating;
		});

		setShowDetails({
			...showDetails,
			averageRating: (reviewsList.reviews.length > 0) ? Math.round((totalRating / reviewsList.reviews.length) * 100) / 100 : 0,
		});
	}

	return (
		<Flex
			direction='column'
			gap={4}
			pb={4}
		>
			<ShowDetails
				show={showDetails}
			/>

			<ReviewsForm onAdd={onAddShowReview} />

			{
				reviewsList.reviews.length ?
				<ReviewsList reviewsList={reviewsList} onReviewDelete={onReviewDelete} />: 
				<Text
					px={4}
					textAlign='center'
					fontWeight='bold'
				>No reviews yet</Text>
			}
		</Flex>
	);
}
