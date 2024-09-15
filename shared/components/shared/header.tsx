import { cn } from "@/shared/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { User } from "lucide-react";
import { Button } from "../ui";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { CartButton } from "./cart-button";

interface Props {
	hasSearch?: boolean;
	hasCart?: boolean;
	className?: string;
}

export const Header: React.FC<Props> = ({ className, hasSearch = true, hasCart = true }) => {
	return (
		<header className={cn("border-b", className)}>
			<Container className="flex items-center justify-between py-8">

				<Link href="/">
					<div className="flex items-center gap-4">
						<Image src="/logo.png" alt="Logo" width={35} height={35} />
						<div>
							<h1 className="text-2xl uppercase font-black">Next Pizza</h1>
							<p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
						</div>
					</div>
				</Link>

				<div className="mx-10 flex-1">
					{ hasSearch && <SearchInput /> }
				</div>

				<div className="flex items-center justify-between gap-4">
					<Button variant={"outline"} className="flex items-center gap-1">
						<User size={16} />
						<span> Войти </span>
					</Button>

					{ hasCart && <CartButton /> }
				</div>
			</Container>
		</header>
	);
};
