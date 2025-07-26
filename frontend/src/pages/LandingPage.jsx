import React, { useContext, useState } from "react";
import { Sparkles, CircleUser, CirclePower } from "lucide-react";
import hero_img from "/src/assets/hero-img.png";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'
import Login from './Auth/Login';
import SignUp from "./Auth/SignUp";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";
import Orb from "@/components/Orb";
import BentoFeatures from "@/components/BentoFeatures";


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
        <div className="w-full container items-center flex justify-between  mx-auto px-6 md:px-10 py-4">
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

      {/* Hero Section */}
      <section className="mx-3 md:mx-auto">
        <div className="relative container mx-auto overflow-hidden bg-black pt-28 pb-16 px-5 md:px-10 rounded-tl-4xl rounded-tr-4xl bg-cover bg-center bg-no-repeat">
          {/* Orb background animation */}
          <div className="orb-container md:-mt-14  absolute inset-0 z-0">
            <Orb
              hoverIntensity={1.75}
              rotateOnHover={true}
              hue={0}
              forceHoverState={false}
            />
          </div>

          {/* Smooth white fade at the bottom */}
          <div className="absolute bottom-0 left-0 w-full h-52 md:h-160 bg-gradient-to-t from-white to-transparent z-10" />

          {/* Content */}
          <div className="relative z-10 max-w-7xl mx-auto pointer-events-none">
            <div className="flex flex-col gap-8 items-center text-center">
              {/* Tag */}
              <div className="relative w-fit rounded-full px-[3px] py-[3px] ">
                <button className="text-black text-base md:text-lg flex gap-2 font-semibold items-center justify-center bg-white rounded-full px-5 py-2 pointer-events-auto">
                  <Sparkles className="size-5" />
                  AI Powered
                </button>
              </div>

              {/* Heading */}
              <h2 className="max-w-4xl text-3xl md:text-6xl font-medium text-white">
                Ace Interviews with AI-Powered Learning
              </h2>

              {/* Description */}
              <p className="max-w-3xl text-white/80 text-base md:text-xl">
                Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery — your ultimate interview toolkit is here.
              </p>

              {/* CTA Button */}
              <div className="relative w-fit mt-2 rounded-full shine-border px-[3px] py-[3px]">
                <button
                  onClick={() => handelCTA()}
                  className="pointer-events-auto cursor-pointer text-white text-base md:text-lg flex gap-2 font-semibold items-center justify-center bg-black/90 rounded-full px-5 py-2 z-10"
                >
                  Get Started
                </button>
              </div>

              {/* Hero Image */}
              <img
                src={hero_img}
                alt="placeholder"
                className="mt-10 w-[330px] md:w-[1000px] max-h-[524px] max-w-5xl rounded-2xl object-cover border-6 border-gray-200 shadow-lg pointer-events-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bento Features Section */}
      <section className="px-5 md:px-10">
        <BentoFeatures />
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
