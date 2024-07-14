'use client'

import { LayoutWithSidebar } from "@/components/shared/Layouts/LayoutWithSidebar/LayoutWithSidebar";
import { useParams } from "next/navigation";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";

export default function ShowItem() {
	const params = useParams();

	return (
		<AuthRedirect>
			<LayoutWithSidebar>
				<ShowReviewSection showId={params.id} />
			</LayoutWithSidebar>
		</AuthRedirect>
	);
}
