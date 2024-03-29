export default function Page() {
    return <section>
        <div className="flex flex-col items-center justify-start mb-32">
        <div className="flex flex-row  w-[1300px] justify-start py-8 self-center">
          <div className="flex flex-col justify-start  self-start">
            <div className="mb-4">
              <h1 className="font-bold text-4xl">
                Checkout
              </h1>
              <p className="font-bold">Completa los siguientes campos para realizar tu pedido</p>
            </div>
            <div className="flex flex-row  w-[1300px] space-x-4">
              <div className="basis-2/5	 bg-gray-50 rounded-md p-2 grow">
              <form className="w-full max-w-lg">
              <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"/>
                      {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Last Name
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe"/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        DNI
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"/>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        DOB
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="date" />
                    </div>
                  </div> 
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Password
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                      <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Confirm Password
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************"/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Address
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="text"/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                        Phone Number
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" type="telephone"/>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/3 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                        City
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque"/>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 ">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
                        State
                      </label>
                      <div className="relative">
                        <select className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                          <option>New Mexico</option>
                          <option>Missouri</option>
                          <option>Texas</option>
                          <option>New Mexico</option>
                          <option>Missouri</option>
                          <option>Texas</option>
                          <option>New Mexico</option>
                          <option>Missouri</option>
                          <option>Texas</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                        </div>
                      </div>
                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                        Zip
                      </label>
                      <input className="appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="90210"/>
                    </div>
                  </div>
                  <button className="bg-[#304590] hover:bg-[#435799] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Guardar</button>
                </form>
              </div>
              <div className="basis-3/5 grow">
                <div className="bg-gray-50 rounded-md p-2 mb-2 grow">
                <h1 className="mb-2 text-start text-2xl font-bold">Payment Method</h1>
                  <div className="flex flex-row justify-start p-4 space-x-4">
                      <div className="justify-between  border bg-white p-4 hover:bg-blue-300 cursor-pointer">
                          Visa / Mastercard
                      </div>
                      <div className="justify-between  border bg-white p-4 hover:bg-red-300 cursor-pointer">
                          Transferencia
                      </div>
                      <div className="justify-between  border bg-white p-4 hover:bg-purple-300 cursor-pointer">
                          Paypal
                      </div>
                      <div className="justify-between  border bg-white p-4 hover:bg-green-300 cursor-pointer">
                          Bizum
                      </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-md p-2 grow">
                <div className="h-auto">
                  <h1 className="mb-4 text-start text-2xl font-bold">Cart Items</h1>
                  <div className="justify-center p-4 space-y-3">
                    <div className="rounded-lg space-y-2">
                      <div className="justify-between  border bg-white p-6  sm:flex sm:justify-start">
                        <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="product-image" className="w-full sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
                            <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                          </div>
                          <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                              <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="text-sm">259.000 €</p>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="justify-between  border bg-white p-6  sm:flex sm:justify-start">
                        <img src="https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80" alt="product-image" className="w-full sm:w-40" />
                        <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                          <div className="mt-5 sm:mt-0">
                            <h2 className="text-lg font-bold text-gray-900">Nike Air Max 2019</h2>
                            <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                          </div>
                          <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                            <div className="flex items-center border-gray-100">
                              <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                              <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="2" min="1" />
                              <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                            </div>
                            <div className="flex items-center space-x-4">
                              <p className="text-sm">259.000 €</p>
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> 
                    <div className="mt-6 h-full   border bg-white p-6  md:mt-0 ">
                      <div className="mb-2 flex justify-between">
                        <p className="text-gray-700">Subtotal</p>
                        <p className="text-gray-700">$129.99</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-700">Shipping</p>
                        <p className="text-gray-700">$4.99</p>
                      </div>
                      <hr className="my-4" />
                      <div className="flex justify-between">
                        <p className="text-lg font-bold">Total</p>
                        <div className="">
                          <p className="mb-1 text-lg font-bold">$134.98 USD</p>
                          <p className="text-sm text-gray-700">including VAT</p>
                        </div>
                      </div>
                      <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
                    </div> 
                  </div>
                </div>
                </div> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
}