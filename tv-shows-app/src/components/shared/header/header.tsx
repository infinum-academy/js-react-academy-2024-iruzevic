import { Button, ButtonGroup, Flex, Heading } from "@chakra-ui/react";

export const Header = () => {
	return (
		<Flex
			justifyContent={'space-between'}
			padding={3}
			backgroundColor='purple.800'
			color='white'
		>
			<Heading>Tv Shows App</Heading>
		</Flex>
	);
}
