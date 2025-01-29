"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../../firebase"
import AddToCartButton from "../../components/AddToCartButton"
import Image from "next/image"

export default function ProductDetail() {
  const [product, setProduct] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() })
      } else {
        console.log("No such document!")
      }
    }

    fetchProduct()
  }, [id])

  if (!product) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <img src={product.imageUrl || "/placeholder.svg"} alt={product.name}  className="object-cover" />
          </div>
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">R$ {parseInt(product.price).toFixed(2)}</p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Descrição</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Categoria</h2>
            <p className="text-gray-600">{product.category}</p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  )
}

