"use client";

import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/components/header/headerDropdown";
import CartLength from "./cartLength";

export default function header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex flex-col items-center justify-center text-white bg-[#304590]">
        <div className="flex flex-row h-[80px] w-[1275px] py-4 self-center mr-[175px]">
          <Link href="/">
            <Image
              src="/images/Logo_albedo_blanco.png"
              alt="Vercel Logo"
              className="h-[50px] self-center mr-6"
              width={150}
              height={100}
              priority
            />
          </Link>
          <div className="flex grow justify-between self-center">
            <div className="flex justify-center mt-2">
              <Dropdown />
              <div className="w-full ml-4 py-6 pb-8 flex flex-row font-medium text-bold">
                <div className="flex justify-center flex-row flex-nowrap px-4 py-2 text-lg cursor-pointer whitespace-nowrap">
                  <button className="" data-dropdown-toggle="dropdown">
                    Servicios</button>
                  <svg className="w-2.5 h-2.5 ml-2.5 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"></path></svg>
                </div>

                <div className="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown">
                  <ul className="py-1" aria-labelledby="dropdown">
                    <li>
                      <Link href="/services" className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-lg">Le oferecemos</Link>
                    </li>
                    <li>
                      <Link href="/services/design/" className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-lg">Diseño</Link>
                    </li>
                    <li>
                      <Link href="/services/manufacturing/" className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-lg">Fabricación</Link>
                    </li>
                  </ul>
                </div>
                <Link href="https://www.albedo.biz/blog/" className="px-4 py-2 text-lg cursor-pointer">Blog</Link>
                {/* <Link href="/contacto" className="px-4 py-2 text-lg cursor-pointer">Contacto</Link> */}

                <div className="flex justify-center flex-row flex-nowrap px-4 py-2 text-lg cursor-pointer whitespace-nowrap">
                  <button className="" data-dropdown-toggle="dropdown2">
                    Sobre Nosotros</button>
                  <svg className="w-2.5 h-2.5 ml-2.5 self-center" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"></path></svg>
                </div>
                <div className="hidden bg-white text-base z-50 list-none divide-y divide-gray-100 rounded shadow my-4" id="dropdown2">
                  <ul className="py-1" aria-labelledby="dropdown2">
                    <li>
                      <Link href="/about/historia" className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-lg">Quienes somos</Link>
                    </li>
                    <li>
                      <Link href="/about/contacto" className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-lg">Contacto</Link>
                    </li>
                    <li>
                      <Link href="/about/faq" className="hover:bg-gray-100 text-gray-700 block px-4 py-2 text-lg">FAQ</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="flex flex-row w-auto justify-center self-center"
            >
              <svg
                width="44px"
                height="44px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokwidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
                    stroke="#ffffff"
                    strokwidth="1"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                    stroke="#ffffff"
                    strokwidth="1"
                  ></path>{" "}
                  <path
                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                    stroke="#ffffff"
                    strokwidth="1"
                  ></path>{" "}
                  <path
                    d="M11 9H8"
                    stroke="#ffffff"
                    strokwidth="1"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
                    stroke="#ffffff"
                    strokwidth="1"
                  ></path>{" "}
                </g>
              </svg>
              <CartLength />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
