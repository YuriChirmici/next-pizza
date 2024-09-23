"use client";

import React from "react";
import { CircleUser, User } from "lucide-react";
import { Button } from "../ui";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";

interface Props {
	onClickSignIn?: () => void;
	className?: string;
}

export const ProfileButton: React.FC<Props> = ({ className, onClickSignIn }) => {
	const { data: session } = useSession();
	// const onSignIn = () => {
	// 	signIn("github", {
	// 		callbackUrl: "/",
	// 		redirect: true,
	// 	});
	// };

	return (
		<div className={className}>
			{
				session ? (
					<Link href="/profile">
						<Button variant="secondary" className="flex items-center gap-2">
							<CircleUser size={18} />
							Профиль
						</Button>
					</Link>
				) : (
					<Button onClick={onClickSignIn} variant={"outline"} className="flex items-center gap-1">
						<User size={16} />
						<span> Войти </span>
					</Button>
				)
			}
		</div>
	);
};
