import { Container, PizzaImage, Title } from "@/shared/components/shared";
import { GroupVariants } from "@/shared/components/shared/group-variants";
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
		include: { items: true }
	});

	if (!product) {
		return notFound();
	}

	return (
		<Container className="flex flex-col my-10">
			<div className="flex flex-1">
				<PizzaImage src={product.imageUrl} size={20} name={product.name} />
				<div className="w-[490px] bg-[#F6F6F6] p-7">
					<Title text={product.name} size="md" className="font-extrabold mb-1" />
					<p className="text-gray-400">Lorem ipsum dolor sit amet.</p>

					<GroupVariants
						value="1"
						items={[ {
							name: "Маленькая",
							value: "1",
						}, {
							name: "Средняя",
							value: "2",
							disabled: true
						}, {
							name: "Большая",
							value: "3",
						} ]}
					/>
				</div>
			</div>

		</Container>
	);
};
