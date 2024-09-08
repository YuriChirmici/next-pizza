import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useSet } from "react-use";
import { FILTER_MAX_PRICE, FILTER_MIN_PRICE } from "./constants";

type ToggleItem = (key: string) => void;

interface PriceRange {
	priceFrom: number;
	priceTo: number;
}

interface FilterProps extends PriceRange {
	ingredients: Set<string>;
	sizes: Set<string>;
	pizzaTypes: Set<string>;
}

interface ReturnProps extends FilterProps {
	toggleIngredient: ToggleItem,
	toggleSize: ToggleItem,
	togglePizzaType: ToggleItem,
	setPriceRange: ([ priceFrom, priceTo ]: number[]) => void,
}

const convertQueryParamToArray = (queryParam?: string): string[] => (queryParam || "").split(",").filter(p => p);

export const useFilters = (): ReturnProps => {
	const searchParams = useSearchParams() as unknown as Map<keyof FilterProps, "string">;

	const [ ingredients, { toggle: toggleIngredient } ] = useSet(new Set<string>(
		convertQueryParamToArray(searchParams.get("ingredients")))
	);

	const [ sizes, { toggle: toggleSize } ] = useSet(new Set<string>(
		convertQueryParamToArray(searchParams.get("sizes")))
	);

	const [ pizzaTypes, { toggle: togglePizzaType } ] = useSet(new Set<string>(
		convertQueryParamToArray(searchParams.get("pizzaTypes"))
	));

	const [ price, setPrice ] = useState<PriceRange>({
		priceFrom: Number(searchParams.get("priceFrom")) || FILTER_MIN_PRICE,
		priceTo: Number(searchParams.get("priceTo")) || FILTER_MAX_PRICE,
	});

	const setPriceRange = ([ priceFrom, priceTo ]: number[]) => {
		setPrice({ priceFrom, priceTo });
	};

	return useMemo(() => ({
		priceFrom: price.priceFrom,
		priceTo: price.priceTo,
		ingredients,
		sizes,
		pizzaTypes,
		toggleIngredient,
		toggleSize,
		togglePizzaType,
		setPriceRange,
	}), [ price, ingredients, sizes, pizzaTypes ]);
};
