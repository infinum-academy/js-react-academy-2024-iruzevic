import { Container, Flex } from "@chakra-ui/react";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthRedirect>
			<Flex
				direction="column"
				p={4}
				justifyContent="center"
				minH="100vh"
			>
				<Container
					bgColor={"purple.600"}
					p={4, 8}
					borderRadius={10}
				>
					{children}
				</Container>
			</Flex>
		</AuthRedirect>
	);
}
