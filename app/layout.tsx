import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../styles/global.sass";

export const metadata: Metadata = {
  title: "Too Doo",
  description: "Simply organise your notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <body>
          <Navbar />
          {children}
          <Footer />
        </body>
      </html>
    </>
  );
}
