import { API } from "@/services/api-client";
import { Ingredient } from "@prisma/client";
import { useState, useEffect } from "react";

interface ReturnProps {
	ingredients: Ingredient[];
	loading: boolean;
}

export const useIngredients = (): ReturnProps => {
	const [ ingredients, setIngredients ] = useState<Ingredient[]>([]);
	const [ loading, setLoading ] = useState(false);

	useEffect(() => {
		setLoading(true);
		API.ingredients.getAll()
			.then((data) => setIngredients(data))
			.catch((err) => console.log(err))
			.finally(() => setLoading(false));
	}, []);

	return { ingredients, loading };
};
