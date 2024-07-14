'use client';

import { processRequest } from "@/fetchers/processor";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useSearchParams, usePathname } from "next/navigation";
import { Loader } from "../Loader/Loader";

export const AuthRedirect = ({children}) => {
	const loggedInTo = '/all-shows';
	const loggedOutTo = '/login';

	const router = useRouter();
	const {data, isLoading} = useUser();
	const searchParams = useSearchParams();
	const pathname = usePathname();

	if (isLoading) {
		return <Loader />;
	}

	// const logout = searchParams.get('logout');

	// if (logout === 'true') {
	// 	localStorage.removeItem('authToken');
	// 	router.push(loggedOutTo);
	// }

	const user = processRequest(data);

	if (user.status === 'error') {
		router.push(loggedOutTo);
		return;
	}

	if (user.status === 'success' && ['/login', '/register', '/'].includes(pathname)) {
		router.push(loggedInTo);
		return;
	}

	return children;
}
