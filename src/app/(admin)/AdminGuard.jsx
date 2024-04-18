"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAuthenticated, isAdmin } from '@/lib/auth';

const AdminRouteGuard = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated and is an admin
        const checkAccess = async () => {
            if (!isAuthenticated() || !isAdmin()) {
                // If not authenticated or not an admin, redirect to login page
                await router.push('/admin'); // Redirect to your login page
            }
        };

        checkAccess();
    }, []);

    return children;
};

export default AdminRouteGuard;
