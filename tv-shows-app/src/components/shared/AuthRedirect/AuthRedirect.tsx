'use client';

import { processRequest } from "@/fetchers/processor";
import { useUser } from "@/hooks/useUser";
import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

interface IAuthRedirectProps {
	to: string;
	condition: 'isLoggedIn' | 'isLoggedOut';
}

export const AuthRedirect = ({to, condition}: IAuthRedirectProps) => {
	const router = useRouter();
	const {data, isLoading} = useUser();
	const searchParams = useSearchParams();g

	useEffect(() => {
		if (isLoading) {
			return;
		}

		const logout = searchParams.get('logout');

		if (logout === 'true') {
			localStorage.removeItem('authToken');
			router.push('/');
		}

		const user = processRequest(data);

		if (user.status === 'error' && condition === 'isLoggedOut') {
			router.push('/login');
		}

		if (user.status === 'success' && condition === 'isLoggedIn') {
			router.push(to);
		}
	}, [data, condition, router, to, isLoading]);

	if (isLoading) {
		return (
			<Flex justifyContent='center' alignItems='center' h='100vh'>
				<Spinner color='red.500' size='xl' />
			</Flex>
		)
	}

	return;
}
