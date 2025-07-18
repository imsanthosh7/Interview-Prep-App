import React, { useEffect, useState } from 'react';
import { Key, Plus } from 'lucide-react';
import { CARD_BG } from '../../utils/data.js';
import { toast } from 'sonner';
import DashboardLayout from '../../components/layouts/DashboardLayout.jsx';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../../utils/apipath.js';
import axios from 'axios';
import SummaryCard from '../../components/Cards/SummaryCard.jsx';
import moment from 'moment';


const Dashboard = () => {

  const navigate = useNavigate();


  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [session, setsession] = useState([]);
  console.log(session)

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null,
  });


  // backend url 
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const fetchAllsessions = async () => {
    try {
      const response = await axios.get(`${baseUrl}${API_PATHS.SESSION.GET_ALL}`, {
        withCredentials: true,
      });

      setsession(response.data);

    } catch (error) {
      console.log("Error fetching sessions data", error.message);
      toast.error(error.message);
    }


  }

  const deleteAllSessions = async () => {

  }


  useEffect(() => {
    fetchAllsessions()
  }, []);

  return (
    <DashboardLayout>
      <div className='w-9/10 container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
          {session?.map((data, index) => (
            <SummaryCard
              Key={data?._id}
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
          ))}

        </div>
        <button className='h-12 md:h-12 flex items-center justify-center gap-3 bg-linear-to-r from-[#7D1C4A] to-[#670D2F] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-[#670D2F] fixed bottom-10 md:bottom-20 right-10 md:right-20'
          onClick={() => setOpenCreateModel(true)}>
          <Plus className='text-2xl text-white' />
          Add New
        </button>
      </div>

    </DashboardLayout>
  )
}

export default Dashboard