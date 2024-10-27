import {BrowserRouter, Routes, Route} from 'react-router-dom';
import CartPage from './routes/CartPage/CartPage';
import HomePage from './routes/HomePage/HomePage';
import MainHeader from './Layout/MainHeader';
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<MainHeader />}>
					<Route path='/' element={<HomePage />}></Route>
					<Route path='/cart' element={<CartPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
