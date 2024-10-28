import {Link} from 'react-router-dom';
import CartIcon from '../../assets/icons/CartIcon';
import {useCartStore} from '../../store/useCartStore';

const Header = () => {
	const totalProducts = useCartStore(state => state.totalQuantity);

	return (
		<header className='sticky top-0 z-[3] w-full flex justify-between items-center p-4 bg-white text-black shadow-md'>
			{/* Logo */}
			<Link to={'/'} className='text-2xl font-bold'>
				<img src='https://kvytechnology.com/wp-content/uploads/2020/09/KVYTech_Logo.svg' alt='' />
			</Link>

			{/* Nav Links */}
			<nav className='hidden space-x-6 md:flex'>
				<Link to='/' className='hover:text-gray-300'>
					Home
				</Link>
			</nav>

			{/* Cart Icon with Badge */}
			<Link to={'/cart'} className='relative'>
				<CartIcon className='w-6 h-6 cursor-pointer hover:text-gray-300' />
				<span className='absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full -top-2 -right-2'>{totalProducts}</span>
			</Link>
		</header>
	);
};

export default Header;
