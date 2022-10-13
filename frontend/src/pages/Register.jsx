import { Fragment, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { register, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';


const Register = () => {
	const [ formData, setFormData ] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});
	const { name, email, password, password2 } = formData;
	const dispatch = useDispatch();
	const { user, isLoading, isSuccess, message, isError } = useSelector((state) => state.auth);

	const navigate = useNavigate();
	useEffect(
		() => {
			if (isError) {
				toast.error(message);
			}
			// Redirect when logged in
			if (isSuccess || user) {
				navigate('/');
			}
			dispatch(reset());
		},
		[ user, isLoading, isSuccess, message, isError, navigate, dispatch ]
	);

	const onChange = (event) => {
		setFormData((prevState) => ({
			...prevState,
			[event.target.name]: event.target.value
		}));
	};

	const submitHandler = (event) => {
		event.preventDefault();
		if (password !== password2) {
			toast.error('Password do not matched !');
		} else {
			const userData = {
				name,
				email,
				password
			};
			toast('ok success!');
			dispatch(register(userData));
		}
	};
	if (isLoading) {
		return <Spinner />
	}
	return (
		<Fragment>
			<section className="heading">
				<h1>
					<FaUser />Register {user}
				</h1>
				<p>Please create an account</p>
			</section>
			<section className="form">
				<form onSubmit={submitHandler}>
					<div className="form-group">
						<input
							type="text"
							placeholder="Enter your name"
							className="form-control"
							id="name"
							name="name"
							value={name}
							onChange={onChange}
							required
						/>
					</div>
					<div className="form-group">
						<input
							type="email"
							placeholder="Enter your email"
							className="form-control"
							id="email"
							name="email"
							value={email}
							required
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Enter password"
							className="form-control"
							id="password"
							name="password"
							required
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							placeholder="Confirm password"
							className="form-control"
							id="password2"
							name="password2"
							value={password2}
							required
							onChange={onChange}
						/>
					</div>
					<div className="form-group">
						<button className="btn btn-block">Submit</button>
					</div>
				</form>
			</section>
		</Fragment>
	);
};

export default Register;
