import React, { useEffect, useContext, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { toast } from 'sonner';
import { API_PATHS } from '../../utils/apipath';

const OAuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);
    const baseUrl = import.meta.env.VITE_BASE_URL || 'http://localhost:8000';
    const hasProcessed = useRef(false);

    useEffect(() => {
        // Prevent duplicate processing
        if (hasProcessed.current) return;

        const handleCallback = async () => {
            hasProcessed.current = true;

            const token = searchParams.get('token');
            const userId = searchParams.get('userId');
            const error = searchParams.get('error');

            if (error) {
                toast.error('Authentication failed. Please try again.');
                navigate('/');
                return;
            }

            if (token && userId) {
                try {
                    // Store token
                    localStorage.setItem('token', token);

                    // Construct the full URL properly
                    const profileUrl = `${baseUrl}${API_PATHS.AUTH.GET_PROFILE}`;
                    console.log('Fetching profile from:', profileUrl);

                    // Fetch user profile
                    const response = await axios.get(
                        profileUrl,
                        {
                            withCredentials: true,
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data) {
                        updateUser({
                            _id: response.data._id,
                            name: response.data.name,
                            email: response.data.email,
                            profileImageUrl: response.data.profileImageUrl,
                            token,
                        });

                        toast.success('Successfully logged in with Google!');
                        navigate('/dashboard');
                    }
                } catch (error) {
                    console.error('OAuth callback error:', error);
                    console.error('Error details:', error.message);
                    toast.error('Failed to complete authentication.');
                    navigate('/');
                }
            } else {
                toast.error('Invalid authentication response.');
                navigate('/');
            }
        };

        handleCallback();
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500"></div>
                <p className="mt-4 text-gray-600">Completing authentication...</p>
            </div>
        </div>
    );
};

export default OAuthCallback;
