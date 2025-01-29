"use client"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CTA() {
  return (
    <section id="cta" className="py-24 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-light mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Eleve sua experiência de compra com a <span className="font-semibold">Noir Market</span>
        </motion.h2>
        <motion.p
          className="text-lg mb-12 text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Junte-se a uma comunidade exclusiva de apreciadores do extraordinário e descubra um novo padrão de excelência.
        </motion.p>
        <Link  href="/market">
          <motion.button
            className="bg-white text-black font-medium py-4 px-12 rounded-none hover:bg-gray-100 transition duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Explorar Noir
          </motion.button>
        </Link>
      </div>
    </section>
  )
}

