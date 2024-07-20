'use client'

import { LayoutWithSidebar } from "@/components/shared/Layouts/LayoutWithSidebar/LayoutWithSidebar";

export default function ShowsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<LayoutWithSidebar>
			{children}
		</LayoutWithSidebar>
	);
}
