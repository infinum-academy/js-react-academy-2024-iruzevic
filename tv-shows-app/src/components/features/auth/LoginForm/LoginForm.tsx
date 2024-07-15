'use client'

import { mutatorLogin } from "@/fetchers/mutator";
import { Alert, AlertIcon, Button, FormControl, FormLabel, Heading, Input, Link, Text, chakra } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import NexLink from "next/link";
import { swrKeys } from "@/fetchers/swrKeys";

interface ILoginFormInputs {
	email: string;
	password: string;
}

export const LoginForm = () => {
	const router = useRouter();
	const {register, handleSubmit} = useForm<ILoginFormInputs>();
	const [globalError, setGlobalError] = useState([]);

	const { trigger } = useSWRMutation(swrKeys.login, mutatorLogin, {
		onSuccess: (data) => {
			if (data.status === 'error') {
				setGlobalError(data.data);
				return;
			}

			router.push('/');
		},
	});

	const onLogin = async(data: ILoginFormInputs) => {
		setGlobalError([]);
		await trigger(data);
	}

	return (
		<chakra.form
			flexDirection="column"
			alignItems="center"
			display="flex"
			gap={4}
			onSubmit={handleSubmit(onLogin)}
		>
			<Heading
				as="h2"
				size="lg"
			>
				Login to your
			</Heading>

			<Text
				textAlign='center'
			>
				Please login to your account or register if you don't have one.
			</Text>

			{globalError.length > 0 &&
				<Alert
					color='black'
					status='error'
				>
					<AlertIcon />
					{globalError.map((error, index) => error)}
				</Alert>
			}

			<FormControl isRequired={true}>
				<FormLabel>Email</FormLabel>
				<Input {...register("email", )} required type="email" />
			</FormControl>

			<FormControl isRequired={true}>
				<FormLabel>Password</FormLabel>
				<Input {...register("password")} required type="password" />
			</FormControl>

			<Button type="submit">
				Login
			</Button>

			<Text>
				Don't have an account? <Link as={NexLink} href="/register" fontWeight='bold'>Register</Link>
			</Text>
			
		</chakra.form>
	);
}
