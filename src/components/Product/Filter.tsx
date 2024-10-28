import MultiSelectDropdown from '../shared/MultiSelectDropdown';
import {useProductStore} from '../../store/useProductStore';
import PriceRangeSlider from '../shared/PriceSlider';
import SortComponent from '../shared/Sort';
import {useMemo} from 'react';

const Filter = () => {
	const {productsById, sortOption, setSortOption, setCategoryFilter, setPriceRange} = useProductStore();
	const categories = useMemo(() => {
		return [...new Set(Object.values(productsById).map(product => product.category))];
	}, [productsById]);

	return (
		<div className='flex flex-wrap justify-between gap-2'>
			<div className=''>
				<MultiSelectDropdown
					formFieldName={'categories'}
					options={categories}
					onChange={selectedCategories => {
						setCategoryFilter(selectedCategories);
					}}
					prompt='Select categories'
				/>
			</div>
			<div className=''>
				<SortComponent selectedOption={sortOption} setSelectedOption={setSortOption} />
			</div>
			<div className=''>
				<PriceRangeSlider
					onChange={priceRange => {
						setPriceRange({
							min: priceRange.min,
							max: priceRange.max,
						});
					}}
				/>
			</div>
		</div>
	);
};

export default Filter;
