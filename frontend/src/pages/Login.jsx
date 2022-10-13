import { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, reset } from "../features/auth/authSlice";
import Spinner from "../components/Spinner";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // Redirect to logged in
    if (isSuccess || user) {
      navigate("/");
    }
    dispatch(reset());
  }, [user, isSuccess, message, isError, navigate, dispatch]);
  const onChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };
  if (isLoading) {
    return <Spinner />;
  }
  return (
    <Fragment>
      <section className="heading">
        <h1>
          <FaSignInAlt />
          Login
        </h1>
        <p>Please login</p>
      </section>
      <section className="form">
        <form onSubmit={submitHandler}>
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
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </Fragment>
  );
};

export default Login;
