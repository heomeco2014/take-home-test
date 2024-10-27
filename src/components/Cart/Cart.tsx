import {useCartStore} from '../../store/useCartStore';
import CartItem from './CartItem';
import CartList from './CartList';
import OrderSummary from './OrderSummary/OrderSummary';

const Cart = () => {
	const {totalQuantity} = useCartStore();
	if (totalQuantity === 0)
		return (
			<div className='bg-gray-100 rounded-md p-4 h-[calc(100vh-80px)]'>
				<p className='text-gray-800 mt-6 text-center'>Your cart is empty</p>
			</div>
		);
	return (
		<div className='grid md:grid-cols-3 gap-8 p-4'>
			<CartList />
			<OrderSummary />
		</div>
	);
};

export default Cart;
