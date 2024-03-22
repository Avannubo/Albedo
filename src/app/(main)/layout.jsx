import Header from "@/components/header";
import Footer from "@/components/footer";

export default function layout({ children }) {
  return (
    <section className="flex flex-col ">
      <div className="">
        <Header />
        <div>{children}</div>
        <Footer />
      </div>
    </section>
  );
}
