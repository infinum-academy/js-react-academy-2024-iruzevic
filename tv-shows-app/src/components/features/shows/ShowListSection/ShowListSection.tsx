import { Grid, Heading } from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";
import { ShowCard } from "../ShowCard/ShowCard";
import { fetcherSecure } from "@/fetchers/fetcher";
import { Loader } from "@/components/shared/Loader/Loader";

export const ShowListSection = ({showList}) => {
	const [shows, setShows] = useState([]);

	const {
		data,
		error,
		isLoading
	} = useSWR(showList, fetcherSecure, {
		onSuccess: (data) => {
			setShows(data.shows);
		}
	});

	return (
		<>
			{isLoading && <Loader />}
			{!isLoading && shows.length && 
				<>
					<Grid
						templateColumns='repeat(3, 1fr)'
						gap={10}
					>
						{shows.map((show) => <ShowCard key={show.id} show={{
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
