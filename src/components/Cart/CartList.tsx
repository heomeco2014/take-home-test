import React from 'react';
import {useCartStore} from '../../store/useCartStore';
import CartItem from './CartItem';

const CartList = () => {
	const {cartItemsById: itemsById} = useCartStore();

	return (
		<div className='md:col-span-2 space-y-4 overflow-y-auto max-h-[100vh]'>
			{Object.keys(itemsById).map((itemId, idx) => {
				return <CartItem key={itemId} id={itemsById[+itemId].productId} />;
			})}
		</div>
	);
};

export default CartList;
