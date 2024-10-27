import {axiosInstance} from '../config/axios/axios';
import {Product} from '../store/useProductStore';

export const api = {
	getAllProducts: async (): Promise<Product[]> => {
		try {
			const response = await axiosInstance.get('/products');
			return response.data;
		} catch (error) {
			console.error('🔴 | error:', error);
			return [];
		}
	},
};
