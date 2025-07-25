import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apipath.js';
import axios from 'axios';
import { toast } from 'sonner';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import { uploadImage } from '../../utils/uploadImage.js'
import SpinnerLoader from '@/components/Loader/SpinnerLoader';








const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);

  const navigate = useNavigate();


  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;


  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter the  password");
      return;
    }

    setError("")

    setLoading(true);

    try {

      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imgUrl || "";
      }

      const response = await axios.post(`${baseUrl}${API_PATHS.AUTH.REGISTER}`, { name: fullName, email, password, profileImageUrl }, {
        withCredentials: true,
      });

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
      if (error.message) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center'>
      <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
      <p className='text-lg text-slate-700 mt-[5px] mb-6'>
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp}>

        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

        <div className='grid grid-cols-1 md:grid-cols-1 gap-2'>
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
          />

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
        </div>

        {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}
        <button disabled={loading} type='submit' className='btn-primary'>{loading ? <SpinnerLoader /> : "SIGN UP"}</button>
        <p className='text-[14px] text-slate-800 mt-3'>
          Already an account?{" "}
          <button
            className='font-medium text-red-500 underline cursor-pointer'
            onClick={() => {
              setCurrentPage("login");
            }}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  )
}

export default SignUp