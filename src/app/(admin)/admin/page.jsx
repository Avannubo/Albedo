"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs'; // Import bcryptjs
import Link from 'next/link';
import Image from 'next/image';
import { getHashPassword } from '@/lib/data'; 

export default function Page() {
    const router = useRouter();
    const [passwordHash, setPasswordHash] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleInputChangePassword = (event) => {
        setPassword(event.target.value);
    };

    useEffect(() => {
        async function fetchPasswordHash() {
            try {

                const data = await getHashPassword();
                // Ensure data is not empty and is a valid hash
                // console.log(data);
                if (data) {
                    setPasswordHash(data);
                } else {
                    setError('Error: No se encontró ninguna contraseña almacenada.');
                }
            } catch (error) {
                console.error('Error fetching password hash:', error);
                setError('Error al obtener la contraseña. Por favor, inténtelo de nuevo.');
            }
        }

        fetchPasswordHash();

    }, []);

    const handleLogin = () => {
        try {
            // Compare the entered password with the stored hashed password
            console.log("Entered password:", password);
            console.log("Stored hashed password:", passwordHash);

            const passwordsMatch = bcrypt.compareSync(password, passwordHash);
            console.log('Passwords Match:', passwordsMatch);

            if (passwordsMatch) {
                // If password matches, redirect to admin dashboard
                router.push('/admin/escritorio');
            } else {
                // If password doesn't match, display error
                setError('Contraseña incorrecta. Inténtelo de nuevo.');
            }
        } catch (error) {
            console.error('Error comparing passwords:', error);
            setError('Error al comparar contraseñas. Por favor, inténtelo de nuevo.');
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
                            priority

                        />
                    </Link>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600">Iniciar sesión en el panel de administración</h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full  ">
                    <div className="space-y-6">
                        {/* <div>
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                        <div className="mt-2">
                            <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#304590] sm:text-sm sm:leading-6" />
                        </div>
                    </div> */}
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
                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?
                    <a href="#" className="font-semibold leading-6 text-[#304590] hover:text-[#475caa]">Start a 14 day free trial</a>
                </p> */}
                </div>
            </div>
        </div>
    )
}
