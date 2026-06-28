import api from '@/lib/api/apiClient';
import useAuthStore from '@/lib/store/authStore';
import { useQuery } from '@tanstack/react-query';
import { Loader } from 'lucide-react';
import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router';

export const AdminProtectedRoute = ({ children }) => {

    const { user, setAuth, clearAuth, token } = useAuthStore();


    const location = useLocation()

    const { data, error, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await api.get('/auth/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data
        },
        retry: 1
    })


    useEffect(() => {

        if (error) {
            clearAuth();
        }

    }, [isError, error, clearAuth]);


    // success case
    useEffect(() => {
        if (isSuccess && data) {
            setAuth(data, token)
        }

    }, [isSuccess, data, setAuth, token])

    if (isLoading) {
        return (
            <div className='flex h-screen items-center justify-center'>
                <Loader className='animate-spin' />
            </div>
        )
    }


    if (!user) {
        console.log("user not found", user);
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    if (user.role != 'admin') {
        // return <h1>Nice try , only for admin</h1>
        return <Navigate to="/dashboard" state={{ from: location }} replace />
    }



    if (isError) {
        console.log("error here", error);
        return <Navigate to="/login" state={{ from: location }} replace />
    }
    return children

}
