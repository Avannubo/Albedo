import Image from "next/image";
import Link from "next/link";
function footer() {
  return (
    <footer className=" bottom-0 left-0 w-full text-stone-700 z-40">
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <div className="flex flex-col items-center justify-start text-black">
        <div className="flex lg:flex-row flex-col  justify-between lg:items-start items-center space-y-4  py-4 w-[1100px]">

          <Link href="/" className="w-1/3 self-center flex justify-center">
          <Image
            src="/images/Logo_albedo.png"
            alt="Vercel Logo"
            className=" object-contain"
            width={300}
            height={24}
            priority="true"
          />
          </Link>
          
          <div className=" text-center w-auto flex flex-col justify-between">
            <h1 className="font-bold text-xl ">Textos Legales</h1>
            <p className="cursor-pointer hover:text-[#304590]">
              Política de privacidad
            </p>
            <p className="cursor-pointer hover:text-[#304590]">
              Política de cookies
            </p>
            <p className="cursor-pointer hover:text-[#304590]">
              Términos y Condiciones
            </p>
            <p className="cursor-pointer hover:text-[#304590]">Accesibilidad</p>
            <p className="cursor-pointer hover:text-[#304590]">Aviso legal</p>
          </div>

          <div className="w-1/3 space-y-4 flex flex-col items-center lg:items-start">
            <h1 className="font-bold text-xl  ">Contacta con nosotros</h1>
            <p className="mb-2 text-center lg:text-start">
              Si tienes preguntas, quieres obtener más información, no dudes en
              ponerte en contacto con nosotros.
            </p>
            <div className="flex justify-center cursor-pointer self-center lg:self-start text-white w-[130px] p-1.5 rounded-md bg-[#304590] hover:bg-[#475caa]">
              <p>Contacto</p>
            </div>
          </div>
        </div>
      </div>
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <div className="w-full flex flex-col items-center lg:justify-start justify-center text-black">
        <div className="flex flex-col  justify-center w-full py-4">
          <p className="self-center text-center">
            Copyright © 2004 - 2023 Albedo Design S.L.
            <br /> Todos los derechos reservados. <br /> Si desea comprar, lea
            nuestras condiciones.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default footer;
