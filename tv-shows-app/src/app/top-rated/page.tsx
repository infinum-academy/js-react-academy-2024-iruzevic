'use client'

import { ShowListSection } from "@/components/features/shows/ShowListSection/ShowListSection";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";
import { LayoutWithSidebar } from "@/components/shared/Layouts/LayoutWithSidebar/LayoutWithSidebar";
import { swrKeys } from "@/fetchers/swrKeys";
import { Heading } from "@chakra-ui/react";

export default function TopRated() {
	return (
		<AuthRedirect>
			<LayoutWithSidebar>
				<Heading mb={5}>
					Top rated shows
				</Heading>
				<ShowListSection showList={swrKeys.showsTopRatedList} />
			</LayoutWithSidebar>
		</AuthRedirect>
	);
}
