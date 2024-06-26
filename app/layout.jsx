import "./globals.css";
import AuthContextProvider from "./(auth)/_components/auth.provider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./(root)/_components/navbar";
import { Toaster } from "react-hot-toast";
import UsersContextProvider from "./(auth)/_components/users-provider";
import EventsContextProvider from "./(root)/_components/events-provider";



export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <EventsContextProvider>
        <UsersContextProvider>
        <html lang="en" className="dark">
          <body>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                <Navbar />
                <main>
                    <Toaster />
                    {children}
                </main>
            </ThemeProvider>
          </body>
        </html>
        </UsersContextProvider>
      </EventsContextProvider>
    </AuthContextProvider>
  );
}
