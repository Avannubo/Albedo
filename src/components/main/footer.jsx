import Image from "next/image";
import Link from "next/link";
function footer() {
  return (
    <footer className=" bottom-0 left-0 w-full text-stone-700 z-40">
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <div className="flex flex-col items-center justify-start text-black">
        <div className="flex lg:flex-row flex-col  justify-start lg:items-start items-start space-x-4 space-y-4  py-4 w-[1100px]">

          <Link href="/" className="w-1/3 flex justify-start">
            <Image
              src="/assets/images/Logo_albedo.png"
              alt="Image"
              className=" object-contain"
              width={400}
              height={24}
              priority="true"
            />
          </Link>

          <div className=" text-start w-auto flex flex-col justify-center">
            <p className="self-start text-[20px]">
              Copyright © 2004 - 2023 Albedo Design S.L.
              <br /> Todos los derechos reservados. <br /> Si desea comprar, lea
              nuestras  <Link href="/condiciones" className="cursor-pointer text-[#304590]">
                Términos y Condiciones
              </Link>.
            </p>
            {/* <h1 className="font-bold text-xl ">Textos Legales</h1> */}
            {/* <p className="cursor-pointer hover:text-[#304590]">
              Política de privacidad
            </p>
            <p className="cursor-pointer hover:text-[#304590]">
              Política de cookies
            </p>
            <p className="cursor-pointer hover:text-[#304590]">Aviso legal</p> */}
          </div>

          <div className="w-1/3 space-y-4 flex flex-col items-start lg:items-start">
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
      {/* <div className="w-full flex flex-col items-center lg:justify-start justify-center text-black">
        <div className="flex flex-col  justify-center w-full py-4">
          
        </div>
      </div> */}
    </footer>
  );
}
export default footer;
