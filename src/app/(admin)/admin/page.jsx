"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { login } from '@/lib/data';
import cookie from 'js-cookie';

export default function Page() {
    const router = useRouter();
    // const [passwordHash, setPasswordHash] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const handleInputChangePassword = (event) => {
        setPassword(event.target.value);
    };


    const handleLogin = async () => {
        try {
            const response = await login(password); // Send plain password to server
            if (response.token) {
                // Successfully logged in, save token and redirect
                // localStorage.setItem('token', response.token);      //, { expires: 0.5 }
                cookie.set('token', response.token);
                // router.push('/admin/dashboard');
                router.push('/admin/products');
            } else {
                // Error occurred, display error message
                setError(response.error);
            }
        } catch (error) {
            console.error('Error during login:', error); 
            setError('Error during login. Please try again.');
        }
    };

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-24 lg:px-8">
            <div className='border bg-slate-50 p-12 rounded-lg mx-auto  sm:max-w-sm md:max-w-lg xl:max-w-xl' >
                <div className="sm:mx-auto sm:w-full ">
                    <Link href="/" className="flex flex-col justify-center">
                        <Image
                            src="/images/Logo_albedo.png"
                            alt="Vercel Logo"
                            className="self-center"
                            width={250}
                            height={100}
                            priority="true"
                        />
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-600">Iniciar sesión en el panel de administración</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full  ">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-lg font-bold leading-6 text-gray-600">Contraseña</label>
                            </div>
                            <div className="mt-2">
                                <input onChange={handleInputChangePassword} value={password} id="password" placeholder='***********' name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 px-3 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#304590] sm:text-sm sm:leading-6" />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </div>
                        </div>
                        <div>
                            <button onClick={handleLogin} className="flex w-full justify-center rounded-md bg-[#304590] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#475caa] focus-visible:outline">Iniciar sesión</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
