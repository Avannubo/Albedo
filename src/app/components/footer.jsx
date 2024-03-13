import Image from "next/image";
function footer() {
    return (
        <footer className=" bottom-0 left-0 w-full text-stone-700">
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
            <div className="flex flex-col items-center justify-start text-black">
                <div className="flex flex-row  justify-between py-4 w-[1100px]">
                    <Image
                        src="/images/Logo_albedo.png"
                        alt="Vercel Logo"
                        className=""
                        width={300}
                        height={24}
                        priority
                    />
                    <div className="text-center">
                        <h1 className="font-bold text-xl ">Textos legales</h1>
                        <p>text1</p>
                        <p>text2</p>
                        <p>text3</p>
                        <p>text4</p>
                    </div>
                    <div>
                        <h1 className="font-bold text-xl ">Contacto</h1>
                        <p>lorem ipsum</p>
                    </div>
                </div>
            </div>
            <hr className="h-1 mx-auto bg-gray-100 border-0 rounded  dark:bg-gray-700" />
            <div className="flex flex-col items-center justify-start text-black">
                <div className="flex flex-col  justify-center py-4 w-[1100px]">
                    <p className="self-center text-center">Copyright © 2004 - 2023 Albedo Design S.L.<br/>  Todos los derechos reservados. <br/> Si desea comprar, lea nuestras condiciones.</p>
                </div>
            </div>
        </footer>
    );
}
export default footer;

