import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_PATHS } from '../../utils/apipath';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/Label';
import SpinnerLoader from '@/components/Loader/SpinnerLoader';
import { Briefcase, Clock, FileText, Target, AlertCircle } from 'lucide-react';

const CreateSessionForm = ({ onClose }) => {

    const [formData, setFormData] = useState({
        role: "",
        experience: "",
        topicsToFocus: "",
        description: "",
    })

    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const baseUrl = import.meta.env.VITE_BASE_URL;

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData, [key]: value,
        }))
    }

    const handleCreatesession = async (e) => {
        e.preventDefault();
        const { role, experience, topicsToFocus } = formData;
        if (!role || !experience || !topicsToFocus) {
            setError("Please fill all the required fields.");
            return;
        }

        setError("");
        setLoading(true)

        try {
            const aiResponse = await axios.post(`${baseUrl}${API_PATHS.AI.GENERATE_QUESTIONS}`, {
                role,
                experience,
                topicsToFocus,
                numberOfQuestions: 10,
            }, { withCredentials: true });

            const generatedQuestions = aiResponse.data;

            const response = await axios.post(`${baseUrl}${API_PATHS.SESSION.CREATE}`, {
                ...formData,
                questions: generatedQuestions,
            }, { withCredentials: true });

            if (response.data?.session?._id) {
                if (onClose) onClose();
                navigate(`/interview-prep/${response.data?.session?._id}`);
            }

        } catch (error) {
            setError(error.response?.data?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col'>
            <div className="mb-6">
                <h3 className="text-2xl font-display font-medium text-white mb-2">New Session</h3>
                <p className="text-sm text-muted-foreground">Configure your interview focus. Our AI will tailor questions specifically for you.</p>
            </div>

            <form onSubmit={handleCreatesession} className='flex flex-col gap-5'>
                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Briefcase className="w-4 h-4 text-primary" /> Target Role</Label>
                    <Input
                        value={formData.role}
                        onChange={({ target }) => handleChange("role", target.value)}
                        placeholder="e.g. Senior React Developer"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Years of Experience</Label>
                    <Input
                        value={formData.experience}
                        onChange={({ target }) => handleChange("experience", target.value)}
                        placeholder="e.g. 5"
                        type="number"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><Target className="w-4 h-4 text-primary" /> Tech Stack / Topics</Label>
                    <Input
                        value={formData.topicsToFocus}
                        onChange={({ target }) => handleChange("topicsToFocus", target.value)}
                        placeholder="e.g. React, Node.js, System Design"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="flex items-center gap-2"><FileText className="w-4 h-4 text-primary" /> Notes / Goal</Label>
                    <Input
                        value={formData.description}
                        onChange={({ target }) => handleChange("description", target.value)}
                        placeholder="e.g. Preparing for Google interview next week"
                    />
                </div>

                {error && (
                    <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md flex items-center gap-2 mt-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <Button
                    type='submit'
                    className='w-full mt-4 font-bold h-11'
                    disabled={isLoading}
                >
                    {isLoading ? <SpinnerLoader /> : "GENERATE SESSION"}
                </Button>

            </form>
        </div>
    )
}

export default CreateSessionForm;