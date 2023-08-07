import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "../styles/global.sass";
import { ProjectContextProvider } from "./context/ProjectContext";
import { AuthContextProvider } from "./context/AuthContext";

export const metadata = {
  title: "Too Doo",
  description: "Simply organise your notes",
};

export default function RootLayout({ children }) {
  return (
    <>
      <ProjectContextProvider>
        <AuthContextProvider>
          <html lang="en">
            <body>
              <Navbar />
              {children}
              <Footer />
            </body>
          </html>
        </AuthContextProvider>
      </ProjectContextProvider>
    </>
  );
}
