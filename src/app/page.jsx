import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/header";
import Footer from "@/components/footer";
import { getCategories } from "@/lib/data";
import ProductItem from "@/components/products/productItem";

export default async function Home() {
  const data = await getCategories();

  function GetProducts(categories) {
    let products = [];
    categories.forEach((category) => {
      if (category.products.length > 0) {
        products = products.concat(category.products);
      }
      if (category.subCategories) {
        products = products.concat(GetProducts(category.subCategories));
      }
    });
    return products;
  }

  const products = GetProducts(data);
  const last6 = products.slice(0, 4);

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
            <h1 className="text-xl font-bold my-2">Nuevos productos</h1>
          </div>
          <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
          <div className="flex flex-row items-center justify-center space-x-4 mt-4 mb-8">
            {last6.map((product) => (
              <ProductItem key={product.ALBEDOcodigo} product={product} />
            ))}
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
