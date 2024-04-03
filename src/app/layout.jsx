import "./globals.css";


export const metadata = {
  title: "Albedo Biz",
  description: "Albedo Webapp",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="flex flex-col items-center w-full text-stone-700">
        <div className="w-[1100px] mt-24">{children}</div>
      </body>
    </html>
  );
}
