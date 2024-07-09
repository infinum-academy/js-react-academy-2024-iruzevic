import { StarRating } from "@/components/shared/StarRating/StarRating";
import { IReview } from "@/typings/Reviews.type";
import { Button, Flex, FormControl, FormErrorMessage, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";

interface IReviewsFormProps {
	onAdd: (review: IReview) => void;
}

const validationInitialState = {
	commentIsError: false,
	ratingIsError: false,
};

export const ReviewsForm = ({onAdd}: IReviewsFormProps) => {
	const [validation, setValidation] = useState(validationInitialState);
	const [ratingValue, setRatingValue] = useState(0);

	const onClickHandler = () => {
		const comment = document.getElementById('js-comment') as HTMLInputElement;

		const newValidation = {}

		if (comment.value === '') {
			newValidation.commentIsError = true;
		}

		if (!ratingValue) {
			newValidation.ratingIsError = true;
		}

		const validationCheck = Object.values(newValidation).some(value => value === true);

		if (validationCheck) {
			setValidation(newValidation);
			return;
		}

		const newReview: IReview = {
			comment: comment.value,
			rating: ratingValue,
		};

		onAdd(newReview);

		comment.value = '';
		setRatingValue(0);
		setValidation(validationInitialState);
	};

	return (
		<Flex
			gap={4}
			flexDirection='column'
			border='1px'
			borderColor='purple.600'
			bgColor={'purple.800'}
			p={5}
			borderRadius={10}
		>
			<Heading
				as={'h3'}
				size='md'
			>
				Rate your show:
			</Heading>

			<FormControl isInvalid={validation.commentIsError}>
				<Input
					id="js-comment"
					placeholder="Add you comment here..."
					variant='flushed'
					required
					color='white'
					_placeholder={{ color: 'purple.200' }}
					focusBorderColor='purple.400'
				/>
				{validation.commentIsError && <FormErrorMessage>Comment is required.</FormErrorMessage>}
			</FormControl>

			<FormControl isInvalid={validation.ratingIsError || validation.ratingIsErrorRange}>
				<Flex
					gap={2}
					alignItems='center'
				>
					<StarRating
						rating={ratingValue}
						setRating={setRatingValue}
					/>
					<Text
						fontSize='sm'
						fontWeight='bold'
					>
						{ratingValue} / 5
					</Text>
				</Flex>
				{validation.ratingIsError && <FormErrorMessage>Rating is required.</FormErrorMessage>}
			</FormControl>

			<Button
				colorScheme='pink'
				onClick={onClickHandler}
			>
				Add
			</Button>
		</Flex>
	);
}
