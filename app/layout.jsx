import "./globals.css";
import AuthContextProvider from "./(auth)/_components/auth.provider";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <AuthContextProvider>
      <html lang="en" className="dark" suppressHydrationWarning>
        <body>
          <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
          >
              {children}
          </ThemeProvider>
        </body>
      </html>
    </AuthContextProvider>
  );
}