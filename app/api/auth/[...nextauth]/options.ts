import { Account, AuthOptions, User as NextAuthUser } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/prisma/prisma-client";
import { compare } from "bcrypt";
import { UserRole } from "@prisma/client";
import { AdapterUser } from "next-auth/adapters";

const authOptions: AuthOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
			profile(profile) {
				return {
					id: profile.id,
					name: profile.name || profile.login,
					email: profile.email,
					image: profile.avatar_url,
					role: "USER" as UserRole,
				};
			}
		}),
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials) {
					return null;
				}

				const values = {
					email: credentials.email,
				};

				const foundUser = await prisma.user.findUnique({ where: values });
				if (!foundUser?.password) {
					// user not found, or is signed up with a provider
					return null;
				}

				const isPasswordValid = await compare(credentials.password, foundUser.password);
				if (!isPasswordValid) {
					return null;
				}

				if (!foundUser.verified) {
					return null;
				}

				return {
					id: foundUser.id,
					email: foundUser.email,
					name: foundUser.fullName,
					role: foundUser.role,
				};
			},
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === "credentials") {
					return true;
				}

				const success = await authUserWithProvider(user, account);
				return success;
			} catch (err) {
				console.log("Error [SIGN_IN]", err);
				return false;
			}
		},
		async jwt({ token }) {
			if (!token.email) {
				return token;
			}

			const user = await prisma.user.findUnique({
				where: {
					email: token.email
				}
			});

			if (user) {
				token.id = user.id;
				token.email = user.email;
				token.name = user.fullName;
				token.role = user.role;
			}

			return token;
		},
		async session({ session, token }) {
			if (session?.user) {
				session.user.id = token.id;
				session.user.role = token.role;
			}

			return session;
		},
	}
};

const authUserWithProvider = async (user: NextAuthUser | AdapterUser, account: Account | null) => {
	if (!user.email) {
		return false;
	}

	const foundUser = await prisma.user.findFirst({
		where: {
			OR: [
				{ email: user.email }
			]
		}
	});

	// TODO: use providers array instead of single provider
	if (foundUser) {
		if (!foundUser.provider) {
			await prisma.user.update({
				where: { id: foundUser.id },
				data: {
					provider: account?.provider,
					providerId: account?.providerAccountId,
				}
			});
		}
	} else {
		await prisma.user.create({
			data: {
				email: user.email,
				fullName: user.name || "User #" + user.id,
				verified: new Date(),
				provider: account?.provider,
				providerId: account?.providerAccountId,
			},
		});
	}

	return true;
};

export default authOptions;
