import Link from "next/link"
import { ShoppingBag, Smartphone, Home } from "lucide-react"

const categories = [
  { name: "Moda", icon: ShoppingBag, href: "/products?category=fashion" },
  { name: "Tecnologia", icon: Smartphone, href: "/products?category=tech" },
  { name: "Decoração", icon: Home, href: "/products?category=decor" },
]

export default function CategoryIcons() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {categories.map((category) => (
        <Link
          key={category.name}
          href={category.href}
          className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <category.icon className="w-12 h-12 mb-2" />
          <span className="text-lg font-semibold">{category.name}</span>
        </Link>
      ))}
    </div>
  )
}

