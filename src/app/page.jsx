import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
export default function Home() {
  return (
    <main>
      <Header />
      <div className="">
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-700" />
        <p className="text-xl my-4">
          <strong>ALBEDO Design</strong> es un grupo de empresas donde
          encontrará productos domóticos propios y de terceros, así como
          servicios integrales al servicio de la industria electrónica.
        </p>
        <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
      </div>
      <div className="bg-[#304590] rounded-xl p-3 flex justify-center">
        <h1 className="text-xl font-bold text-white ">
          TIENDA DE PRODUCTOS DOMÓTICOS
        </h1>
      </div>
      <div className="">
        <p className="text-xl ">
          Si desea <strong>comprar cualquiera de nuestros productos</strong>,
          entre en <a href="#">nuestra tienda</a>:
        </p>
        <div className="flex justify-center my-4">
          <Image
            src="/images/home/facebook_portada.png"
            alt="Vercel Logo"
            className="self-center"
            width={400}
            height={24}
            priority
          />
        </div>
        <div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="flex justify-center">
            <h1 className="text-lg font-bold my-2">Nuevos productos</h1>
          </div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="flex flex-row space-x-6 my-4">
            {/* product 1 */}
            <Link href="/" className="flex flex-col w-[130px] ">
              <h2 className="text-[#304590] font-bold self-center">
                IndoorNavBasic
              </h2>
              <p className="text-[12px] self-center">
                <strong>Precio:</strong> 7.200,00€ +IVA{" "}
              </p>
              <Image
                src="/images/home/imagen.small.png"
                alt="Vercel Logo"
                className="self-center"
                width={100}
                height={24}
                priority
              />
              <p className="text-[12px] text-justify">
                Pack para crear y mantener su sisterma de guía accesible en su
                museo o exposición. Con 20 balizas.
              </p>
            </Link>
            {/* product 2 */}
            <Link href="/product/ADPDR2P63L" className="flex flex-col w-[130px] ">
              <h2 className="text-[#304590] font-bold self-center">
                ADPDR2P63L
              </h2>
              <p className="text-[12px] self-center">
                <strong>Precio:</strong> 259,00€ +IVA{" "}
              </p>
              <Image
                src="/images/home/imagen.small7.png"
                alt="Vercel Logo"
                className="self-center"
                width={100}
                height={24}
                priority
              />
              <p className="text-[12px] text-justify">
                Protector diferencial rearmable monofásico (2P), 63A, 30mA
              </p>
            </Link>
            {/* product 3 */}
            <Link href="/" className="flex flex-col w-[130px] ">
              <h2 className="text-[#304590] font-bold self-center">
                ADPI16W24V
              </h2>
              <p className="text-[12px] self-center">
                <strong>Precio:</strong>39,00€ +IVA
              </p>
              <Image
                src="/images/home/imagen.small2.png"
                alt="Vercel Logo"
                className="self-center"
                width={100}
                height={24}
                priority
              />
              <p className="text-[12px] text-justify">
                Convertidor AC/DC, con aislamiento, entrada universal AC y DC y
                salida 24V, 16W
              </p>
            </Link>
            {/* product 4 */}
            <Link href="/" className="flex flex-col w-[130px] ">
              <h2 className="text-[#304590] font-bold self-center">
                ADPI30W5V
              </h2>
              <p className="text-[12px] self-center">
                <strong>Precio:</strong> 66,60€ +IVA{" "}
              </p>
              <Image
                src="/images/home/imagen.small3.png"
                alt="Vercel Logo"
                className="self-center"
                width={100}
                height={24}
                priority
              />
              <p className="text-[12px] text-justify">
                Convertidor AC/DC, con aislamiento, entrada universal AC y DC y
                salida 5V, 30W
              </p>
            </Link>
            {/* product 5 */}
            <div className="flex flex-col w-[130px] ">
              <h2 className="text-[#304590] font-bold self-center">
                ADFSSM100
              </h2>
              <p className="text-[12px] self-center">
                <strong>Precio:</strong> 67,00€ +IVA{" "}
              </p>
              <Image
                src="/images/home/imagen.small4.png"
                alt="Vercel Logo"
                className="self-center"
                width={100}
                height={24}
                priority
              />
              <p className="text-[12px] text-justify">
                Farola solar LED con sensor de movimiento. Consume 100W y
                produce un flujo luminoso de 2500 Lumens.
              </p>
            </div>
            {/* product 6 */}
            <div className="flex flex-col w-[130px] ">
              <h2 className="text-[#304590] font-bold self-center ">
                GLD-235-12
              </h2>
              <p className="text-[12px] self-center">
                <strong>Precio:</strong> 111,00€ +IVA{" "}
              </p>
              <Image
                src="/images/home/imagen.small6.png"
                alt="Vercel Logo"
                className="self-center"
                width={100}
                height={24}
                priority
              />
              <p className="text-[12px] text-justify">
                Detector PIR de cuádruple elemento con ángulo de abertura de 90º
                y 12 metros de coberturar.
              </p>
            </div>
          </div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="bg-[#304590] rounded-xl p-3 flex justify-center">
            <h1 className="text-xl font-bold text-white ">
              SERVICIOS DE DISEÑO Y FABRICACIÓN
            </h1>
          </div>
          <div className="my-4">
            <p className="text-xl">
              <strong>Somos un equipo multidisciplinar</strong>, y nos ponemos a
              su disposición para acompañarle en sus proyectos electrónicos.{" "}
              <br />
              <br />
              Estaremos a su lado en todos los procesos para llevar su idea a
              una realidad... Desde el <a href="">diseño</a> , y el{" "}
              <a href="">prototipado</a> a la <a href="">fabricación</a> .{" "}
            </p>
            <div className="flex flex-row justify-center space-x-4 my-4">
              <Image
                src="/images/home/diseño1.png"
                alt="Vercel Logo"
                className=""
                width={300}
                height={24}
                priority
              />
              <Image
                src="/images/home/diseño2.png"
                alt="Vercel Logo"
                className=""
                width={200}
                height={24}
                priority
              />
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <Footer />
    </main>
  );
}
