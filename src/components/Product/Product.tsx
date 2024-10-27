import {useProductStore} from '../../store/useProductStore';
import AddToCart from '../shared/Buttons/AddToCart';
import AddToFavorite from '../shared/Buttons/AddToFavorite';
import Rating from '../shared/Rating';

type TProduct = {
	id: number;
};
export const Product = ({id}: TProduct) => {
	const {productsById} = useProductStore();
	const product = productsById[id];
	const {price, image, rating, description, title, category} = product;
	return (
		<div key={product.id} className='h-full'>
			<div className='relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md pt-3'>
				<div className='absolute -top-2'>
					<Category category={category} />
				</div>
				<div className='mx-auto mt-3 flex h-60 overflow-hidden rounded-xl'>
					<img className='object-cover' src={image} alt='product' />
				</div>
				<div className='mt-4 px-5 pb-5'>
					<h5 className='text-xl tracking-tight text-slate-900'>{title}</h5>
					<div className='mt-2 mb-5 flex items-center justify-between'>
						<span className='text-2xl font-bold text-slate-900'>${price}</span>
						<Rating count={rating.count} rate={rating.rate} />
					</div>
					<div className='flex justify-between '>
						<AddToFavorite id={id} />
						<AddToCart id={id} />
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
