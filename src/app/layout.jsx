import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Albedo Biz",
  description: "Albedo Webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col items-center w-full text-stone-700">
        {/* <Header /> */}
        <div className="w-[1100px] mt-24">
          {children}
        </div>  
        {/* <Footer /> */}
      </body>
    </html>
  );
}
