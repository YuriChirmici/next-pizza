import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	const code = req.nextUrl.searchParams.get("code");
	if (!code) {
		return NextResponse.json({ error: "Code is required" }, { status: 400 });
	}

	const userId = req.nextUrl.searchParams.get("userId");
	if (!userId) {
		return NextResponse.json({ error: "userId is required" }, { status: 400 });
	}

	const verificationCode = await prisma.verificationCode.findUnique({
		where: {
			userId: Number(userId),
			code,
		},
	});
	if (!verificationCode) {
		return NextResponse.json({ error: "Invalid code" }, { status: 400 });
	}

	if (verificationCode.createdAt < new Date(Date.now() - 1000 * 60 * 15)) { // 15 minutes
		return NextResponse.json({ error: "Code expired" }, { status: 400 });
	}

	await prisma.user.update({
		where: {
			id: verificationCode.userId,
		},
		data: {
			verified: new Date(),
		},
	});

	await prisma.verificationCode.delete({
		where: {
			id: verificationCode.id,
		},
	});

	return NextResponse.redirect(new URL("/?verified", req.url));
}
