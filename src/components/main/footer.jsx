import Image from "next/image";
import Link from "next/link";

function Footer() {
  return (
    <footer className="bottom-0 left-0 text-stone-700 z-40 w-full">
      <hr className="h-1 w-full mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
      <div className="flex flex-col items-center justify-start text-black space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-4 py-6 w-full max-w-[1500px] px-6">
          {/* Logo and Links */}
          <div className="flex flex-col justify-center w-[40%] space-y-4 items-center lg:items-start">
            <Link href="/" className="w-[350px] flex justify-start">
              <Image
                src="/assets/images/Logo_albedo.png"
                alt="Image"
                className="object-contain"
                width={550}
                height={24}
                priority
              />
            </Link>
            <div className="flex flex-wrap justify-center lg:justify-start space-x-2">
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-semibold" href='https://www.grupo-albedo.com'>Grupo Albedo</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-semibold" href='https://www.albedotelecom.com'>Telecom</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-semibold" href='https://www.electronics.albedo.biz'>Electronics</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-semibold" href='https://www.promociones.albedo.biz'>Promociones</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-semibold" href='https://www.instruments.albedo.biz'>Instruments</Link>
            </div>
          </div>
          {/* Copyright */}
          <div className="text-center lg:text-start w-full lg:w-[30%]">
            <p className="text-[16px] lg:text-[20px]">
              Copyright © 2004 - 2023 Albedo Design S.L. Todos los derechos reservados. Si desea comprar, lea nuestros
              <Link href="/condiciones" className="cursor-pointer font-semibold text-[#304590]">
                Términos y Condiciones
              </Link>.
            </p>
          </div>
          {/* Contact Section */} 
          <div className="flex flex-col items-center lg:items-start space-y-4 lg:w-[30%]">
            <h1 className="font-bold text-xl text-center lg:text-start">Contacta con nosotros</h1>
            <p className="mb-2 text-center lg:text-start">
              Si tienes alguna cuestión o quieres obtener más información, no dudes en ponerte en contacto con nosotros.
            </p>
            <Link href="/about/contacto" className="flex justify-center text-white w-[130px] p-1.5 rounded-md bg-[#304590] hover:bg-[#475caa]">
              Contacto
            </Link>
          </div>
        </div>
      </div>
      <hr className="h-1 w-full mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
    </footer>
  );
}

export default Footer;
