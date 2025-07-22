import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, ListCollapse } from 'lucide-react';
import sippner from '../../components/Loader/SpinnerLoader';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import axios from 'axios';
import { API_PATHS } from '../../utils/apipath.js';
import QuestionCard from '../../components/Cards/QuestionCard.jsx';


const InterviewPrep = () => {

  const { sessionId } = useParams();

  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrormessage] = useState('');
  const [openLearnMoreDrawer, setLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoadind] = useState(false);
  const [isUpdateLoader, setUpdateLoader] = useState(false);


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
  const generateConceptExplanation = async () => {

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
      </DashboardLayout>

      <div className='container mx-auto pt-4 pb-4 px-4 md:px-0'>
        <h2 className='text-lg font-semibold text-black'>Interview Q & A</h2>
        <div className='grid grid-cols-12 gap-4 mt-4 mb-10'>
          <div className={`col-span-12 ${openLearnMoreDrawer ? "col-span-7" : "col-span-8"}`}>
            <AnimatePresence>
              {sessionData?.questions?.slice()
                .sort((a, b) => b.isPinned - a.isPinned)
                .map((data, idx) => {
                  return (
                    <motion.div
                      key={data._id || idx}
                      initial={{ opacity: 0, y: -20 }}
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
                      <>
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() => generateConceptExplanation(data.question)}
                          isPinned={data?.isPinned}
                          onTogglePin={() => togglePinQuestionsStatus(data._id)}
                        />
                      </>
                    </motion.div>
                  )
                })}
            </AnimatePresence>
          </div>
        </div>
      </div>

    </>

  )
}

export default InterviewPrep