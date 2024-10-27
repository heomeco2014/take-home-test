import {Link} from 'react-router-dom';
import CartIcon from '../../assets/icons/CartIcon';
import {useCartStore} from '../../store/useCartStore';

const Header = () => {
	const totalProducts = useCartStore(state => state.totalQuantity);

	return (
		<header className='sticky top-0 z-[2] w-full flex justify-between items-center p-4 bg-white text-black shadow-md'>
			{/* Logo */}
			<div className='text-2xl font-bold'>
				<img src='https://kvytechnology.com/wp-content/uploads/2020/09/KVYTech_Logo.svg' alt='' />
			</div>

			{/* Nav Links */}
			<nav className='hidden md:flex space-x-6'>
				<Link to='/' className='hover:text-gray-300'>
					Home
				</Link>
			</nav>

			{/* Cart Icon with Badge */}
			<Link to={'/cart'} className='relative'>
				<CartIcon className='h-6 w-6 cursor-pointer hover:text-gray-300' />
				<span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>{totalProducts}</span>
			</Link>
		</header>
	);
};

export default Header;
