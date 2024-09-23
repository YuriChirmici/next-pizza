import { z } from "zod";

const minPasswordLength = 6;
export const passwordSchema = z.string().min(
	minPasswordLength,
	{ message: `Пароль должен содержать минимум ${minPasswordLength} символов` }
);

export const formLoginSchema = z.object({
	email: z.string().email({ message: "Введите корректную почту" }),
	password: passwordSchema,
});

export const formRegisterSchema = formLoginSchema
	.merge(
		z.object({
			fullName: z.string().min(2, { message: "Введите имя и фамилию" }),
			confirmPassword: passwordSchema,
		}),
	)
	.refine((data) => data.password === data.confirmPassword, {
		message: "Пароли не совпадают",
		path: [ "confirmPassword" ],
	});

export type TFormLoginData = z.infer<typeof formLoginSchema>;
export type TFormRegisterData = z.infer<typeof formRegisterSchema>;
