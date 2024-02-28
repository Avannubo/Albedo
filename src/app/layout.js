import { Inter } from "next/font/google";
import "./globals.css";
import Header from '@/components/header';
import Footer from '@/components/footer';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Albedo Biz",
  description: "Albedo Webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col items-center w-full">
        <div className="w-[1300px]"> 
          <Header />
            {children}
          <Footer />
        </div> 
      </body>
    </html>
  );
}
