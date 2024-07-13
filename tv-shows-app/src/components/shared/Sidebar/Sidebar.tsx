'use client';

import { Flex, Heading, Link, ListItem, UnorderedList } from "@chakra-ui/react";
import NexLink from "next/link";

interface ISidebarProps {
	items;
}

const sidebarMock = [
	{ name: 'All shows', url: '/shows' },
	{ name: 'Top rated', url: '/top-rated' },
	{ name: 'My profile', url: '/profile' },
];

export const Sidebar = ({ items }: ISidebarProps) => {
	const sidebarItems = items || sidebarMock;
	return (
		<Flex
			direction="column"
		>
			<Heading
				as="h2"
				size="lg"
				p={4}
			>
				My TV Shows
			</Heading>

			<UnorderedList>
				{sidebarItems.map((item) => (
					<ListItem  key={item.url}>
						<Link as={NexLink} href={item.url}>{item.name}</Link>
					</ListItem>
				))}
			</UnorderedList>
		</Flex>
	);
}
