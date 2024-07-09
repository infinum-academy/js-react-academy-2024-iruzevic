'use client';

import React, { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { Radio, HStack, Hide, Box } from "@chakra-ui/react";

interface IStarRatingProps {
	rating: number;
	setRating: (rating: number) => void;
	count?: number;
	size?: number;
}

export const StarRating = ({ rating, setRating, count, size }: IStarRatingProps) => {
	const [hover, setHover] = useState(null);

	const isSetRating = typeof setRating !== 'undefined';

	return (
		<HStack spacing={2}>
			{[...Array(count || 5)].map((star, index) => {
				const ratingValue = index + 1;

				return (
					<Box
						key={index}
						color={(ratingValue <= (isSetRating ? hover || rating : rating)) ? "#ffc107" : "#e4e5e9"}
						onMouseEnter={() => setHover(ratingValue)}
						onMouseLeave={() => setHover(null)}
					>
						<StarIcon
							cursor={isSetRating && "pointer"}
							size={size || 20}
							transition="color 200ms"
							onClick={() => setRating(ratingValue)}
						/>
					</Box>
				);
			})}
		</HStack>
	);
}
