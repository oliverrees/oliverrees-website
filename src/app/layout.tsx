import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="lg:w-96 md:w-48 h-28 md:h-auto fixed flex md:items-start md:min-h-screen px-8 py-8 bg-white w-full md:flex-col border-b md:border-b-0 md:border-r justify-between">
          <div className="text-4xl flex items-center md:text-4xl lg:text-8xl md:mt-8 md:ml-4 lg:mt-16 lg:ml-6 md:-rotate-45">
            <Link href="/">Oliver Rees</Link>
          </div>
          <div className="md:mt-32 h-full items-center gap-x-4 flex">
            <div>About</div>
            <div>Contact</div>
          </div>
        </div>
        <div className="pt-36 md:ml-48 lg:ml-96 md:pt-0 flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
