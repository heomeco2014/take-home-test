import {create} from 'zustand';
import {api} from '../API';
import {SortOption, SortOptions} from '../components/shared/Sort';

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
	filteredProductsById: ProductById;
	setProductsById: (products: ProductById) => void;

	sortOption: SortOption;
	setSortOption: (option: SortOption) => void;

	categoryFilter: string[];
	setCategoryFilter: (categories: string[]) => void;

	priceRange: {min: number; max: number};
	setPriceRange: (range: {min: number; max: number}) => void;
	fetch: () => Promise<void>;
	getFilteredProducts: () => ProductById;
};

export const useProductStore = create<ProductStore>((set, get) => ({
	productsById: {} as ProductById,
	setProductsById: (products: ProductById) => set({productsById: products}),

	// Sort and filter options
	filteredProductsById: {} as ProductById,

	sortOption: SortOptions.priceLowHigh,
	setSortOption: (option: SortOption) => {
		set({sortOption: option});
	},

	categoryFilter: [],
	setCategoryFilter: (categories: string[]) => {
		set({categoryFilter: categories});
	},

	priceRange: {min: 0, max: 2000},
	setPriceRange: (range: {min: number; max: number}) => {
		set({priceRange: range});
	},

	// Fetch products
	fetch: async () => {
		const products = await api.getAllProducts();
		const productsById = products.reduce((acc, product) => {
			acc[product.id] = product;
			return acc;
		}, {} as ProductById);
		set({productsById});
	},

	// Derived state for filtered and sorted products
	getFilteredProducts: () => {
		const {productsById, categoryFilter, sortOption} = get();

		// Filter products based on selected categories
		let products = Object.values(productsById).filter(product => (categoryFilter.length > 0 ? categoryFilter.includes(product.category) : true));

		// Filter products based on selected price range
		products = products.filter(product => parseFloat(product.price) >= get().priceRange.min && parseFloat(product.price) <= get().priceRange.max);

		// Sort products based on selected sortOption
		products = products.sort((a, b) => {
			switch (sortOption) {
				case 'priceLowHigh':
					return parseFloat(a.price) - parseFloat(b.price);
				case 'priceHighLow':
					return parseFloat(b.price) - parseFloat(a.price);
				case 'ratingHighLow':
					return b.rating.rate - a.rating.rate;
				case 'nameAZ':
					return a.title.localeCompare(b.title);
				case 'nameZA':
					return b.title.localeCompare(a.title);
				default:
					return 0;
			}
		});
		return products;
	},
}));
