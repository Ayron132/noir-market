import "./globals.css"
import { Inter } from "next/font/google"
import { AuthProvider } from "./hooks/useAuth"
import { CartProvider } from "./hooks/useCart"
import Header from "./components/Header"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Noir Market",
  description: "Onde o exclusivo encontra o essencial.",
}

export default function RootLayout({ children }) {
  return (
    (<html lang="en">
      <body className={`${inter.className} bg-secondary text-primary`}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>)
  );
}

