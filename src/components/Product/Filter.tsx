import React from 'react';
import MultiSelectDropdown from '../shared/MultiSelectDropdown';
import {useProductStore} from '../../store/useProductStore';

const Filter = () => {
	const {productsById} = useProductStore();
	const categories = [...new Set(Object.values(productsById).map(product => product.category))];
	return (
		<MultiSelectDropdown
			formFieldName={'categories'}
			options={categories}
			onChange={selectedCountries => {
				console.debug('selectedCountries', selectedCountries);
			}}
			prompt='Select categories'
		/>
	);
};

export default Filter;
