import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Oliver Rees",
  description: "I'm the founder of OR/innovation.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <PlausibleProvider domain="oliverrees.co.uk">
        <body className={inter.className + " dark:bg-black"}>
          <div className="lg:w-96 md:w-48 h-20 md:h-auto fixed flex md:items-start md:min-h-screen md:bg-white md:dark:bg-black w-full md:flex-col dark:text-white justify-between bg-gray-100 dark:bg-black">
            <Link
              href="/"
              className=" md:hover:text-blue-700 text-black dark:text-white md:h-48 lg:h-96 "
            >
              <div className="text-2xl ml-8 md:text-4xl lg:text-8xl md:-mt-4 lg:-mt-8 md:ml-10 flex items-center justify-center h-full lg:ml-12 md:-rotate-45">
                Oliver Rees
              </div>
            </Link>
            <div className="md:mt-32 h-full items-center gap-x-4 flex px-8 py-8">
              <Navigation />
            </div>
          </div>
          <div className="pt-32 md:ml-48 lg:ml-96 md:pt-0 flex flex-col">
            {children}
          </div>
        </body>
      </PlausibleProvider>
    </html>
  );
}
