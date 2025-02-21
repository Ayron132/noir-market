"use client"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section id="hero" className="bg-black text-white py-32">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
            Onde o exclusivo encontra o <span className="font-semibold">essencial</span>
          </h1>
          <p className="text-lg mb-8 text-gray-300 leading-relaxed">
            Descubra uma curadoria única de produtos premium e experiências extraordinárias, cuidadosamente selecionados
            para quem busca o excepcional.
          </p>
          <Link  href="/market">
            <motion.button
              className="bg-white text-black font-medium py-4 px-8 rounded-none hover:bg-gray-100 transition duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Explorar Noir
            </motion.button>
          </Link>
        </motion.div>
        <motion.div
          className="md:w-1/2 md:pl-12"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/01120a30-138d-4177-9eea-bd0b3dc19795-Photoroom-pyhA1e1HBfiZkDUJR67gchxzzg6E4t.png"
              alt="Noir Market Luxury Collection"
              width={800}
              height={600}
              className="object-contain"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-overlay" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

