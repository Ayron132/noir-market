import Link from "next/link"
import Image from "next/image"

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`} className="group">
    <div className="aspect-square relative mb-2">
      <img
        src={product.imageUrl || "/placeholder.svg"}
        alt={product.name}
        className="object-cover w-full h-full rounded-lg transition-all duration-300 group-hover:scale-105"
      />
    </div>
    <div className="flex flex-col space-y-1">
      <p className="text-sm text-gray-500">{product.category}</p>
      <h3 className="text-base font-medium">{product.name}</h3>
      <p className="text-base font-medium">R$ {parseInt(product.price).toFixed(2)}</p>
    </div>
  </Link>
  )
}

