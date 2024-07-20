'use client'

import { mutatorLogin } from "@/fetchers/mutator";
import { Alert, AlertIcon, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Link, Text, chakra } from "@chakra-ui/react";
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
	const { register, formState: { errors }, getValues, watch, handleSubmit} = useForm<IRegisterFormInputs>();
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

		if (data.password !== data.password_confirmation) {
			setGlobalError(['Passwords do not match']);
			return;
		}
		
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
					{globalError.map((error) => error)}
				</Alert>
			}

			<FormControl isInvalid={Boolean(errors.email)}>
				<FormLabel>Email</FormLabel>
				<Input type="email"
					{...register("email", {
						required: "Email is required.",
					})}
				/>
				<FormErrorMessage>{errors.email?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={Boolean(errors.password)}>
				<FormLabel>Password</FormLabel>
				<Input type="password"
					{...register("password", {
						required: "Password is required.",
					})} />
				<FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
			</FormControl>

			<FormControl isInvalid={Boolean(errors.password_confirmation)}>
			<FormLabel>Confirm Password</FormLabel>
				<Input type="password"
					{...register("password_confirmation", {
						required: "Password is required.",
						validate: {
							matches: (value) => value === getValues('password') || 'Passwords do not match',
						},
					})} />
				<FormErrorMessage>{errors?.password_confirmation?.message}</FormErrorMessage>
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
