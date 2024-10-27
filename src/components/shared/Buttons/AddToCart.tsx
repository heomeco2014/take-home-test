import CartIcon from '../../../assets/icons/CartIcon';

const AddToCart = ({id}: {id: number}) => {
	return (
		<button className='flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300'>
			<CartIcon className='mr-2 h-6 w-6' /> +
		</button>
	);
};

export default AddToCart;
