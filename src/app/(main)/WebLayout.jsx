import Header from "@/components/header/header";
import Footer from "@/components/footer";

export default function layout({ children }) {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div className="w-full flex justify-center">
        <div className="w-full pt-16 px-6 sm:px-6 md:px-14 lg:px-26 xl:px-48">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}