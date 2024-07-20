'use client';

import { Grid } from "@chakra-ui/react";
import useSWR from "swr";
import { ShowCard } from "../ShowCard/ShowCard";
import { fetcherSecure } from "@/fetchers/fetcher";
import { Loader } from "@/components/shared/Loader/Loader";

export const ShowListSection = ({ showList }) => {
	const { isLoading, data } = useSWR(showList, fetcherSecure);

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && data.shows.length &&
				<>
					<Grid
						templateColumns='repeat(3, 1fr)'
						gap={10}
					>
						{data.shows.map((show) => <ShowCard key={show.id} show={{
							title: show.title,
							description: show.description,
							imageUrl: show.image_url,
							averageRating: show.average_rating,
							link: `/all-shows/${show.id}`
						}} />)}
					</Grid>
				</>
			}
		</>
	);
}
