import {useEffect} from 'react';
import {useProductStore} from '../../store/useProductStore';
import {Product} from '../../components/Product/Product';
import Filter from '../../components/Product/Filter';

const HomePage = () => {
	const {getFilteredProducts} = useProductStore();
	const filteredProducts = getFilteredProducts();

	useEffect(() => {
		useProductStore.getState().fetch();
	}, []);

	return (
		<div className='flex flex-col'>
			<div className='p-2 pt-10 flex-2'>
				<Filter />
			</div>
			<div className='grid gap-y-0 gap-x-2 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] overflow-x-hidden row-auto auto-rows-auto flex-[8]'>
				{Object.values(filteredProducts).map(product => (
					<Product key={product.id} id={product.id} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
