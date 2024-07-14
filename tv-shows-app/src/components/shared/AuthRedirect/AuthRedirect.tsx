'use client';

import { processRequest } from "@/fetchers/processor";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { Loader } from "../Loader/Loader";

export const AuthRedirect = ({children}) => {
	const loggedInPath = '/all-shows';
	const loggedOutPath = '/login';

	const {data, isLoading} = useUser();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const logoutParam = searchParams.get('logout');
	const router = useRouter();

	if (isLoading) {
		return <Loader />;
	}

	const user = processRequest(data);

	if (user.status === 'error' && !['/login', '/register'].includes(pathname)) {
		router.push(loggedOutPath);
		return;
	}

	if (user.status === 'success') {
		if (logoutParam === 'true') {
			localStorage.removeItem('authToken');
			router.push('/');
			return;
		}

		if (['/login', '/register', '/'].includes(pathname)) {
			router.push(loggedInPath);
			return;
		}
	}

	return children;
}
