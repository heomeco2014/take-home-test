import MinusIcon from '../../assets/icons/MinusIcon';
import PlusIcon from '../../assets/icons/PlusIcon';
import TrashIcon from '../../assets/icons/TrashIcon';
import {useCartStore} from '../../store/useCartStore';
import {useProductStore} from '../../store/useProductStore';

type TCartItem = {
	id: number;
};
const CartItem = ({id}: TCartItem) => {
	const {cartItemsById, removeFromCart} = useCartStore();
	const {productsById} = useProductStore();
	const item = productsById[cartItemsById[id].productId];
	return (
		<div key={item.id}>
			<div className='grid items-start grid-cols-3 gap-4'>
				<div className='flex items-start col-span-2 gap-4'>
					<div className='p-2 bg-gray-100 rounded-md w-28 h-28 max-sm:w-24 max-sm:h-24 shrink-0'>
						<img src={item.image} alt={item.title} className='object-contain w-full h-full' />
					</div>
					<div className='flex flex-col'>
						<h3 className='text-base font-bold text-gray-800'>{item.title}</h3>
						<p className='text-xs font-semibold text-gray-500 mt-0.5'>Catetory: {item.category}</p>
						<button
							type='button'
							className='flex items-center gap-1 mt-6 text-xs font-semibold text-red-500 shrink-0'
							onClick={() => {
								removeFromCart(id);
							}}>
							<TrashIcon className='inline w-4 fill-current' />
							REMOVE
						</button>
					</div>
				</div>
				<div className='ml-auto'>
					<h4 className='text-lg font-bold text-gray-800 max-sm:text-base'>{item.price}</h4>
					<div className='mt-6 flex items-center px-3 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md'>
						<MinusIcon className='w-2.5 fill-current cursor-pointer' />
						<span className='mx-3 font-bold'>{cartItemsById[id].quantity}</span>
						<PlusIcon className='w-2.5 fill-current cursor-pointer' />
					</div>
				</div>
			</div>
			<hr className='border-gray-300' />
		</div>
	);
};

export default CartItem;
