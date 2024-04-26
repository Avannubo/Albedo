"use client"
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import cookie from 'js-cookie';


const AdminRouteGuard = ({ children }) => {
    const router = useRouter();

    useEffect(() => {
        // Check if the user is authenticated and is an admin
        const checkAccess = async () => {
            const token = cookie.get('token');

            if (!token) {
                // If there is no token, redirect to the login page
                await router.push('/admin');
            } else {
            }
        };

        checkAccess();
    }, []);

    return children;
};

export default AdminRouteGuard;
