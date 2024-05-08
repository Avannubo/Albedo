import Header from "@/components/header/header";
import Footer from "@/components/footer";

export default function layout({ children }) {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="w-full flex justify-center px-2 sm:px-6 md:px-12 lg:px-20 xl:px-40">
        <div className="w-[1150px] self-center pt-16 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}