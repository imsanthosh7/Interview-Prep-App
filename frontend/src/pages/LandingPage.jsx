import React, { useContext, useState } from "react";
import { Sparkles, CircleUser } from "lucide-react";
import hero_img from "/src/assets/hero-img.png";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'
import Login from './Auth/Login';
import SignUp from "./Auth/SignUp";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";


const LandingPage = () => {

  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");


  const { user } = useContext(UserContext);




  const handelCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <>
      <nav>
        <div className="w-full items-center flex justify-between  mx-auto px-6 md:px-15 py-5 md:py-5">
          <div>
            <h1 className="text-2xl font-bold">QuickPrep AI</h1>
          </div>
          <div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="cursor-pointer text-lg rounded-full text-white bg-black px-3 py-1 hover:bg-neutral-800 transition-all duration-150 flex items-center gap-1" >
                <span><CircleUser className="size-5" /></span>Login
              </button>
            )

            }
          </div>
        </div>
      </nav>

      {/* hero  section  */}
      <section className="relative  overflow-hidden pt-28 pb-16 md:mx-10 mx-5 rounded-4xl bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0  bg-color z-0" />

        {/* Smooth fade at the bottom */}
        <div className="absolute bottom-0 left-0 w-full h-160 bg-gradient-to-t from-white to-transparent z-10" />


        <div className="relative z-10">
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col gap-5">
              {/* Tag */}
              <div className="relative w-fit  mx-auto rounded-full shine-border px-[3px] py-[3px]">
                <button className="text-white text-base md:text-lg flex gap-2 font-semibold items-center justify-center bg-black/90 rounded-full px-5 py-2 z-10">
                  <Sparkles className="size-5" />
                  AI Powered
                </button>
              </div>




              {/* Heading */}
              <h2 className="mx-auto max-w-4xl text-center text-3xl font-medium text-black/80 md:text-6xl">
                Ace Interviews with AI-Powered Learning
              </h2>

              {/* Description */}
              <p className="mx-auto max-w-3xl text-center md:text-xl text-neutral-800/80">
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here.
              </p>

              {/* Button */}
              <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
                <button
                  onClick={() => handelCTA()}
                  className="text-lg bg-black text-white px-4 py-2 rounded-full hover:bg-neutral-800 transition-all duration-150"
                >
                  <span>Get Started</span>
                </button>
              </div>
            </div>

            {/* Hero Image */}
            <img
              src={hero_img}
              alt="placeholder"
              className="mx-auto w-[350px] md:w-auto z-10 h-full max-h-[524px] max-w-5xl border-6 border-gray-200 shadow-lg rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>




      {/* login & signUp modal */}

      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        <div>
          {currentPage === "login" && (
            <Login setCurrentPage={setCurrentPage} />
          )}
          {currentPage === "signUp" && (
            <SignUp setCurrentPage={setCurrentPage} />
          )

          }
        </div>
      </Modal>


    </>
  );
};

export default LandingPage;
