import React from "react";
import { Dialog, DialogContent } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
  open: boolean;
  onClose: VoidFunction;
}

type TProviders = "github" | "google"; // TODO: move
type TAuthType = "login" | "register";

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [ type, setType ] = React.useState<TAuthType>("login");

	const onSwitchType = () => {
		setType(type === "login" ? "register" : "login");
	};

	const handleClose = () => {
		onClose();
		setType("login");
	};

	const onSignIn = (provider: TProviders) => {
		signIn(provider, {
			callbackUrl: "/",
			redirect: true,
		});
	};

	return (
		<Dialog open={open} onOpenChange={handleClose}>
			<DialogContent className="w-[450px] bg-white p-10">
				{type === "login" ? (
					<LoginForm onClose={handleClose} />
				) : (
					<RegisterForm onClose={handleClose} />
				)}

				<hr />

				<div className="flex gap-2">
					<Button
						variant="secondary"
						onClick={() => onSignIn("github")}
						type="button"
						className="gap-2 h-12 p-2 flex-1"
					>
						{/* <Github /> */}
						<img className="w-6 h-6" src="https://github.githubassets.com/favicons/favicon.svg" />
           				GitHub
					</Button>

					<Button
						variant="secondary"
						onClick={() => onSignIn("google")}
						type="button"
						className="gap-2 h-12 p-2 flex-1"
					>
						<img
							className="w-6 h-6"
							src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
						/>
            				Google
					</Button>
				</div>

				<Button variant="outline" onClick={onSwitchType} type="button" className="h-12">
					{type !== "login" ? "Войти" : "Регистрация"}
				</Button>
			</DialogContent>
		</Dialog>
	);
};
