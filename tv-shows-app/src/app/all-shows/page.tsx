'use client'

import { ShowCard } from "@/components/features/shows/ShowCard/ShowCard";
import { LayoutWithSidebar } from "@/components/shared/Layouts/LayoutWithSidebar/LayoutWithSidebar";
import { fetcherSecure } from "@/fetchers/fetcher";
import { swrKeys } from "@/fetchers/swrKeys";
import { Grid, Spinner } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";

export default function AllShows() {
	const [shows, setShows] = useState([]);

	const {
		data,
		error,
		isLoading
	} = useSWR(swrKeys.showsList, fetcherSecure, {
		onSuccess: (data) => {
			setShows(data.shows);
		}
	});

	return (
		<LayoutWithSidebar>
			{isLoading && <Spinner color='red.500' size='xl' />}
			{!isLoading && 
				<>
					<h1>All Shows</h1>
					<Grid
						templateColumns='repeat(4, 1fr)'
						gap={10}
					>
						{shows.map((show) => <ShowCard key={show.id} show={{
							title: show.title,
							description: show.description,
							imageUrl: show.image_url,
							averageRating: show.average_rating
						}} />)}
					</Grid>
				</>
			}
		</LayoutWithSidebar>
	);
}
