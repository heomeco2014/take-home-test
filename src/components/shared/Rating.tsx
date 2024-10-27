import {formatTextCount} from '../../utils/helperFunctions';

type TRating = {
	rate: number;
	count: number;
};
const Rating = ({rate, count}: TRating) => {
	return (
		<div className='flex flex-col space-y-2 '>
			<span className='rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold ml-auto'>{rate.toFixed(1)}</span>
			<span className='text-xs  text-gray-600 italic'>
				({count} {formatTextCount(count, 'review')})
			</span>
		</div>
	);
};

export default Rating;
