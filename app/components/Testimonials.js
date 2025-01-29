"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    name: "João Santos",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-01-28%20080902.jpg-Y1nFlZohkau0IXyEt1yhfgEfkHdhrJ.jpeg",
    text: "A curadoria impecável e o atendimento excepcional fazem da Noir Market minha primeira escolha para produtos premium.",
    role: "Diretor Criativo",
  },
  {
    name: "Maria Silva",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-01-28%20080851.jpg-2iQ0YLXqZk9Z4obUHCc14xlZmK4rJC.jpeg",
    text: "Encontrei peças únicas que não estão disponíveis em nenhum outro lugar. A qualidade é verdadeiramente notável.",
    role: "Arquiteta",
  },
  {
    name: "Ana Oliveira",
    photo:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Captura%20de%20tela%202025-01-28%20080839.jpg-0sv0AYkHGnxkHKTsLZAfK81U1nflcC.jpeg",
    text: "A experiência de compra é tão sofisticada quanto os produtos. Cada detalhe é pensado com esmero.",
    role: "Designer de Interiores",
  },
]

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-light text-center mb-16">
          O que dizem nossos <span className="font-semibold">clientes</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 shadow-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center mb-6">
                <Image
                  src={testimonial.photo || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={80}
                  height={80}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

