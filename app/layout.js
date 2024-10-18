import "./globals.css";
import { archivo } from "./fonts/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import Script from "next/script";


export const metadata = {
  title: "Podverse",
  description: "Live Streaming Platform",
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={`${archivo.className} antialiased`}>
        <Script src="/simplepeer.min.js" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster richColors />
        </ThemeProvider>
        {/* Use Next.js Script component to load simplepeer.min.js */}
      </body>
    </html>
  );
}
