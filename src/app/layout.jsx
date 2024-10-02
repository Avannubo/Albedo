import "./globals.css";
import Head from 'next/head';

export const metadata = {
  title: "Albedo Biz",
  description: "Albedo",
};
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <link rel="shortcut icon" href="./download.png" />
      </Head>
      <body className="flex flex-col justify-start w-full text-stone-700 overflow-x-hidden">
        {children} 
      </body>
    </html>
  );
}
