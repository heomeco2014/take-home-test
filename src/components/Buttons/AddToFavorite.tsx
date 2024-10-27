import React, {useState} from 'react';
import FavIcon from '../../assets/icons/FavoriteIcon';

type AddToFavoriteProps = {
	id: number;
};
const AddToFavorite = ({id}: AddToFavoriteProps) => {
	const [isFavorite, setIsFavorite] = useState(false);

	const toggleFavorite = () => {
		setIsFavorite(!isFavorite);
	};

	return (
		<button onClick={toggleFavorite} className='flex items-center justify-center rounded-md bg-red-500 px-3 py-2 text-center text-sm font-medium text-white hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300'>
			<FavIcon className={`h-6 w-6 mr-1 ${isFavorite ? 'fill-current text-white' : 'fill-transparent text-white'}`} />
			{isFavorite ? '-' : '+'}
		</button>
	);
};

export default AddToFavorite;
