import { Container, Flex, Heading } from "@chakra-ui/react";
import { ReviewItem } from "../ReviewItem/ReviewItem";
import { IReviewsList } from "@/typings/Reviews.type";

interface IReviewsListProps {
	reviewsList: IReviewsList;
}

export const ReviewsList = ({reviewsList}: IReviewsListProps) => {
	return (
		<Container>
			<Heading size="md" marginBottom={2}>
				{reviewsList.title}
			</Heading>

			<Flex direction="column" gap={3} marginTop={3}>
				{reviewsList.reviews.map((review, i) => (
					<ReviewItem key={i} review={review} />
				))}
			</Flex>
		</Container>
	);
}
