import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext';
import { useNavigate } from 'react-router-dom';
import { Plus, Layout } from 'lucide-react';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'sonner';

import { API_PATHS } from '../../utils/apipath.js';
import { capitalizeFirstLetter } from '../../utils/helper.js';

import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import SummaryCard from '../../components/Cards/SummaryCard.jsx';
import Model from '../../components/Modal.jsx';
import CreateSessionForm from './CreateSessionForm.jsx';
import DeleteAlertContent from '../../components/DeleteAlertContent.jsx';
import SkeletonGrid from '../../components/Loader/SkeletonGrid.jsx';
import { Button } from '@/components/ui/Button';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [session, setSession] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({ open: false, data: null });

  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchAllSessions = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${baseUrl}${API_PATHS.SESSION.GET_ALL}`, {
        withCredentials: true,
      });
      setSession(response.data);
    } catch (error) {
      console.log("Error fetching sessions data", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteSession = async (sessionData) => {
    try {
      await axios.delete(`${baseUrl}${API_PATHS.SESSION.DELETE(sessionData?._id)}`, {
        withCredentials: true,
      })
      toast.success("Session Deleted Successfully");
      setOpenDeleteAlert({ open: false, data: null })
      fetchAllSessions();
    } catch (error) {
      console.error("Error deleting session data:", error)
      toast.error("Failed to delete session");
    }
  }

  useEffect(() => {
    fetchAllSessions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout>
      <div className="container max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-medium text-white mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, <span className="text-primary font-medium">{capitalizeFirstLetter(user?.name) || "User"}</span>. Ready to prep?
            </p>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <SkeletonGrid />
        ) : session && session.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {session.map((data) => (
              <SummaryCard
                key={data?._id}
                role={data?.role || "Unknown Role"}
                topicsToFocus={data?.topicsToFocus || "General"}
                experience={data?.experience || 0}
                questions={data?.questions?.length || 0}
                description={data?.description}
                lastUpdated={data?.updatedAt ? moment(data.updatedAt).fromNow() : "Just now"}
                onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                onDelete={() => setOpenDeleteAlert({ open: true, data })}
              />
            ))}
          </div>
        ) : (
          <div className="min-h-[400px] flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-white/5 p-8 text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-muted-foreground">
              <Layout className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">No sessions yet</h2>
            <p className="text-muted-foreground max-w-md cursor-text mb-8">
              Start your journey by creating a new interview session. We'll tailor questions to your role and experience.
            </p>
            <Button
              onClick={() => setOpenCreateModel(true)}
              size="lg"
              className="font-bold gap-2 pl-6 pr-8"
            >
              <Plus className="w-5 h-5" /> CREATE NEW SESSION
            </Button>
          </div>
        )}

        {/* Floating Action Button (Only show if sessions exist) */}
        {session && session.length > 0 && (
          <Button
            onClick={() => setOpenCreateModel(true)}
            className="fixed bottom-8 right-8 rounded-full h-14 pl-6 pr-8 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Plus className="w-6 h-6 mr-2" /> NEW SESSION
          </Button>
        )}
      </div>

      {/* Modals */}
      <Model
        isOpen={openCreateModel}
        onClose={() => setOpenCreateModel(false)}
        hideHeader
      >
        <div>
          <CreateSessionForm onClose={() => setOpenCreateModel(false)} fetchSessions={fetchAllSessions} />
        </div>
      </Model>

      <Model
        isOpen={openDeleteAlert?.open}
        onClose={() => setOpenDeleteAlert({ open: false, data: null })}
        title="Delete Session"
      >
        <DeleteAlertContent
          content="This action cannot be undone. Are you sure you want to delete this session?"
          onDelete={() => deleteSession(openDeleteAlert.data)}
          setOpenDeleteAlert={setOpenDeleteAlert}
        />
      </Model>
    </DashboardLayout>
  );
};

export default Dashboard;