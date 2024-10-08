import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import 'prismjs/themes/prism-tomorrow.css'; 
import { Toaster, toast } from 'sonner'



const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "CurriculumGen",
  description: "Generate courses using AI",
};

export default function RootLayout({ children }) {
  return (
   
   
    <ClerkProvider>
    <html lang="en">
      <body className="font-sans antialiased">
        <GoogleOneTap />
        <Toaster richColors position="top-center" />

        {children}
      </body>
    </html>
    </ClerkProvider>
    
  );
}
