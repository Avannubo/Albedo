"use client";
import Image from "next/image";
import Link from "next/link";
import Dropdown from "@/components/main/header/headerDropdown";
import CartLength from "./cartLength";
import { useState, useRef, useEffect } from 'react';
import { getCategories } from "@/lib/data";

export default function Header() {
  const [showMobileDropdown, setShowMobileDropdown] = useState(false);
  const [showServiciosDropdown, setShowServiciosDropdown] = useState(false);
  const [showSobreDropdown, setShowSobreDropdown] = useState(false);
  const [showMobileServiciosDropdown, setShowMobileServiciosDropdown] = useState(false);
  const [showMobileProductDropdown, setShowMobileProductDropdown] = useState(false);
  const [showMobileSobreDropdown, setShowMobileSobreDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const dropdownRefServicios = useRef(null);
  const dropdownRefSobre = useRef(null);

  const toggleMobileDropdown = () => setShowMobileDropdown(!showMobileDropdown);
  const toggleServiciosDropdown = () => setShowServiciosDropdown(!showServiciosDropdown);
  const toggleSobreDropdown = () => setShowSobreDropdown(!showSobreDropdown);
  const toggleMobileServiciosDropdown = () => setShowMobileServiciosDropdown(!showMobileServiciosDropdown);
  const toggleMobileProductDropdown = () => setShowMobileProductDropdown(!showMobileProductDropdown);
  const toggleMobileSobreDropdown = () => setShowMobileSobreDropdown(!showMobileSobreDropdown);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getCategories();
        const Categories = data.filter(category => category.isPublished === true);

        setCategories(Categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRefServicios.current && !dropdownRefServicios.current.contains(event.target)) {
        setShowServiciosDropdown(false);
      }
      if (dropdownRefSobre.current && !dropdownRefSobre.current.contains(event.target)) {
        setShowSobreDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="flex flex-col items-center justify-center text-white bg-[#304590]">
        <div className="flex flex-row self-center items-center w-full py-4 h-auto xl:px-48 md:px-14 px-6">
          <Link href="/">
            <Image
              src="/assets/images/Logo_albedo_blanco.png"
              alt="Image"
              className="h-[50px] self-center mr-6"
              width={150}
              height={100}
              priority={true}
            />
          </Link>
          <div className="flex flex-row grow lg:justify-between justify-end self-center">
            <div className="justify-between lg:justify-center hidden lg:flex">
              <Dropdown />
              <div className="w-full ml-4 flex flex-row font-medium text-bold">
                <div className="relative self-center" ref={dropdownRefServicios}>
                  <button
                    className="flex justify-center flex-row flex-nowrap px-4 self-center text-[16px] cursor-pointer whitespace-nowrap"
                    onClick={toggleServiciosDropdown}
                    aria-expanded={showServiciosDropdown}
                    aria-controls="dropdown"
                  >
                    Servicios
                    <svg
                      className="w-2.5 h-2.5 ml-2.5 self-center"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      ></path>
                    </svg>
                  </button>
                  {showServiciosDropdown && (
                    <div className="absolute left-0 mt-2 bg-white text-gray-700 rounded-lg shadow" id="dropdown">
                      <ul className="m-1">
                        <li>
                          <Link href="/services" className="hover:bg-gray-100 text-gray-700 block rounded-lg whitespace-nowrap px-2 py-1.5 self-center  text-[16px]">Le ofrecemos</Link>
                        </li>
                        <li>
                          <Link href="/services/design/" className="hover:bg-gray-100 text-gray-700 block rounded-lg whitespace-nowrap px-2 py-1.5 self-center text-[16px]">Diseño</Link>
                        </li>
                        <li>
                          <Link href="/services/manufacturing/" className="hover:bg-gray-100 text-gray-700 block rounded-lg whitespace-nowrap px-2 py-1.5 self-center text-[16px]">Fabricación</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div className="relative self-center" ref={dropdownRefSobre}>
                  <button
                    className="flex justify-center flex-row flex-nowrap px-4 self-center text-[16px] cursor-pointer whitespace-nowrap"
                    onClick={toggleSobreDropdown}
                    aria-expanded={showSobreDropdown}
                    aria-controls="dropdown2"
                  >
                    Sobre Nosotros
                    <svg
                      className="w-2.5 h-2.5 ml-2.5 self-center"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                      ></path>
                    </svg>
                  </button>
                  {showSobreDropdown && (
                    <div className="absolute left-5 mt-2 bg-white text-gray-700 shadow rounded-lg" id="dropdown2">
                      <ul className="m-1">
                        <li>
                          <Link href="/about/historia" className="hover:bg-gray-100 text-gray-700 block rounded-lg whitespace-nowrap px-2 py-1.5 self-center text-[16px]">Quienes somos</Link>
                        </li>
                        <li>
                          <Link href="/about/contacto" className="hover:bg-gray-100 text-gray-700 block rounded-lg whitespace-nowrap px-2 py-1.5 self-center text-[16px]">Contacto</Link>
                        </li>
                        <li>
                          <Link href="/about/faq" className="hover:bg-gray-100 text-gray-700 block rounded-lg whitespace-nowrap px-2 py-1.5 self-center text-[16px]">FAQ</Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <Link href="https://www.albedo.biz/Blog/" className="px-4 self-center text-[16px] cursor-pointer">Blog</Link>
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
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M2 3L2.26491 3.0883C3.58495 3.52832 4.24497 3.74832 4.62248 4.2721C5 4.79587 5 5.49159 5 6.88304V9.5C5 12.3284 5 13.7426 5.87868 14.6213C6.75736 15.5 8.17157 15.5 11 15.5H19"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M7.5 18C8.32843 18 9 18.6716 9 19.5C9 20.3284 8.32843 21 7.5 21C6.67157 21 6 20.3284 6 19.5C6 18.6716 6.67157 18 7.5 18Z"
                    stroke="#ffffff"
                    strokeWidth="1"
                  ></path>{" "}
                  <path
                    d="M16.5 18.0001C17.3284 18.0001 18 18.6716 18 19.5001C18 20.3285 17.3284 21.0001 16.5 21.0001C15.6716 21.0001 15 20.3285 15 19.5001C15 18.6716 15.6716 18.0001 16.5 18.0001Z"
                    stroke="#ffffff"
                    strokeWidth="1"
                  ></path>{" "}
                  <path
                    d="M11 9H8"
                    stroke="#ffffff"
                    strokeWidth="1"
                    strokeLinecap="round"
                  ></path>{" "}
                  <path
                    d="M5 6H16.4504C18.5054 6 19.5328 6 19.9775 6.67426C20.4221 7.34853 20.0173 8.29294 19.2078 10.1818L18.7792 11.1818C18.4013 12.0636 18.2123 12.5045 17.8366 12.7523C17.4609 13 16.9812 13 16.0218 13H5"
                    stroke="#ffffff"
                    strokeWidth="1"
                  ></path>{" "}
                </g>
              </svg>
              <CartLength />
            </Link>
            <div className="lg:hidden ml-4">
              <button
                onClick={toggleMobileDropdown}
                className="text-[16px] cursor-pointer flex items-center"
                aria-expanded={showMobileDropdown}
                aria-controls="mobileDropdown"
              >
                <svg className="self-center" width="36px" height="36px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              </button>
              {showMobileDropdown && (
                <div className="absolute left-0 top-20 h-auto overflow-y-auto bg-white w-full text-base z-50 divide-y divide-gray-100 shadow" id="mobileDropdown">
                  <MobileMenuItem title="Productos" onClick={toggleMobileProductDropdown} isOpen={showMobileProductDropdown}>
                    <MobileSubmenu isOpen={showMobileProductDropdown}>
                      {categories.map((category, index) => (
                        <Link key={index} href={`/products/${category.url_Id}`} className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">{category.name.split(" ").length > 2
                          ? category.name.split(" ")[0]
                          : category.name}</Link>))}
                    </MobileSubmenu>
                  </MobileMenuItem>
                  <MobileMenuItem title="Servicios" onClick={toggleMobileServiciosDropdown} isOpen={showMobileServiciosDropdown}>
                    <MobileSubmenu isOpen={showMobileServiciosDropdown}>
                      <Link href="/services" className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">Le ofrecemos</Link>
                      <Link href="/services/design/" className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">Diseño</Link>
                      <Link href="/services/manufacturing/" className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">Fabricación</Link>
                    </MobileSubmenu>
                  </MobileMenuItem>
                  <MobileMenuItem title="Sobre Nosotros" onClick={toggleMobileSobreDropdown} isOpen={showMobileSobreDropdown}>
                    <MobileSubmenu isOpen={showMobileSobreDropdown}>
                      <Link href="/about/historia" className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">Quienes somos</Link>
                      <Link href="/about/contacto" className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">Contacto</Link>
                      <Link href="/about/faq" className="hover:bg-gray-100 bg-gray-50 text-gray-700 flex justify-center whitespace-nowrap px-2 py-1.5 text-[16px]">FAQ</Link>
                    </MobileSubmenu>
                  </MobileMenuItem>
                  <Link href="https://www.albedo.biz/Blog/" className="hover:bg-gray-100 text-gray-700 flex justify-center px-4 py-2">Blog</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Component for mobile menu items
function MobileMenuItem({ title, onClick, isOpen, children }) {
  return (
    <div className="relative">
      <button
        className="hover:bg-gray-100 text-gray-700 block whitespace-nowrap w-full px-2 py-2 text-[16px]"
        onClick={onClick}
        aria-expanded={isOpen}
        aria-controls="mobileDropdown"
      >
        {title}
      </button>
      {isOpen && children}
    </div>
  );
}
// Component for mobile submenus
function MobileSubmenu({ isOpen, children }) {
  return (
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-screen' : ''}`}>
      {children}
    </div>
  );
}
