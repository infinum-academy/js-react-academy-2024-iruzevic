'use client'

import { Flex } from "@chakra-ui/react";
import styles from "./page.module.css";
import { CardHighlight } from "@/components/shared/CardHighlight/CardHighlight";
import { ReviewsForm } from "@/components/shared/ReviewsForm/ReviewsForm";
import { ReviewsList } from "@/components/features/ReviewsList/ReviewsList";
import { useEffect, useState } from "react";
import { IReview } from "@/typings/Reviews.type";

const mockReviewsList = {
	title: "Reviews list",
	reviews: [
		{
			title: 'Review 1',
			content: 'Review 1',
			rate: 1,
		},
		{
			title: 'Review 2',
			content: 'Review 2',
			rate: 2,
		},
		{
			title: 'Review 3',
			content: 'Review 3',
			rate: 3,
		},
	],
};

export default function Home() {
	const [reviewsList, setReviewsList] = useState(mockReviewsList);

	useEffect(() => {
		const loadedList = loadFromLocalStorage();
		setReviewsList(loadedList);
	}, []);

	useEffect(() => {
		saveToLocalStorage();
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

	const onAddReview = (review: IReview) => {
		const newReviewList = {
			title: reviewsList.title,
			reviews: [review, ...reviewsList.reviews],
		}

		setReviewsList(newReviewList);
	}

	return (
		<Flex
			backgroundColor='purple.800'
			gap={2}
			flexDirection='column'
		>
			<CardHighlight />
			<ReviewsForm onAdd={onAddReview}  />
			{
				reviewsList.reviews.length &&
				<ReviewsList reviewsList={reviewsList} />
			}
		</Flex>
	);
}
