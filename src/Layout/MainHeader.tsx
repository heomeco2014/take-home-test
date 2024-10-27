import Header from '../components/Header/Header';
import {Outlet} from 'react-router-dom';

const MainHeader = () => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default MainHeader;
