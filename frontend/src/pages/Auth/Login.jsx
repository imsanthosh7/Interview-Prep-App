import React, { useContext, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apipath.js';
import axios from 'axios';
import { toast } from 'sonner';
import { UserContext } from '../../context/userContext.jsx';





const Login = ({ setCurrentPage }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const { updateUser } = useContext(UserContext);

  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const handleLogin = async (e) => {
    e.preventDefault();


    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }

    if (!password) {
      setError("Please enter the  password")
      return;
    }

    setError("");

    //  login Api call 
    try {

      const response = await axios.post(`${baseUrl}${API_PATHS.AUTH.LOGIN}`, { email, password }, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' }
      });


      const { token } = response.data;


      if (token) {
        localStorage.setItem("token", token);
        updateUser(response.data)
        navigate("/dashboard");
      }

    } catch (error) {
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }

  }

  return (
    <>
      <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
        <h3 className='text-lg font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
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

          <button type='submit' className='btn-primary'>LOGIN</button>
          <p className='text-[13px] text-slate-800 mt-3'>Don't have an account?{" "}
            <button
              className='font-medium text-[#670D2F] underline cursor-pointer'
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