import Image from "next/image";

export default function nav() {
    return <nav className="bg-slate-300 fixed top-0 left-0 h-[60px] w-full z-50 px-8">
        <div className="flex flex-row justify-between px-6">
            <Image src={'/images/Logo_albedo.png'}
                alt={'LOGO'}
                className="self-center m-2"
                width={150}
                height={250}
                priority
            />
            <div className="flex flex-row justify-between">
                
            </div>
        </div>
    </nav>
}