import { ProductForm } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

interface Props {
	params: {
		id: string;
	}
}

export default async function ProductPage({ params: { id } }: Props) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			category: {
				include: {
					products: {
						include: {
							items: true
						}
					}
				}
			},
			items: true,
		}
	});

	if (!product) {
		return notFound();
	}

	return (
		<ProductForm product={product} />
	);
};
