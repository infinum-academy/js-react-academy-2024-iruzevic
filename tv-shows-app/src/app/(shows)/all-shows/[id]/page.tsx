'use client'

import { useParams } from "next/navigation";
import { ShowReviewSection } from "@/components/features/shows/ShowReviewSection/ShowReviewSection";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";

export default function ShowItem() {
	const params = useParams();

	return (
		<AuthRedirect>
			<ShowReviewSection showId={params.id} />
		</AuthRedirect>
	);
}
