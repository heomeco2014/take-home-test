import React, {useEffect} from 'react';
import {useProductStore} from '../../store/useProductStore';
import {Product} from '../../components/Product/Product';
import MultiSelectDropdown from '../../components/shared/MultiSelectDropdown';
import Filter from '../../components/Product/Filter';

const HomePage = () => {
	const {productsById} = useProductStore();

	useEffect(() => {
		useProductStore.getState().fetch();
	}, []);

	return (
		<div>
			<Filter />
			<div className='grid gap-y-0 gap-x-2 grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] overflow-x-hidden row-auto auto-rows-auto'>
				{Object.values(productsById).map(product => (
					<Product key={product.id} id={product.id} />
				))}
			</div>
		</div>
	);
};

export default HomePage;
