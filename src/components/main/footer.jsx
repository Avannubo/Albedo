import Image from "next/image";
import Link from "next/link";
function footer() {
  return (
    <footer className=" bottom-0 left-0 text-stone-700 z-40">
      <hr className="h-1 w-[1500px]  mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <div className="flex flex-col items-center justify-start text-black">
        <div className="flex lg:flex-row flex-col  justify-start lg:items-start items-center space-x-4 space-y-4  py-4 lg:w-[1500px]">
          <div className="flex flex-col justify-center space-y-4">

            <Link href="/" className="w-[350px] flex justify-start">
              <Image
                src="/assets/images/Logo_albedo.png"
                alt="Image"
                className=" object-contain"
                width={550}
                height={24}
                priority="true"
              />
            </Link>
            <div className="flex flex-row justify-evenly space-x-4">
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-normal" href='https://www.grupo-albedo.com'>Grupo Albedo</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-normal" href='https://www.albedotelecom.com'>Telecom</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-normal" href='https://www.electronics.albedo.biz'>Electronics</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-normal" href='https://www.promociones.albedo.biz'>Promociones</Link>
              <Link className="whitespace-nowrap text-[#304590] hover:text-[#475CAA] text-lg font-normal" href='https://www.instruments.albedo.biz'>Instruments</Link> 
            </div>
          </div>
          <div className=" text-center w-auto flex flex-col justify-center">
            <p className="self-center text-[20px]">
              Copyright © 2004 - 2023 Albedo Design S.L.
              <br /> Todos los derechos reservados. <br /> Si desea comprar, lea
              nuestras  <Link href="/condiciones" className="cursor-pointer text-[#304590]">
                Términos y Condiciones
              </Link>.
            </p>
          </div>

          <div className="w-1/3 space-y-4 flex flex-col items-start lg:items-start">
            <h1 className="font-bold text-xl text-center ">Contacta con nosotros</h1>
            <p className="mb-2 text-center lg:text-start">
              Si tienes alguna cuestión o quieres obtener más información, no dudes en ponerte en contacto con nosotros.            </p>
            <Link href="/about/contacto" className="flex justify-center cursor-pointer self-center lg:self-start text-white w-[130px] p-1.5 rounded-md bg-[#304590] hover:bg-[#475caa]">
              Contacto
            </Link>
          </div>
        </div>
      </div>
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />

    </footer>
  );
}
export default footer;
