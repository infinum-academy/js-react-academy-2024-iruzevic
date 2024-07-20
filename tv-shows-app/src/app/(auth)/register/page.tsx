'use client'

import { RegisterForm } from "@/components/features/auth/RegisterForm/RegisterForm";
import { AuthRedirect } from "@/components/shared/AuthRedirect/AuthRedirect";

export default function RegisterPage() {
	return (
		<AuthRedirect>
			<RegisterForm />
		</AuthRedirect>
	);
}
