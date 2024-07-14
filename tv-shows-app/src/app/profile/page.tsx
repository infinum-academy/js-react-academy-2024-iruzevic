'use client'

import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect"
import { LayoutWithSidebar } from "@/components/shared/Layouts/LayoutWithSidebar/LayoutWithSidebar"
import { Heading } from "@chakra-ui/react"

export default function Profile() {
	return (
		<AuthRedirect>
			<LayoutWithSidebar>
				<Heading mb={5}>
					Profile
				</Heading>
				Show profile here
			</LayoutWithSidebar>
		</AuthRedirect>
	);
}
