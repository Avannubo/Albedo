import Header from "@/components/header/header";
import Footer from "@/components/footer";

export default function layout({ children }) {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className=" w-full flex justify-center">
        <div className="w-[1100px] pt-24">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
