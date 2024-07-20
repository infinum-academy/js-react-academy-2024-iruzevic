'use client'

import { LoginForm } from "@/components/features/auth/LoginForm/LoginForm";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";

export default function LoginPage() {
	return (
		<AuthRedirect>
			<LoginForm />
		</AuthRedirect>
	)
}
