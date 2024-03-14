
import { FormEvent } from 'react'

export default function Page({ pageData }) {
    return <section>
        {/* {pageData.id} */}
        <div className="flex flex-col">
            <div className="">
                <h1 className="font-semibold text-4xl">Product 1</h1>
                <p>product Id #1234</p>
            </div>
            <div className="w-full rounded-md shadow-lg mb-12 p-10">
                <form action="#" className='flex flex-col'>
                    <div className='flex flex-row justify-between space-x-4'>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nombre de Producto</label>
                            <input type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="product" required />
                        </div>
                        <div className="mb-4 flex-1">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Precio de producto</label>
                            <input type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Precio" required />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Descripción del Producto</label>
                        <input type="text" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Descripción" required />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Producto Cuerpo</label>
                        <textarea type="textarea" rows="5" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className='flex flex-row justify-between space-x-4'>
                        <div className="flex-1 mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                            <input type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Stock" required />
                        </div>
                        <div className="flex-1 mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Min. Stock</label>
                            <input type="number" min="0" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Min. Stock" required />
                        </div>
                        <div className="flex-1 mb-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Plazo de entrega</label>
                            <input type="number" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" placeholder="Dias" required />
                        </div>
                    </div>
                    <div className='flex justify-center my-4'>
                        <button className="w-[150px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section >
}