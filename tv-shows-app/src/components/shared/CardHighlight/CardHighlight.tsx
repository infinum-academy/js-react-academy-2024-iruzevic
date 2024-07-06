
import { Avatar, Box, Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, IconButton, Image, Text } from "@chakra-ui/react";

export const CardHighlight = () => {
	return (
		<Card maxW='md'>
			<Image
				objectFit='cover'
				src='https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
				alt='Chakra UI'
			/>
			<CardBody>
				<Heading size='sm'>Arrow</Heading>
				<Text>
					Arrow is an American superhero television series developed by Greg Berlanti, Marc Guggenheim, and Andrew Kreisberg based on the DC Comics character Green Arrow, a costumed crime-fighter created by Mort Weisinger and George Papp, and is set in the Arrowverse, sharing continuity with other Arrowverse television series.
				</Text>
			</CardBody>
		</Card>
	);
}
