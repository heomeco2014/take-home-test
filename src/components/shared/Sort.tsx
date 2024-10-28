import React from 'react';

export type SortOption = 'priceLowHigh' | 'priceHighLow' | 'ratingHighLow' | 'nameAZ' | 'nameZA';
export const SortOptions = {
	priceLowHigh: 'priceLowHigh',
	priceHighLow: 'priceHighLow',
	ratingHighLow: 'ratingHighLow',
	nameAZ: 'nameAZ',
	nameZA: 'nameZA',
} as const;

interface SortComponentProps {
	selectedOption: SortOption;
	setSelectedOption: (option: SortOption) => void;
}

const SortComponent: React.FC<SortComponentProps> = ({selectedOption, setSelectedOption}) => {
	const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedOption(event.target.value as SortOption);
	};

	return (
		<div className='max-w-md p-4 bg-white rounded-lg shadow-md'>
			<h2 className='mb-4 text-lg font-bold text-gray-700'>Sort Products By:</h2>
			<select value={selectedOption} onChange={handleSort} className='w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'>
				<option value='priceLowHigh'>Price (Low to High)</option>
				<option value='priceHighLow'>Price (High to Low)</option>
				<option value='ratingHighLow'>Rating (High to Low)</option>
				<option value='nameAZ'>Name (A-Z)</option>
				<option value='nameZA'>Name (Z-A)</option>
			</select>
		</div>
	);
};

export default SortComponent;
