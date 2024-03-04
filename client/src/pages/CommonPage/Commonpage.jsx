import { useEffect, useState } from 'react';
import './CommonPage.scss';
import Register from '../Register/Register';
import Login from './../Login/Login';
import { useNavigate } from 'react-router-dom';

export default function CommonPage({ page }) {
	const navigate = useNavigate();
	const [active, setActive] = useState(false);

	const handActive = (dir) => {
		if (dir) {
			setActive(true);
			navigate('/auth/register');
		} else {
			setActive(false);
			navigate('/auth/login');
		}
	};

	useEffect(() => {
		page === 'register' ? setActive(true) : setActive(false);
	}, [page]);

	return (
		<div className="common_container">
			<div className={`container ${active ? 'active' : ''}`} id="container">
				<Login></Login>
				<Register></Register>
				<div className="toggle-container">
					<div className="toggle">
						<div className="toggle-panel toggle-left">
							<h1>Welcome Back!</h1>
							<p>Enter your personal details to use all of site features</p>
							<button
								onClick={() => handActive(false)}
								className="hidden "
								id="login"
							>
								Sign In
							</button>
						</div>
						<div className="toggle-panel toggle-right">
							<h1>Hello, Friend!</h1>
							<p>
								Register with your personal details to use all of site features
							</p>
							<button
								onClick={() => handActive(true)}
								className="hidden"
								id="register"
							>
								Sign Up
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
