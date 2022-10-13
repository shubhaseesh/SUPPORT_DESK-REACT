import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';
import { Fragment } from 'react';

const Header = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { user } = useSelector((state) => state.auth);
	// console.log(user)
	const onLogout = () => {
		dispatch(logout())
		dispatch(reset())
		navigate('/')
	}
	return (
		<header className="header">
			<div className="logo">
				<Link to="/">Support Desk</Link>
			</div>
			<ul>
				{user ? (
					<li>
						<button className="btn" onClick={onLogout}>
							<FaSignOutAlt />Logout
						</button>
					</li>
				) : (
					<Fragment>
						<li>
							<Link to="/login">
								<FaSignInAlt/>Login
							</Link>
						</li>
						<li>
							<Link to="/register">
								<FaUser/>Register
							</Link>
						</li>
					</Fragment>
				)}
			</ul>
		</header>
	);
};

export default Header;
