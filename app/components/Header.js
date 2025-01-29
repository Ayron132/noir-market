"use client"

import Link from "next/link"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { Menu, Search, ShoppingBag, User } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="bg-primary text-secondary">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu size={24} />
          </button>
          <Link href="/" className="text-xl font-medium">
            Noir Market
          </Link>
        </div>
        <nav className="hidden lg:flex items-center gap-6">
          <Link href="/products" className="hover:text-accent transition-colors">
            Produtos
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <button className="hover:text-accent transition-colors">
            <Search size={24} />
          </button>
          {user ? (
            <Link href="/profile" className="hover:text-accent transition-colors">
              <User size={24} />
            </Link>
          ) : (
            <Link href="/login" className="hover:text-accent transition-colors">
              <User size={24} />
            </Link>
          )}
          <Link href="/cart" className="hover:text-accent transition-colors">
            <ShoppingBag size={24} />
          </Link>
        </div>
      </div>
      {isMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="max-w-[1440px] mx-auto px-4 py-4 flex flex-col gap-4">
            <Link href="/products" className="hover:text-accent transition-colors">
              Produtos
            </Link>
            {user ? (
              <>
                <Link href="/profile" className="hover:text-accent transition-colors">
                  Perfil
                </Link>
                <button onClick={signOut} className="text-gray-600 hover:text-gray-900 text-left">
                  Sair
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-accent transition-colors">
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

