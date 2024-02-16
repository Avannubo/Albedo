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
    <html lang="en"> 
      <body className={inter.className}> 
        <Header/>
        {children}
        <Footer />
      </body>
    </html>
  );
}
