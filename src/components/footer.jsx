import Image from "next/image";
import Link from "next/link";
function footer() {
  return (
    <footer className=" bottom-0 left-0 w-full text-stone-700 z-40">
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <div className="flex flex-col items-center justify-start text-black">
        <div className="flex flex-row  justify-between py-4 w-[1100px]">
          <Image
            src="/images/Logo_albedo.png"
            alt="Vercel Logo"
            className="w-1/3"
            width={300}
            height={24}
            priority
          />
          <div className="text-center w-auto">
            <h1 className="font-bold text-xl ">Política</h1>
            <p>Política de privacidad</p>
            <p>Política de cookies</p>
            <p>Términos y Condiciones</p>
            <p>Accesibilidad</p>
            <p>Aviso legal</p>
          </div>
          <div className="w-1/3">
            <h1 className="font-bold text-xl ">Contacta con nosotros</h1>
            <p>Si tienes preguntas, quieres obtener más información, no dudes en ponerte en contacto con nosotros.</p>
            <Link href="/contact" className="">Contacto</Link>
          </div>
        </div>
      </div>
      <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      <div className="w-full flex flex-col items-center justify-start text-black">
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
