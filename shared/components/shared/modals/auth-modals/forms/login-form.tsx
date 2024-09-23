import React from "react";
import { Title } from "@/shared/components/shared/title";
import { Button } from "@/shared/components/ui/button";
import { TFormLoginData, formLoginSchema } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { FormInput } from "@/shared/components/shared/form";
import { signIn } from "next-auth/react";

interface Props {
  onClose?: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ onClose }) => {
	const form = useForm<TFormLoginData>({
		resolver: zodResolver(formLoginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: TFormLoginData) => {
		try {
			const resp = await signIn("credentials", {
				...data,
				redirect: false,
			});

			if (!resp?.ok) {
				throw new Error("Invalid credentials");
			}

			onClose?.();
		} catch (err) {
			console.log("Error [LOGIN]", err);
			toast.error("Не удалось войти в аккаунт", {
				icon: "❌",
			});
		}
	};

	return (
		<FormProvider {...form}>
			<form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
				<div className="flex justify-between items-center">
					<div className="mr-2">
						<Title text="Вход в аккаунт" size="md" className="font-bold" />
						<p className="text-gray-400">Введите электронную почту и пароль, чтобы войти в аккаунт</p>
					</div>
				</div>

				<FormInput name="email" label="E-Mail" required />
				<FormInput type="password" name="password" label="Пароль" required />

				<Button loading={form.formState.isSubmitting} className="h-12 text-base" type="submit">
					Войти
				</Button>
			</form>
		</FormProvider>
	);
};
