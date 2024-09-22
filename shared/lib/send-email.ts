import React from "react";
import { CreateEmailResponseSuccess, Resend } from "resend";

interface Props {
	to: string;
	subject: string;
	react: React.ReactNode
}

export const sendEmail = async ({ to, subject, react }: Props): Promise<CreateEmailResponseSuccess | null> => {
	const resend = new Resend(process.env.RESEND_API_KEY);

	const { data, error } = await resend.emails.send({
		from: "onboarding@resend.dev",
		to,
		subject,
		react,
	});

	if (error) {
		throw error;
	}

	return data;
};
