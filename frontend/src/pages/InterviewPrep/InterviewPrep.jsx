import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { toast } from 'sonner';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, ListCollapse, ChevronRight } from 'lucide-react';
import axios from 'axios';

import { API_PATHS } from '../../utils/apipath.js';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import RoleInfoHeader from './components/RoleInfoHeader';
import QuestionCard from '../../components/Cards/QuestionCard.jsx';
import AIResponsePreview from './components/AIResponsePreview.jsx';
import Drawer from '../../components/Drawer.jsx';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import SkeletonLoader from '../../components/Loader/SkeletonLoader.jsx';
import { Button } from '@/components/ui/button';

const InterviewPrep = () => {

  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMessage, setErrormessage] = useState('');
  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setUpdateLoader] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_BASE_URL;

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

  const generateConceptExplanation = async (question) => {
    try {
      setErrormessage("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLearnMoreDrawer(true);
      const respones = await axios.post(`${baseUrl}${API_PATHS.AI.GENERATE_EXPLANATION}`, { question }, { withCredentials: true })
      if (respones.data) setExplanation(respones.data);
    } catch (error) {
      setExplanation(null);
      setErrormessage("Failed to generate explanation (API limit reached?). Try again later.");
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const togglePinQuestionsStatus = async (questionId) => {
    try {
      // No full loader for pinning, handled in QuestionCard
      await axios.post(`${baseUrl}${API_PATHS.QUESTION.PIN(questionId)}`, {}, { withCredentials: true })
      fetchSessionDetailsById();
    } catch (error) {
      console.error(error.message)
      toast.error("Failed to pin question");
    }
  }

  const uploadMoreQuestions = async () => {
    try {
      setUpdateLoader(true);
      const aiResponse = await axios.post(`${baseUrl}${API_PATHS.AI.GENERATE_QUESTIONS}`, {
        role: sessionData?.role,
        experience: sessionData?.experience,
        topicsToFocus: sessionData?.topicsToFocus,
        numberOfQuestions: 5,
      }, { withCredentials: true });

      const generatedQuestions = aiResponse.data;

      const response = await axios.post(`${baseUrl}${API_PATHS.QUESTION.ADD_TO_SESSION}`, {
        sessionId,
        questions: generatedQuestions,
      }, { withCredentials: true });

      if (response.data) {
        toast.success("Added more questions successfully");
        fetchSessionDetailsById();
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to add questions");
    } finally {
      setUpdateLoader(false);
    }
  }

  useEffect(() => {
    if (sessionId) fetchSessionDetailsById();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DashboardLayout>
      <div className='min-h-screen bg-background'>
        <RoleInfoHeader
          role={sessionData?.role || "Loading..."}
          topicsToFocus={sessionData?.topicsToFocus || ""}
          experience={sessionData?.experience || 0}
          questions={sessionData?.questions?.length || 0}
          description={sessionData?.description || ""}
          lastUpdated={sessionData?.updatedAt ? moment(sessionData.updatedAt).fromNow() : ""}
        />

        <div className='container max-w-7xl mx-auto py-8 px-6'>
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center text-sm text-muted-foreground font-mono">
            <button onClick={() => navigate('/')} className="hover:text-primary transition-colors">HOME</button>
            <ChevronRight className="w-4 h-4 mx-2 text-white/20" />
            <button onClick={() => navigate('/dashboard')} className="hover:text-primary transition-colors">DASHBOARD</button>
            <ChevronRight className="w-4 h-4 mx-2 text-white/20" />
            <span className="text-white">SESSION</span>
          </nav>

          <div className='grid grid-cols-1 lg:grid-cols-12 gap-8'>
            {/* Main Questions Column */}
            <div className='lg:col-span-8 space-y-6'>
              <h2 className='text-2xl font-display font-medium text-white mb-6 border-b border-white/10 pb-2'>
                Questions Bank
              </h2>

              <AnimatePresence mode="popLayout">
                {(() => {
                  const pinned = sessionData?.questions?.filter(q => q.isPinned) || [];
                  const unpinned = sessionData?.questions?.filter(q => !q.isPinned) || [];

                  return (
                    <>
                      {pinned.length > 0 && (
                        <div className="mb-8 p-1 bg-primary/5 rounded-xl border border-primary/10">
                          <h3 className='text-sm font-bold text-primary uppercase tracking-wider px-4 py-3 flex items-center gap-2'>
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            Pinned for Review
                          </h3>
                          <div className="space-y-4 px-2 pb-2">
                            {pinned.map((data, idx) => (
                              <motion.div
                                key={`pinned-${data._id || idx}`}
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
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
                          </div>
                        </div>
                      )}

                      <div className="space-y-4">
                        {unpinned.map((data, idx) => (
                          <motion.div
                            key={`unpinned-${data._id || idx}`}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.05 }}
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
                      </div>

                      {!isUpdateLoader && sessionData && (
                        <div className='mt-12 flex justify-center'>
                          <Button
                            onClick={uploadMoreQuestions}
                            size="lg"
                            variant="outline"
                            className="border-white/20 hover:bg-white/10 text-white font-bold tracking-wider"
                          >
                            <ListCollapse className='w-4 h-4 mr-2' /> LOAD MORE QUESTIONS
                          </Button>
                        </div>
                      )}
                      {isUpdateLoader && (
                        <div className="mt-8 flex justify-center p-4">
                          <SpinnerLoader />
                        </div>
                      )}
                    </>
                  );
                })()}
              </AnimatePresence>
            </div>

            {/* Desktop Sidebar / Stats placeholder ? */}
            <div className='hidden lg:block lg:col-span-4'>
              <div className="sticky top-24 p-6 border border-white/5 rounded-2xl bg-white/5 backdrop-blur-sm">
                <h3 className="text-lg font-display font-medium text-white mb-4">Pro Tips</h3>
                <ul className="space-y-3 text-sm text-muted-foreground list-disc pl-4">
                  <li>Pin complex questions to review them later.</li>
                  <li>Use "AI Explain" to get deeper context on concepts.</li>
                  <li>Try to answer out loud before revealing the answer.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <Drawer
          isOpen={openLearnMoreDrawer}
          onClose={() => setOpenLearnMoreDrawer(false)}
          title={!isLoading && explanation ? explanation.title : "Analyzing..."}
        >
          {errorMessage && (
            <div className='p-4 rounded bg-destructive/10 text-destructive flex gap-2'>
              <CircleAlert className='w-5 h-5 flex-shrink-0' />
              <p className="text-sm font-medium">{errorMessage}</p>
            </div>
          )}

          {isLoading && <SkeletonLoader />}

          {!isLoading && explanation && (
            <AIResponsePreview content={explanation?.explanation} />
          )}
        </Drawer>
      </div>
    </DashboardLayout>
  )
}

export default InterviewPrep