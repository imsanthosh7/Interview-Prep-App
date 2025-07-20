import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import Input from '../../components/Inputs/Input'
import axios from 'axios';
import { API_PATHS } from '../../utils/apipath';


const CreateSessionForm = () => {

    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    })

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // backend url 
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData, [key]: value,
        }))
    }

    const handleCreatesession = async (e) => {
        e.preventDefault();

        const { role, experience, topicsToFocus, description } = formData;

        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.")
        }

        setError("");
        setLoading(true)


        try {

            const aiResponse = await axios.post(`${baseUrl}${API_PATHS.AI.GENERATE_QUESTIONS}`, {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10,
            }, {
                withCredentials: true,
            });

            const generatedQuestions = aiResponse.data;


            const response = await axios.post(`${baseUrl}${API_PATHS.SESSION.CREATE}`, {
                ...formData,
                questions: generatedQuestions,
            }, {
                withCredentials: true,
            });

        

            if (response.data?.session?._id) {
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }

        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went worn. Please try again.")
            }
        } finally {
            setLoading(false);
        }



    }

    return (
        <div className='w-[90vw] md:w-[35vw] p-7 flex flex-col justify-center'>
            <h3 className='text-lg font-semibold text-black'>
                Start a New Interview Journey
            </h3>
            <p className='text-xs text-slate-700 mt-[5px] mb-3'>
                Fill out a few quick details and unlock your personalized set of
                interview questions!
            </p>

            <form onSubmit={handleCreatesession} className='flex flex-col gap-3'>
                <Input
                    value={formData.role}
                    onChange={({ target }) => handleChange("role", target.value)}
                    label="Target Role"
                    placeholder="(e.g., Frontend Developer, UI/UX Designer, etc.)"
                    type="text"
                />


                <Input
                    value={formData.experience}
                    onChange={({ target }) => handleChange("experience", target.value)}
                    label="Years of Experience"
                    placeholder="(e.g., 1 year, 3 years, 5+ years)"
                    type="number"
                />

                <Input
                    value={formData.topicsToFocus}
                    onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                    label="Topics to Focus On"
                    placeholder="(Comma-separated, e.g., React, Node.js, MongoDB)"
                    type="text"
                />

                <Input
                    value={formData.description}
                    onChange={({ target }) => handleChange("description", target.value)}
                    label="Description"
                    placeholder="(Any specific goals or notes for this session)"
                    type="text"
                />

                {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                <button
                    type='submit'
                    className='btn-primary w-full mt-2'
                    disabled={isLoading}
                >
                    {isLoading ? <SpinnerLoader /> : "Create Session"}
                </button>

            </form>
        </div>
    )
}

export default CreateSessionForm