import Image from "next/image";

function header() {
    return (
        <header>
            <div className="flex flex-col items-center justify-start text-white">
                <div className="flex flex-row h-[80px] w-[1300px] bg-[#304590]  justify-start p-8 self-center">
                <Image
                    src="/vercel.svg"
                    alt="Vercel Logo"
                    className="dark:invert"
                    width={100}
                    height={24}
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