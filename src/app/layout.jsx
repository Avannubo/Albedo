import "./globals.css";


export const metadata = {
  title: "Albedo Biz",
  description: "Albedo Webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col justify-start w-full text-stone-700">
         {children}
      </body>
    </html>
  );
}
