
export const LayoutWithSidebar = () => {
	return (
		<Grid templateColumns="1fr 3fr" gap={4}>
			<Sidebar />
			<Flex direction="column" p={4}>
				{children}
			</Flex>
		</Grid>
	);
}
