import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, ListCollapse, Pin } from 'lucide-react';
import sippner from '../../components/Loader/SpinnerLoader';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axios from 'axios';
import { API_PATHS } from '../../utils/apipath.js';
import QuestionCard from '../../components/Cards/QuestionCard.jsx';
import AIResponsePreview from './components/AIResponsePreview.jsx';
import Drawer from '../../components/Drawer.jsx';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import SkeletonLoader from '../../components/Loader/SkeletonLoader.jsx';
import { useNavigate } from 'react-router-dom';


const InterviewPrep = () => {

  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrormessage] = useState('');
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setUpdateLoader] = useState(false);

  
   
  const navigate = useNavigate();

  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // fetch session data by session id 
  const fetchSessionDetailsById = async () => {

    try {
      const response = await axios.get(`${baseUrl}${API_PATHS.SESSION.GET_ONE(sessionId)}`, {
        withCredentials: true,
      })


      if (response.data && response.data.session) {
        setSessionData(response.data.session)
      }
    } catch (error) {
      toast.error(error.message);
    }

  }

  //  generate concept explantion 
  const generateConceptExplanation = async (question) => {
    try {
      setErrormessage("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);

      const respones = await axios.post(`${baseUrl}${API_PATHS.AI.GENERATE_EXPLANATION}`, {
        question,
      }, {
        withCredentials: true,
      })

      if (respones.data) {
        setExplanation(respones.data);
      }

    } catch (error) {
      setExplanation(null);
      setErrormessage("Failed to generate explanation, try again later");
      console.error(error.message);

    } finally {
      setIsLoading(false);
    }
  }

  // pin questions 
  const togglePinQuestionsStatus = async (questionId) => {
    try {
      const respones = await axios.post(`${baseUrl}${API_PATHS.QUESTION.PIN(questionId)}`,
        {},
        {
          withCredentials: true,
        })


      if (respones.data && respones.data.question) {
        fetchSessionDetailsById();
      }

    } catch (error) {
      console.error(error.message)
    }
  }

  // add more questions to a session 
  const uploadMoreQuestions = async () => {
    try {
      setUpdateLoader(true);

      const aiResponse = await axios.post(`${baseUrl}${API_PATHS.AI.GENERATE_QUESTIONS}`, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 5,
      }, {
        withCredentials: true,
      });

      const generatedQuestions = aiResponse.data;


      const response = await axios.post(`${baseUrl}${API_PATHS.QUESTION.ADD_TO_SESSION}`, {
        sessionId,
        questions: generatedQuestions,
      }, {
        withCredentials: true,
      });


      if (response.data) {
        toast.success("Added More Q&A");
        fetchSessionDetailsById();
      }

    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went worn. Please try again.")
      }
    } finally {
      setUpdateLoader(false);
    }
  }

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }

    return () => {

    }
  }, [])

  return (
    <>
      <DashboardLayout>
        <RoleInfoHeader
          role={sessionData?.role || ""}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || ""}
          questions={sessionData?.questions?.length || "-"}
          description={sessionData?.description || ""}
          lastUpdated={
            sessionData?.updatedAt ? moment(sessionData.updatedAt).format("Do MMM YYYY") : ""
          }
        />

        <div className='container mx-auto pt-3 pb-4 px-4 md:px-0'>
          <nav className="my-4 text-neutral-500 text-sm font-semibold" aria-label="Breadcrumb">
            <ol className="list-reset flex">
              <li>
                <button
                  onClick={() => navigate('/')}
                  className="hover:underline hover:text-gray-800 cursor-pointer bg-transparent border-none p-0 m-0"
                >
                  Home
                </button>
                <span className="mx-2">/</span>
              </li>
              <li>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="hover:underline hover:text-gray-800 cursor-pointer bg-transparent border-none p-0 m-0"
                >
                  Dashboard
                </button>
                <span className="mx-2">/</span>
              </li>
              <li className="text-neutral-600">Current Page</li>
            </ol>
          </nav>
          <h2 className='text-lg font-semibold text-black'>Interview Q & A</h2>
          <div className='grid grid-cols-12 gap-4 mt-4 mb-10'>
            <div className={`${openLearnMoreDrawer ? "col-span-7" : "col-span-12 md:col-span-8"}`}>
              <AnimatePresence>
                {/* Split questions into pinned and unpinned */}
                {(() => {
                  const pinned = sessionData?.questions?.filter(q => q.isPinned) || [];
                  const unpinned = sessionData?.questions?.filter(q => !q.isPinned) || [];

                  return (
                    <>
                      {pinned.length > 0 && (
                        <>
                          <h3 className='text-md font-semibold text-green-500/90 mb-2 flex items-center'>Pinned Questions</h3>
                          {pinned.map((data, idx) => (
                            <motion.div
                              key={`pinned-${data._id || idx}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 100,
                                delay: idx * 0.1,
                                damping: 15,
                              }}
                              layout
                              layoutId={`question-${data._id || idx}`}
                            >
                              <QuestionCard
                                question={data?.question}
                                answer={data?.answer}
                                onLearnMore={() => generateConceptExplanation(data.question)}
                                isPinned={data?.isPinned}
                                onTogglePin={() => togglePinQuestionsStatus(data._id)}
                              />
                            </motion.div>
                          ))}
                        </>
                      )}

                      {unpinned.length > 0 && (
                        <>
                          {pinned.length > 0 && (
                            <h3 className='text-md font-semibold text-gray-700/90 mt-6 mb-2'>All Questions</h3>
                          )}
                          {unpinned.map((data, idx) => (
                            <motion.div
                              key={`unpinned-${data._id || idx}`}
                              initial={{ opacity: 0, y: -15 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{
                                duration: 0.4,
                                type: "spring",
                                stiffness: 100,
                                delay: idx * 0.1,
                                damping: 15,
                              }}
                              layout
                              layoutId={`question-${data._id || idx}`}

                            >
                              <QuestionCard
                                question={data?.question}
                                answer={data?.answer}
                                onLearnMore={() => generateConceptExplanation(data.question)}
                                isPinned={data?.isPinned}
                                onTogglePin={() => togglePinQuestionsStatus(data._id)}
                              />
                            </motion.div>
                          ))}
                        </>
                      )}
                      {!isLoading &&
                        sessionData?.questions?.length === (pinned.length + unpinned.length) && (
                          <div className='mt-4 flex justify-center'>
                            <button
                              className='flex items-center gap-2 px-4 py-2 bg-black rounded-md text-sm text-white hover:bg-neutral-800 cursor-pointer transition'
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? <SpinnerLoader /> : <ListCollapse className='size-5' />}
                              Load More
                            </button>
                          </div>
                        )}
                    </>
                  );
                })()}

              </AnimatePresence>
            </div>
            <div className='col-span-5'>
              <Drawer
                isOpen={openLearnMoreDrawer}
                onClose={() => setOpenLearnMoreDrawer(false)}
                title={!isLoading && explanation?.title}
              >
                {
                  errorMessage && (
                    <p className='flex gap-2 text-sm text-amber-600 font-medium'>
                      <CircleAlert className='mt-1' />
                    </p>
                  )
                }
                {isLoading && <SkeletonLoader />}
                {
                  !isLoading && explanation && (
                    <AIResponsePreview content={explanation?.explanation} />
                  )
                }
              </Drawer>
            </div>
          </div>

        </div>
      </DashboardLayout>
    </>

  )
}

export default InterviewPrep