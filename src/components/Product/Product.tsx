import {useProductStore} from '../../store/useProductStore';
import AddToCart from '../Buttons/AddToCart';
import AddToFavorite from '../Buttons/AddToFavorite';
import Rating from '../shared/Rating';

type TProduct = {
	id: number;
};
export const Product = ({id}: TProduct) => {
	const productsById = useProductStore(state => state.productsById);
	const product = productsById[id];
	const {price, image, rating, description, title, category} = product;

	return (
		<div key={product.id} className='h-full'>
			<div className='relative flex flex-col w-full max-w-xs pt-3 m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md'>
				<div className='absolute -top-2'>
					<Category category={category} />
				</div>
				<div className='flex mx-auto mt-3 overflow-hidden h-60 rounded-xl'>
					<img className='object-cover' src={image} alt='product' />
				</div>
				<div className='px-5 pb-5 mt-4'>
					<h5 className='text-xl tracking-tight text-slate-900'>{title}</h5>
					<div className='flex items-center justify-between mt-2 mb-5'>
						<span className='text-2xl font-bold text-slate-900'>${price}</span>
						<Rating count={rating.count} rate={rating.rate} />
					</div>
					<div className='flex justify-between '>
						<AddToFavorite id={id} />
						<AddToCart productId={id} />
					</div>
				</div>
			</div>
		</div>
	);
};

export const Category = ({category}: {category: string}) => {
	return (
		<div
			className={`flex items-center justify-self-start px-2 py-0.5 text-sm rounded-br-lg uppercase my-2 ${CategoryColor({category})}  `}
			style={{
				backgroundColor: CategoryColor({category}),
			}}>
			{category}
		</div>
	);
};

export const CategoryColor = ({category}: {category: string}) => {
	const colors = {
		electronics: 'bg-blue-500 text-white',
		jewelery: 'bg-yellow-500 text-black',
		"men's clothing": 'bg-green-600 text-white',
		"women's clothing": 'bg-pink-400 text-white',
	} as Record<string, string>;
	return colors[category] || 'bg-gray-500';
};
