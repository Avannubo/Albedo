import Image from "next/image";
import Link from "next/link";
function header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="flex flex-col items-center justify-start text-white bg-[#304590]">
        <div className="flex flex-row h-[80px] w-[1266px] py-px-4 mr-[166px] self-center">
          <Image
            src="/images/Logo_albedo_blanco.png"
            alt="Vercel Logo"
            className="h-[50px] self-center mr-4"
            width={150}
            height={100}
            priority
          />
          <div className="flex grow justify-between self-center space-x-4">
            <div className="flex justify-start space-x-6 text-base font-medium uppercase">
              <h1>Productos</h1>
              <h1>Servicios</h1>
              <h1>Sobre nosotros</h1>
            </div>
            <div className="w-auto text-right text-base font-medium uppercase">
              <div>contacto</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default header;
