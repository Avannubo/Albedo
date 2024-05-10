import Header from "@/components/header/header";
import Footer from "@/components/footer";

export default function layout({ children }) {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="w-full flex justify-center px-8 sm:px-10 md:px-16 lg:px-20 xl:px-40">
        <div className="w-[1200px] self-center pt-16 ">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}