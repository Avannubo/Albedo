import Link from 'next/link';
import Image from "next/image"; 

export default function aside() {
    return <div className="bg-slate-100 w-[300px] fixed left-0 top-0 h-[100vh] shadow-2xl z-40">
        <div className='flex flex-col justify-center p-6'>
        <Image src="/images/Logo_albedo.png"
                            alt="Vercel Logo"
                            className="self-center"
                            width={250}
                            height={100}
                            priority
                        />
        </div>
        <div className="flex flex-col space-y-4 p-4 ">
            <Link href="/admin" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Escritorio</p>
            </Link>
            <Link href="/admin/users" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Usuarios</p>
            </Link>
            <Link href="/admin/categories" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Categorias</p>
            </Link>
            <Link href="/admin/products" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Productos</p>
            </Link>
            <Link href="/admin/orders" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Pedidos</p>
            </Link>
        </div>
    </div>
}