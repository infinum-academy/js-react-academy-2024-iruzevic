'use client';

import { StarRating } from "@/components/shared/StarRating/StarRating";
import { IShow } from "@/typings/Show.type";
import { Card, CardBody, Flex, Heading, Image, Text } from "@chakra-ui/react";

interface IShowDetailsProps {
	show: IShow;
}

export const ShowDetails = ({ show }: IShowDetailsProps) => {
	return (
		<Card
			mb={4}
			borderRadius={10}
		>
			<Image
				borderRadius={10}
				objectFit='cover'
				src={show.imageUrl}
				alt='Chakra UI'
			/>
			<CardBody
				py={10}
			>
				<Heading
					as='h2'
					size='lg'
					fontWeight='bold'
					mb={4}
				>
					{show.title}
				</Heading>
				<Text mb={4}>
					{show.description}
				</Text>

				<Flex
					gap={2}
					alignItems='center'
				>
					{
						show.averageRating ?
						<>
							<StarRating rating={show.averageRating} />
							<Text
								fontSize='sm'
								fontWeight='bold'
							>
								{show.averageRating} / 5
							</Text>
						</> :
						<Text
							fontWeight='bold'
							color={"gray.400"}
						>
							no ratings
						</Text>
					}
				</Flex>
			</CardBody>
		</Card>
	);
}
