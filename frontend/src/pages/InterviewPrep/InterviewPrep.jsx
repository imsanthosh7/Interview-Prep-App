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
      console.error(error.message)
    }

  }

  //  generate concept explantion 
  const generateConceptExplanation = async () => {

  }

  // pin questions 
  const togglePinQuestionsStatus = async () => {

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
  )
}

export default InterviewPrep