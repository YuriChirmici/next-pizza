import React from "react";

interface Props {
	code: string;
	userId: number;
}

export const UserVerificationTemplate: React.FC<Props> = ({ code, userId }) => {
	return (
		<div>
			<p>Код подтверждения: <h2>{code}</h2></p>
			<p>
				<a href={`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?code=${code}&userId=${userId}`}>
					Подтвердить регистрацию
				</a>
			</p>
		</div>
	);
};
