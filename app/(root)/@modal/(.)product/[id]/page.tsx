import { ChooseProductModal } from "@/shared/components/shared/modals/choose-product-modal";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface Props {
	params: {
		id: string;
	}
}

export default async function ProductModalPage({ params: { id } }: Props) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			items: true,
		}
	});

	if (!product) {
		return notFound();
	}

	return <div>
		<ChooseProductModal product={product} />
	</div>;
}
