import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import { Home, Hotel, List } from './pages';
import Login from './pages/Login/Login';
import CommonPage from './pages/CommonPage/Commonpage';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/hotels" element={<List />} />
				<Route path="/hotels/:id" element={<Hotel />} />
				<Route path="auth/login" element={<CommonPage page={'login'} />} />
				<Route
					path="auth/register"
					element={<CommonPage page={'register'} />}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
