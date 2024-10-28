import CartIcon from '../../assets/icons/CartIcon';
import {useCartStore} from '../../store/useCartStore';
import {useState} from 'react';

type TAddToCart = {
	productId: number;
};

const AddToCart = ({productId}: TAddToCart) => {
	const {cartItemsById: itemsById} = useCartStore();
	const isAdded = itemsById[productId];
	const {addToCart, removeFromCart} = useCartStore();

	const [quantity, setQuantity] = useState(isAdded ? itemsById[productId].quantity : 1);

	const handleAddToCart = () => {
		addToCart(productId, quantity);
	};

	const decreaseQuantity = () => {
		setQuantity(quantity - 1);
		addToCart(productId, -1);
	};
	const handleRemoveFromCart = () => {
		removeFromCart(productId);
	};

	const handleIncrement = () => {
		const newQuantity = quantity + 1;
		setQuantity(newQuantity);
		addToCart(productId, 1);
	};

	const handleDecrement = () => {
		if (quantity > 1) {
			const newQuantity = quantity - 1;
			setQuantity(newQuantity);
			decreaseQuantity();
		} else {
			handleRemoveFromCart();
		}
	};

	return (
		<div className='flex items-center space-x-4'>
			{isAdded ? (
				<div className='flex items-center space-x-2'>
					<button className='flex items-center justify-center px-3 py-2.5 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none' onClick={handleRemoveFromCart}>
						Remove
					</button>
					<div className='flex items-center overflow-hidden border rounded-md'>
						<button className='px-3 py-2.5 text-sm font-medium bg-gray-200 hover:bg-gray-300' onClick={handleDecrement}>
							-
						</button>
						<div className='px-4 py-2.5 text-sm font-medium bg-white'>{quantity}</div>
						<button className='px-3 py-2.5 text-sm font-medium bg-gray-200 hover:bg-gray-300' onClick={handleIncrement}>
							+
						</button>
					</div>
				</div>
			) : (
				<button className='flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300' onClick={handleAddToCart}>
					<CartIcon className='w-6 h-6 mr-2' /> Add to cart
				</button>
			)}
		</div>
	);
};

export default AddToCart;
