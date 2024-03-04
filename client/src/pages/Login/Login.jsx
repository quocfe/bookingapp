import { useContext, useState } from 'react';
import { authContext } from './../../context/AuthContext';
import '../CommonPage/Commonpage.scss';
import { contantApi } from './../../constant/contantApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [credentials, setCredentials] = useState({
		username: undefined,
		password: undefined,
	});
	const navigate = useNavigate();
	const { loading, error, dispatch } = useContext(authContext);

	const handleChange = (e) => {
		setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
	};

	const handeClick = async (e) => {
		e.preventDefault();

		dispatch({ type: 'LOGIN_START' });
		try {
			const res = await axios.post(`${contantApi.auth}/login`, credentials);
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
			navigate('/');
		} catch (error) {
			dispatch({ type: 'LOGIN_FALSE', payload: error.response?.data });
		}
	};

	return (
		<div className="form-container sign-in">
			<form>
				<h1>Sign In</h1>
				<div className="social-icons">
					<a href="#" className="icon">
						<i className="fa-brands fa-google-plus-g" />
					</a>
					<a href="#" className="icon">
						<i className="fa-brands fa-facebook-f" />
					</a>
					<a href="#" className="icon">
						<i className="fa-brands fa-github" />
					</a>
					<a href="#" className="icon">
						<i className="fa-brands fa-linkedin-in" />
					</a>
				</div>
				<input
					type="text"
					id="username"
					placeholder="username"
					onChange={handleChange}
				/>
				<input
					type="password"
					id="password"
					placeholder="Password"
					onChange={handleChange}
				/>
				{error && <span>{error}</span>}
				<a href="#">→ Forget Your Password? ←</a>
				<button disabled={loading} onClick={handeClick}>
					Sign In
				</button>
			</form>
		</div>
	);
}
