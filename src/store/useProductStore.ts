import {create} from 'zustand';
import {api} from '../API';

export type Product = {
	id: number;
	title: string;
	price: string;
	description: string;
	image: string;
	rating: {
		rate: number;
		count: number;
	};
	category: string;
};
export type ProductById = Record<number, Product>;

type ProductStore = {
	productsById: ProductById;
	setProductsById: (products: ProductById) => void;
	fetch: () => Promise<void>;
};

export const useProductStore = create<ProductStore>(set => ({
	productsById: {} as ProductById,
	setProductsById: (products: ProductById) => set({productsById: products}),
	fetch: async () => {
		const products = await api.getAllProducts();
		const productsById = products.reduce((acc, product) => {
			acc[product.id] = product;
			return acc;
		}, {} as ProductById);
		set({productsById});
	},
}));
