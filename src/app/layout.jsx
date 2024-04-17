import "./globals.css";
import SideNav from "@/components/admin/nav/aside";


export const metadata = {
  title: "Albedo Biz",
  description: "Albedo Webapp",
};

export default function RootLayout({ children }) {
  return ( 
    <html lang="es">
      <body className="flex flex-row justify-start w-full text-stone-700">
        <SideNav />

        <div className="mx-40 mt-24 w-[100%]">{children}</div>
      </body>
    </html>
  );
}
