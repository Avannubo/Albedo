"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Import from next/router instead of next/navigation
import Bcrypt from 'bcryptjs';
import Link from 'next/link';
import Image from 'next/image';
import { getHashPassword } from '@/lib/data';
import jwt from 'jsonwebtoken';
export default function Page() {
    const router = useRouter();
    // const [passwordHash, setPasswordHash] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    // useEffect(() => {
    //     async function fetchPasswordHash() {
    //         try {
    //             const data = await getHashPassword();
    //             if (data) {
    //                 setPasswordHash(data);
    //             } else {
    //                 setError('Error: No se encontró ninguna contraseña almacenada.');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching password hash:', error);
    //             setError('Error al obtener la contraseña. Por favor, inténtelo de nuevo.');
    //         }
    //     }
    //     fetchPasswordHash();
    // }, []);
    const handleInputChangePassword = (event) => {
        setPassword(event.target.value);
    };
    const generateToken = () => {
        const secretKey = "043950dea0158f162ef41f2a1b6c0fd2246e24c932399f527f3ec3cb685c1667";
        console.log(secretKey);
        if (!secretKey) {
            throw new Error('Secret key not found in environment variables');
        }
        const token = jwt.sign( "user", secretKey, { expiresIn: '1h' });
        return token;
    };

    const handleLogin = () => {
        try {
            // const passwordsMatch = Bcrypt.compareSync(password, process.env.PASSWORD_HASH);
            //console.log(process.env.PASSWORD_HASH);
            if (password) {
                const token = generateToken();
                localStorage.setItem('token', token);
                router.push('/admin/escritorio');
            } else {
                setError('Contraseña incorrecta. Inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            setError('Error al comparar contraseñas. Por favor, inténtelo de nuevo.');
        }
    };
    // useEffect(() => {
    //     const handleRouteChange = (url) => {
    //         if (!url.includes('/admin')) {
    //             localStorage.removeItem('token');
    //         }
    //     };
    //     const cleanup = () => {
    //         router.events.off('routeChangeStart', handleRouteChange);
    //     };
    //     router.events.on('routeChangeStart', handleRouteChange);
    //     return cleanup;
    // }, [router.pathname]);
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
                            priority
                        />
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">Iniciar sesión en el panel de administración</h2>
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
