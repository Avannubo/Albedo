import Header from "@/components/header";
import Footer from "@/components/footer";

export default function layout({ children }) {
  return (
    <div className="flex flex-col justify-center">
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
