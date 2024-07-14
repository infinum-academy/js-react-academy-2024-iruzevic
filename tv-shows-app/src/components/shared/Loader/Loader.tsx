import { Flex, Spinner } from "@chakra-ui/react";

export const Loader = () => {
	return (
		<Flex justifyContent='center' alignItems='center' h='100vh'>
			<Spinner color='red.500' size='xl' />
		</Flex>
	);
};
