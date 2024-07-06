import { IReview } from "@/typings/Reviews.type";
import { Button, Flex, Input } from "@chakra-ui/react";

interface IReviewsFormProps {
	onAdd: (review: IReview) => void;
}

export const ReviewsForm = ({onAdd}: IReviewsFormProps) => {
	const onClickHandler = () => {
		const inputElement = document.getElementById('title-input') as HTMLInputElement;
		const value = inputElement.value;
		const newTodo: IReview = {
			title: value,
			done: false
		};

		onAdd(newTodo);
	};

	return (
		<Flex gap={12}>
			<Input
				id="title-input"
				placeholder="I need to..."
				variant='flushed'
			/>
			<Button onClick={onClickHandler}>Add</Button>
		</Flex>
	);
}
