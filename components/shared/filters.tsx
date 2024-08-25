"use client";

import React from "react";
import { Title } from "./title";
import { Input, RangeSlider } from "../ui";
import { CheckboxFiltersGroup } from "./checkbox-filters-group";
import { useDebounce } from "react-use";
import QueryString from "qs";
import { useRouter } from "next/navigation";
import { useFilters } from "@/hooks/use-filters";
import { useIngredients } from "@/hooks/use-ingredients";
import { FILTER_MAX_PRICE, FILTER_MIN_PRICE } from "@/hooks/constants";

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	const router = useRouter();

	const {
		ingredients: selectedIngredients,
		toggleIngredient,

		sizes: selectedSizes,
		toggleSize,

		pizzaTypes: selectedPizzaTypes,
		togglePizzaType,

		priceFrom,
		priceTo,
		setPriceRange,
	} = useFilters();

	const { ingredients: allIngredients, loading: ingredientsLoading } = useIngredients();

	const items = allIngredients.map(({ id, name }) => ({ value: id.toString(), text: name }));

	useDebounce(() => {
		const queryFilter = {
			priceFrom,
			priceTo,
			ingredients: Array.from(selectedIngredients),
			sizes: Array.from(selectedSizes),
			pizzaTypes: Array.from(selectedPizzaTypes),
		};
		const query = QueryString.stringify(queryFilter, {
			arrayFormat: "comma"
		});
		router.push(`?${query}`, { scroll: false });
	},
	300,
	[ priceFrom, priceTo, selectedPizzaTypes, selectedSizes, selectedIngredients ]);

	const loading = ingredientsLoading;

	return (
		<div className={className}>
			<Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

			{/* Pizza types checkboxes */}
			<CheckboxFiltersGroup
				title="Тип теста"
				name="pizza-types"
				className="mb-5"
				selectedValues={selectedPizzaTypes}
				onCheck={togglePizzaType}
				items={[
					{ text: "Тонкое", value: "1" },
					{ text: "Традиционное", value: "2" },
				]}
			/>

			{/* Sizes checkboxes */}
			<CheckboxFiltersGroup
				title="Размеры"
				name="sizes"
				className="mb-5"
				selectedValues={selectedSizes}
				onCheck={toggleSize}
				items={[
					{ text: "20 см", value: "20" },
					{ text: "30 см", value: "30" },
					{ text: "40 см", value: "40" },
				]}
			/>

			{/* Price */}
			<div className="mt-5 border-y border-y-neutral-100 py-6">
				<p className="font-bold mb-3"> Цена от и до: </p>
				<div className="flex gap-3 mb-5">
					<Input type="number" min={FILTER_MIN_PRICE} max={FILTER_MAX_PRICE}
						value={priceFrom}
						onChange={(e) => setPriceRange([ Number(e.target.value), priceTo ])}
					/>
					<Input type="number" min={FILTER_MIN_PRICE} max={FILTER_MAX_PRICE}
						value={priceTo}
						onChange={(e) => setPriceRange([ priceFrom, Number(e.target.value) ])}
					/>
				</div>
				<RangeSlider min={FILTER_MIN_PRICE} max={FILTER_MAX_PRICE} step={10}
					value={[ priceFrom, priceTo ]}
					onValueChange={setPriceRange}
				/>
			</div>

			{/* Ingredients */}
			<CheckboxFiltersGroup
				title="Ингридиенты"
				name="ingredients"
				className="mt-5"
				limit={5}
				defaultItems={items.slice(0, 6)}
				items={items}
				loading={loading}
				selectedValues={selectedIngredients}
				onCheck={toggleIngredient}
			/>
		</div>
	);
};
