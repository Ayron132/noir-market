"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { collection, getDocs, query, limit } from "firebase/firestore"
import { db } from "../firebase"
import ProductCard from "./ProductCard"

export default function FeaturedProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), limit(4))
      const querySnapshot = await getDocs(q)
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProducts(productsData)
    }

    fetchProducts()
  }, [])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

