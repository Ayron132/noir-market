"use client"
import { motion } from "framer-motion"
import { Diamond, Award, Shield } from "lucide-react"

const features = [
  {
    icon: <Diamond className="w-12 h-12 text-black" />,
    title: "Curadoria Premium",
    description: "Produtos exclusivos e marcas de prestígio selecionados com excelência.",
  },
  {
    icon: <Award className="w-12 h-12 text-black" />,
    title: "Garantia de Autenticidade",
    description: "Certificação e procedência garantida em todos os produtos.",
  },
  {
    icon: <Shield className="w-12 h-12 text-black" />,
    title: "Serviço Personalizado",
    description: "Atendimento exclusivo e suporte dedicado para cada cliente.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-16">
          Por que escolher a <span className="font-semibold">Noir Market</span>?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-8 border border-gray-100 hover:border-black transition-colors duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

