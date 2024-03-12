import Link from 'next/link';
export default function aside() {
    return <div className="bg-slate-100 w-[300px] fixed left-0 top-0 h-[100vh] shadow-2xl z-40">
        <div className="flex flex-col space-y-4 p-4 mt-12 ">
            {/* <Link href="/" className="cursor-pointer p-6 w-full hover:shadow-md bg-white rounded-lg ">
                    <p className="flex justify-center font-semibold">
                        Home</p>
                </Link> */}
            <Link href="/admin/users" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Usuarios</p>
            </Link>
            <Link href="/admin/products" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Productos</p>
            </Link><Link href="/admin/orders" className="cursor-pointer p-4 w-full hover:shadow-md bg-white rounded-lg ">
                <p className="flex justify-center font-semibold">Pedidos</p>
            </Link>
        </div>
    </div>
}