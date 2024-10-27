import {create} from 'zustand';
import {useProductStore} from './useProductStore';

export type CartItem = {
	productId: number;
	quantity: number;
};

type CartStore = {
	cartItemsById: Record<number, CartItem>;
	totalQuantity: number;
	totalPrice: number;
	shippingPrice: number;
	addToCart: (productId: number, quantity: number) => void;
	decreaseQuantity: (productId: number, quantity?: number) => void;
	removeFromCart: (productId: number) => void;
	clearCart: () => void;
};

export const useCartStore = create<CartStore>(set => ({
	cartItemsById: {},
	totalQuantity: 0,
	totalPrice: 0,
	shippingPrice: 2,

	addToCart: (productId, quantity) =>
		set(state => {
			const existingItem = state.cartItemsById[productId];
			const updatedQuantity = existingItem ? existingItem.quantity + quantity : quantity;

			const updatedItemsById = {
				...state.cartItemsById,
				[productId]: {productId, quantity: updatedQuantity},
			};

			const newTotalQuantity = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity, 0);
			const newTotalPrice = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity * getPrice(item.productId), 0);

			return {
				cartItemsById: updatedItemsById,
				totalQuantity: newTotalQuantity,
				totalPrice: newTotalPrice,
			};
		}),

	decreaseQuantity: (productId, quantity = 1) =>
		set(state => {
			const existingItem = state.cartItemsById[productId];

			// If item doesn't exist, return current state
			if (!existingItem) return state;

			const updatedQuantity = existingItem.quantity - quantity;

			// If updated quantity is 0 or less, remove item from cart
			if (updatedQuantity <= 0) {
				const {[productId]: _, ...updatedItemsById} = state.cartItemsById;

				const newTotalQuantity = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity, 0);
				const newTotalPrice = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity * getPrice(item.productId), 0);

				return {
					cartItemsById: updatedItemsById,
					totalQuantity: newTotalQuantity,
					totalPrice: newTotalPrice,
				};
			}

			// Otherwise, update the quantity
			const updatedItemsById = {
				...state.cartItemsById,
				[productId]: {productId, quantity: updatedQuantity},
			};

			const newTotalQuantity = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity, 0);
			const newTotalPrice = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity * getPrice(item.productId), 0);

			return {
				cartItemsById: updatedItemsById,
				totalQuantity: newTotalQuantity,
				totalPrice: newTotalPrice,
			};
		}),

	removeFromCart: productId =>
		set(state => {
			const {[productId]: _, ...updatedItemsById} = state.cartItemsById;

			const newTotalQuantity = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity, 0);
			const newTotalPrice = Object.values(updatedItemsById).reduce((acc, item) => acc + item.quantity * getPrice(item.productId), 0);

			return {
				cartItemsById: updatedItemsById,
				totalQuantity: newTotalQuantity,
				totalPrice: newTotalPrice,
			};
		}),

	clearCart: () =>
		set(() => ({
			cartItemsById: {},
			totalQuantity: 0,
			totalPrice: 0,
		})),
}));

// Helper function to retrieve product price from `useProductStore`
const getPrice = (productId: number): number => {
	const productsById = useProductStore.getState().productsById;
	const product = productsById[productId];
	return product ? parseFloat(product.price) : 0;
};
