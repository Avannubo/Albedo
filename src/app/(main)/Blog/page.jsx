"use client"
import { useEffect } from 'react';
export default function BlogRedirect() {
    useEffect(() => {
        if (window.location.pathname === '/Blog') {
            window.location.replace('https://blog.albedo.biz');
        }
    }, []);
    return null;
}
