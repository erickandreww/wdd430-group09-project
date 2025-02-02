import type { Metadata } from "next";
import { lato, roboto } from "./ui/fonts";
import Heading from "./ui/heading";
import Footer from "./ui/footer";
import Nav from "./ui/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: '%s | Handcrafted Haven',
    default: 'Home Page - Handcrafted Haven',
  },
  description: 'description',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} ${roboto.className} antialiased`}
      >
        <Heading />
        <div className="flex flex-col min-h-screen md:flex-row md:overflow-hidden">
          <div className="w-full bg-color_two md:w-56">
            <Nav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
        </div>
        <div className="">
          <Footer />
        </div>
      </body>
    </html>
  );
}
