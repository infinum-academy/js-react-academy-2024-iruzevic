'use client';

import { StarRatingInput } from "@/components/shared/StarRatingInput/StarRatingInput";
import { getCurrentUserEmail } from "@/fetchers/auth";
import { IReview } from "@/typings/Reviews.type";
import { Button, Flex, FormControl, FormErrorMessage, Heading, Input, Text } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

interface IReviewsFormProps {
	onAdd: (review: IReview) => void;
}
interface IReviewFormInputs {
	comment: string;
	rating: string;
}

export const ReviewsForm = ({ onAdd }: IReviewsFormProps) => {
	const {control, register, formState: { errors }, handleSubmit, getValues, reset} = useForm<IReviewFormInputs>();

	const onReviewAdd = (data: IReviewFormInputs) => {
		const newReview: IReview = {
			comment: data.comment,
			rating: data.rating,
			user: {
				email: getCurrentUserEmail(),
			}
		};

		onAdd(newReview);

		reset();
	};

	return (
		<Flex
			as='form'
			gap={4}
			flexDirection='column'
			border='1px'
			borderColor='purple.600'
			bgColor='purple.800'
			p={5}
			borderRadius={10}
			onSubmit={handleSubmit(onReviewAdd)}
		>
			<Heading
				as='h3'
				size='md'
			>
				Rate your show:
			</Heading>

			<FormControl isInvalid={Boolean(errors.comment)}>
				<Input
					type="text"
					placeholder="Add you comment here..."
					variant='flushed'
					color='white'
					focusBorderColor='purple.400'
					_placeholder={{ color: 'purple.200' }}
					{...register("comment", {
						required: "Comment is required.",
					})}
				/>
				<FormErrorMessage>{errors.comment?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={Boolean(errors.rating)}>
				<Flex
					gap={2}
					alignItems='center'
				>
					<Controller
						as="TextField"
						name="rating"
						control={control}
						defaultValue={''}
						rules={
							{ required: "Rating is required." }
						}
						render={({field}) => (
							<StarRatingInput
								{...field}
								value={field.value}
								onChange={field.onChange}
							/>
						)}
					/>
					<Text
						fontSize='sm'
						fontWeight='bold'
					>
						{getValues('rating')} / 5
					</Text>
				</Flex>
				<FormErrorMessage>{errors.rating?.message}</FormErrorMessage>
			</FormControl>

			<Button
				type="submit"
				colorScheme='pink'
			>
				Add
			</Button>
		</Flex>
	);
}

					// <StarRatingInput
					// 	as='input'
					// 	type='number'
					// 	value={ratingValue}
					// 	onChange={setRatingValue}
					// 	inputProps={
					// 		{...register("rating", {
					// 			required: "Rating is required.",
					// 		})}
					// 	}
					// />
