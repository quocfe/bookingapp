import { Link } from 'react-router-dom';
import './navbar.scss';
import { useContext } from 'react';
import { authContext } from './../../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {
	const { user, dispatch } = useContext(authContext);

	const logout = () => {
		dispatch({ type: 'LOGOUT' });
	};

	return (
		<div className="navbar">
			<div className="navContainer secContainer">
				<span className="logo">
					<Link to={'/'}>TravelBooking</Link>
				</span>
				<div className="navItems">
					{!user ? (
						<>
							<Link to={'auth/register'}>
								<button className="navButton">Register</button>
							</Link>
							<Link to={'auth/login'}>
								<button className="navButton">Login</button>
							</Link>
						</>
					) : (
						<div className="userInfoContainer">
							<div className="userInfo">
								<span>Hello</span>
								<strong>{user.username}</strong>
							</div>
							<button onClick={logout} className="navButton">
								<FontAwesomeIcon icon={faRightFromBracket} />
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default NavBar;
