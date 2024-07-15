'use client';

import React, { useState } from "react";
import { StarIcon } from "@chakra-ui/icons";
import { HStack, Box } from "@chakra-ui/react";

interface IStarRatingInputProps {
	value: number;
	onChange: (input: number) => void;
}

export const StarRatingInput = ({ value, onChange }: IStarRatingInputProps) => {
	const [hover, setHover] = useState(null);

	const count = 5;

	const hasOnChange = typeof onChange !== 'undefined';

	return (
		<HStack
			spacing={2}
			onMouseLeave={() => setHover(null)}
		>
			{[...Array(count)].map((star, index) => {
				const inputValue = index + 1;

				return (
					<Box
						as={hasOnChange ? 'button' : 'div'}

						key={index}
						color={(inputValue <= (hasOnChange ? hover || value : value)) ? "orange.300" : "gray.300"}
						onMouseEnter={() => setHover(inputValue)}
						onClick={(e) => {
							e.preventDefault();
							onChange?.(inputValue)
						}}
					>
						<StarIcon
							cursor={hasOnChange ? "pointer" : 'default'}
							boxSize={5}
							transition="color 200ms"
						/>
					</Box>
				);
			})}
		</HStack>
	);
}
