import { IReview } from "@/typings/Rating.type";
import { Button, Checkbox, Flex, Text } from "@chakra-ui/react";

interface IReviewItemProps {
	rating: IReview;
}

export const ReviewItem = ({ review }: IReviewItemProps) => {
	return (
		<Flex alignItems="center" gap={2}>
			<Text flexGrow={1}>
				{review.title}
			</Text>
			<Text flexGrow={1}>
				{review.content}
			</Text>
			<Button
				colorScheme="red"
			>
				Delete
			</Button>
		</Flex>
	);
}
