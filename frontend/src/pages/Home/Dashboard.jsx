import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { CARD_BG } from '../../utils/data.js';
import { toast } from 'sonner';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apipath.js';
import axios from 'axios';
import SummaryCard from '../../components/Cards/SummaryCard.jsx';
import moment from 'moment';
import Model from '../../components/Modal.jsx'
import CreateSessionForm from './CreateSessionForm.jsx';
import DeleteAlertContent from '../../components/DeleteAlertContent.jsx';
import SkeletonGrid from '../../components/Loader/SkeletonGrid.jsx';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import { capitalizeFirstLetter } from '../../utils/helper.js';

const Dashboard = () => {

  const { user } = useContext(UserContext);
  const navigate = useNavigate();


  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [session, setsession] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });




  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchAllsessions = async () => {

    setIsLoading(true);

    try {
      const response = await axios.get(`${baseUrl}${API_PATHS.SESSION.GET_ALL}`, {
        withCredentials: true,
      });

      setsession(response.data);

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

      setOpenDeleteAlert({
        open: false,
        data: null,
      })

      fetchAllsessions();
    } catch (error) {
      console.error("Error deleting session data:", error)
    }

  }


  useEffect(() => {
    fetchAllsessions()
  }, []);

  return (

    <DashboardLayout>

      {
        isLoading ? (
          <SkeletonGrid />
        ) : session && session.length > 0 ? (
          <div className='w-9/10 container mx-auto pt-4 pb-4'>
            <div className='my-5 ml-5 md:ml-0'>
              <h1 className='text-2xl font-semibold'>
                Welcome back, {capitalizeFirstLetter(user?.name) || "Guest"}!
              </h1>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
              {session.map((data, index) => (
                <div key={data?._id}>
                  <SummaryCard
                    colors={CARD_BG[index % CARD_BG.length]}
                    role={data?.role || ""}
                    topicsToFocus={data?.topicsToFocus || ""}
                    experience={data?.experience || "-"}
                    questions={data?.questions?.length || "-"}
                    description={data?.description || ""}
                    lastUpdated={
                      data?.updatedAt ? moment(data.updatedAt).format("Do MMM YYYY") : ""
                    }
                    onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                    onDelete={() => setOpenDeleteAlert({ open: true, data })}
                  />
                </div>
              ))}
            </div>

            <button
              className='h-12 md:h-12 flex gap-1  bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 cursor-pointer transition-all fixed bottom-10 md:bottom-20 right-10 md:right-20'
              onClick={() => setOpenCreateModel(true)}
            >
              <Plus className='text-2xl text-white' />
              Add New
            </button>
          </div>
        ) : (
          <div className='mt-32 px-4 text-center '>
            <h1 className='text-4xl font-medium'>
              Welcome, {capitalizeFirstLetter(user?.name) || "Guest"}!
            </h1>
            <p className='text-gray-600 md:text-lg mt-2'>
              You don’t have any sessions yet. Click the button below to create one.
            </p>
            <button
              className='mt-6 bg-black text-white px-6 py-3 rounded-full hover:bg-neutral-800 cursor-pointer transition-all'
              onClick={() => setOpenCreateModel(true)}
            >
              Create Your First Session
            </button>
          </div>
        )}




      <Model isOpen={openCreateModel}
        onClose={() => {
          setOpenCreateModel(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>

      </Model>

      <Model
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleteAlert({ open: false, data: null })
        }}
        title="Delete Alert"
      >
        <div>
          <DeleteAlertContent
            content="Are you sure you want to delete this session detail?"
            onDelete={() => deleteSession(openDeleteAlert.data)}
            setOpenDeleteAlert={setOpenDeleteAlert}
          />
        </div>
      </Model>

    </DashboardLayout>
  )
}

export default Dashboard