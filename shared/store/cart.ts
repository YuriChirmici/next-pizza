import { create } from "zustand";
import { API } from "../services/api-client";
import { CartStateItem, getCartDetails } from "../lib/get-cart-details";
import { CreateCartItemValues } from "../services/dto/cart.dto";

export interface CartState {
	loading: boolean;
	error: boolean;
	totalAmount: number;
	items: CartStateItem[];
	fetchCartItems: () => Promise<void>;
	updateItemQuantity: (id: number, quantity: number) => Promise<void>;
	addCartItem: (values: CreateCartItemValues) => Promise<void>;
	removeCartItem: (id: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,
	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false });
			const data = await API.cart.getCart();
			set(getCartDetails(data));
		} catch (err) {
			console.error(err);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			// TODO: check negative quantity
			set({ loading: true, error: false });
			const data = await API.cart.updateItemQuantity(id, quantity);
			set(getCartDetails(data));
		} catch (err) {
			console.error(err);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({ loading: true, error: false, items: state.items.map(item => item.id === id ? { ...item, disabled: true } : item) }));
			const data = await API.cart.removeCartItem(id);
			set(getCartDetails(data));
		} catch (err) {
			console.error(err);
			set({ error: true });
		} finally {
			set(state => ({ loading: false, items: state.items.map(item => ({ ...item, disabled: false })) }));
		}
	},
	addCartItem: async (values: CreateCartItemValues) => {
		try {
			set({ loading: true, error: false });
			const data = await API.cart.addCartItem(values);
			set(getCartDetails(data));
		} catch (err) {
			console.error(err);
			set({ error: true });
		} finally {
			set({ loading: false });
		}
	},
}));
