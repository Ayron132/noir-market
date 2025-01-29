"use client"
import Link from "next/link"
import FeaturedProducts from "../components/FeaturedProducts"
import CategoryIcons from "../components/CategoryIcons"
import { motion } from "framer-motion"
import Image from "next/image"
export default function Market() {
  return (
    (<div>
      {/* Hero Section */}
      <section className="bg-primary text-secondary py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Bem-vindo ao Noir Market</h1>
          <p className="text-xl mb-8">Onde o exclusivo encontra o essencial.</p>
          <Link
            href="/products"
            className="bg-secondary text-primary px-8 py-3 rounded-full text-lg font-semibold hover:bg-accent transition-colors"
          >
            Explorar Produtos
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Produtos em Destaque</h2>
          <p className="text-gray-600">Confira nossa seleção de produtos em destaque.</p>
        </div>
          <FeaturedProducts />
        </div>
      </section>
      {/* Categories Section */}
      <section className=" py-16 bg-secondary">
        <div className="container mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Categorias</h2>
          <p className="text-gray-600">Explore nossos produtos por categoria.</p>
        </div>
          <CategoryIcons />
        </div>
      </section>
    </div>)
  );
}

