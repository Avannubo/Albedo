"use client"
import Link from "next/link";
import Image from "next/image";
import cookies from 'js-cookie';

export default function aside() {
  const handleLogout = () => {
    cookies.remove('token');
  };
  return (
    <div className="bg-slate-100 w-[400px]  h-[100vh]  shadow-2xl">
      <Link href="/" className="flex flex-col justify-center p-6">
        <Image
          src="/assets/images/Logo_albedo.png"
          alt="Vercel Logo"
          className="self-center"
          width={250}
          height={100}
          priority="true"
        />
      </Link>
      <div className="flex flex-col space-y-4 p-4 ">
        <Link
          href="/admin/dashboard"
          className="cursor-pointer p-4 w-full box-shadow bg-white rounded-lg "
        >
          <p className="flex justify-center font-semibold">Dashboard</p>
        </Link>
        <Link
          href="/admin/ListProducts"
          className="cursor-pointer p-4 w-full box-shadow bg-white rounded-lg "
        >
          <p className="flex justify-center font-semibold">Productos</p>
        </Link>
        <Link
          href="/admin/RellenarStock"
          className="cursor-pointer p-4 w-full box-shadow bg-white rounded-lg "
        >
          <p className="flex justify-center font-semibold">Reponer Stock</p>
        </Link>
        <Link
          href="/admin/orders"
          className="cursor-pointer p-4 w-full box-shadow bg-white rounded-lg "
        >
          <p className="flex justify-center font-semibold">Pedidos</p>
        </Link>
        <Link
          href="/admin/settings"
          className="cursor-pointer p-4 w-full box-shadow bg-white rounded-lg "
        >
          <p className="flex justify-center font-semibold">Parametros Globales</p>
        </Link>
        <Link
          href="/"
          onClick={handleLogout}
          className="cursor-pointer p-4 w-full box-shadow bg-white rounded-lg "
        >
          <p className="flex justify-center font-semibold">Salir</p>
        </Link>
      </div>
    </div>
  );
}
