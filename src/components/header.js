import Image from "next/image";
function header() {
    return (
        <header class="fixed top-0 left-0 w-full">
            <div className="flex flex-col items-center justify-start text-white bg-[#304590]">
                <div className="flex flex-row h-[80px] w-[1100px] p-4 self-center"> 
                        <Image src="/images/Logo_albedo_blanco.png"
                            alt="Vercel Logo"
                            className="h-[50px] self-center mr-4"
                            width={150}
                            height={100}
                            priority
                        />
                        <div className="flex grow justify-between self-center space-x-4">
                            <div className="flex justify-start space-x-6">
                                <div>Productos</div>
                                <div>Servicios</div>
                            </div>
                            <div className="w-auto">
                                <div>Sobre nosotros</div>
                            </div>
                        </div>
                    </div> 
            </div>
        </header>
    );
}
export default header;