import {create} from 'zustand';

export type Cart = {
	productId: number;
	quantity: number;
};

type CartStore = {};

export const useCartStore = create<CartStore>(set => ({}));
