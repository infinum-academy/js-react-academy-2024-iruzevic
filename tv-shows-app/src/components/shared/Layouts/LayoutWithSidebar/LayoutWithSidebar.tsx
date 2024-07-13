import { Flex, Grid } from "@chakra-ui/react";
import { Sidebar } from "../../Sidebar/Sidebar";

export const LayoutWithSidebar = ({children}) => {
	return (
		<Grid templateColumns="1fr 3fr" gap={4}>
			<Sidebar />
			<Flex direction="column" p={4}>
				{children}
			</Flex>
		</Grid>
	);
}
