import React, { useContext, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apipath.js';
import axios from 'axios';
import { toast } from 'sonner';
import { UserContext } from '../../context/userContext.jsx';
import SpinnerLoader from '@/components/Loader/SpinnerLoader';





const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError("");

    setLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}${API_PATHS.AUTH.LOGIN}`,
        { email, password },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      // Check backend response status
      if (response.data.success === false) {
        setError(response.data.message || "Login failed.");
        return;
      }

      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data);
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-lg text-slate-700 mt-[5px] mb-6'>
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

          <button disabled={loading} type='submit' className='btn-primary'> {loading ? <SpinnerLoader /> : "LOGIN"}</button>
          <p className='text-[14px] text-slate-800 mt-3'>Don't have an account?{" "}
            <button
              className='font-medium text-rose-500 underline cursor-pointer'
              onClick={() => {
                setCurrentPage("signUp");
              }}
            >
              SignUp
            </button>
          </p>


        </form>
      </div>
    </>
  )
}

export default Login