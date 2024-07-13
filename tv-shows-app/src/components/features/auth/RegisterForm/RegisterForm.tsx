'use client'

import { mutatorLogin } from "@/fetchers/mutator";
import { Alert, AlertIcon, Button, FormControl, FormLabel, Heading, Input, Link, Text, chakra } from "@chakra-ui/react";
import { useState } from "react";
import NexLink from "next/link";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import { useRouter } from "next/navigation";
import { swrKeys } from "@/fetchers/swrKeys";

interface IRegisterFormInputs {
	email: string;
	password: string;
	password_confirmation: string;
}

export const RegisterForm = () => {
	const router = useRouter();
	const { register, handleSubmit} = useForm<IRegisterFormInputs>();
	const [globalError, setGlobalError] = useState([]);

	const { trigger } = useSWRMutation(swrKeys.register, mutatorLogin, {
		onSuccess: (data) => {
			if (data.status === 'error') {
				setGlobalError(data.data);
				return;
			}

			router.push('/');
		}
	})

	const onRegister = async(data: IRegisterFormInputs) => {
		setGlobalError([]);
		await trigger(data);
	}

	return (
		<chakra.form
			flexDirection="column"
			alignItems="center"
			display="flex"
			gap={4}
			onSubmit={handleSubmit(onRegister)}
		>
			<Heading
				as="h2"
				size="lg"
			>
				Register
			</Heading>
			<Text
				textAlign='center'
			>
				Welcome to the registration page.<br/>
				Please fill out the form below to create your account.
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
				<Input {...register("email")} required type="email" />
			</FormControl>

			<FormControl isRequired={true}>
				<FormLabel>Password</FormLabel>
				<Input {...register("password")} required type="password" />
			</FormControl>

			<FormControl isRequired={true}>
				<FormLabel>Confirm Password</FormLabel>
				<Input {...register("password_confirmation")} required type="password" />
			</FormControl>

			<Button type="submit">
				Register
			</Button>

			<Text>
				Already have an account? <Link as={NexLink} href="/login" fontWeight='bold'>Login</Link>
			</Text>

		</chakra.form>
	);
}
