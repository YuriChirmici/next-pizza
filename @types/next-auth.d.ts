// Ref: https://next-auth.js.org/getting-started/typescript#module-augmentation

import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
import type { UserRole } from "@prisma/client";

interface UserFields {
	id: number;
	name: string;
	role: UserRole;
}

declare module "next-auth" {
	interface Session {
		user: UserFields;
	}

	interface User extends DefaultUser {
		id: number;
		role: UserRole;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: number;
		role: UserRole;
	}
}
