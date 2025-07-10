import React, { useState } from "react";
import { Wifi, Zap, Sparkles, } from "lucide-react";
import { Button } from "@/components/ui/button";
import hero_img from "/src/assets/hero-img.png";
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal'
import Login from './Auth/Login';

import SignUp from "./Auth/SignUp";


const LandingPage = ({

  icon,
  heading,
  description,
  button,
  trustText,
  imageSrc,
  imageAlt,
}) => {

  const navigate = useNavigate();

  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");


  // Default props fallback
  const defaultIcon = <Wifi className="size-6" />;
  const defaultButton = {
    text: " Get Started",
    // icon: <Zap className="size-4" />,
    url: "/",
  };

  return (
    <>
      <nav>
        <div className="w-full flex justify-between px-5 md:px-40 py-5">
          <div>
            <h1 className="text-2xl font-bold">Lorem ipsum</h1>
          </div>
          <div>
            <Button
              onClick={() => setOpenAuthModal(true)}
              className="cursor-pointer text-lg rounded-full" >
              Login
            </Button>
          </div>
        </div>
      </nav>

      {/* hero  section  */}
      <section
        className="overflow-hidden py-32 md:mx-10 mx-5 rounded-4xl bg-cover bg-color bg-center bg-no-repeat bg-image"
      
      >
        <div className="">
          <div className="flex flex-col gap-5">
            <div className="relative flex flex-col z-3 gap-5">
              {/* Radial border background effect */}
              <div
                className="absolute  top-1/2 left-1/2  -z-10 mx-auto size-[800px] rounded-full border border-gray p-16 md:size-[1300px] md:p-32"
                style={{ transform: "translate(-50%, -50%)" }}
              >
                <div className="size-full rounded-full border p-16 md:p-32 border-gray">
                  <div className="size-full rounded-full border border-gray " />
                </div>
              </div>

              {/* Icon */}
              <div className="mx-auto flex gap-2 font-semibold items-center justify-center rounded-full border px-3 py-3 border-gray ">
                <Sparkles className="size-5 " /> AI Powered
              </div>

              {/* Heading */}
              <h2 className="mx-auto max-w-4xl text-center text-3xl font-medium text-balance md:text-6xl">
                {heading || " Ace Interviews with AI-Powered Learning"}
              </h2>

              {/* Description */}
              <p className="mx-auto max-w-3xl text-center text-muted-foreground md:text-lg">
                {description ||
                  " Get role-specific questions, expand answers when you need them, dive deeper into concepts, and organize everything your way. From preparation to mastery - your ultimate interview toolkit is here."}
              </p>

              {/* Button and Trust Text */}
              <div className="flex flex-col items-center justify-center gap-3 pt-3 pb-12">
                <Button
                  onClick={() => setOpenAuthModal(true)}
                  className="upsale-button text-xl rounded-full cursor-pointer"
                >
                  <span>Get Started</span>
                </Button>
                {trustText && (
                  <div className="text-xs text-muted-foreground">{trustText}</div>
                )}
              </div>
            </div>

            {/* Hero Image */}
            <img
              src={imageSrc || hero_img}
              alt={imageAlt || "placeholder"}
              className="md:mx-auto z-5 h-full max-h-[524px] max-w-5xl border-2 border-gray-100 shadow-lg rounded-2xl object-cover"
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
