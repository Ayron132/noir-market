"use client"

import { useState, useEffect, Suspense } from "react"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import ProductCard from "../components/ProductCard"
import ProductFilters from "../components/ProductFilters"
import { useSearchParams } from "next/navigation"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProductsContent />
    </Suspense>
  )
}

function ProductsContent() {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "name",
  })

  const searchParams = useSearchParams()
  const categoryFromUrl = searchParams.get("category")

  useEffect(() => {
    if (categoryFromUrl) {
      setFilters((prevFilters) => ({ ...prevFilters, category: categoryFromUrl }))
    }
  }, [categoryFromUrl])

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"))
      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setProducts(productsData)
      setFilteredProducts(productsData)
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    let result = products

    if (filters.category) {
      result = result.filter((product) => product.category === filters.category)
    }

    if (filters.minPrice) {
      result = result.filter((product) => product.price >= Number.parseFloat(filters.minPrice))
    }

    if (filters.maxPrice) {
      result = result.filter((product) => product.price <= Number.parseFloat(filters.maxPrice))
    }

    result.sort((a, b) => {
      if (filters.sortBy === "name") {
        return a.name.localeCompare(b.name)
      } else if (filters.sortBy === "priceLow") {
        return a.price - b.price
      } else if (filters.sortBy === "priceHigh") {
        return b.price - a.price
      }
      return 0
    })

    setFilteredProducts(result)
  }, [filters, products])

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-medium">Produtos</h1>
        {categoryFromUrl && <p className="text-gray-500 mt-2">Mostrando produtos em {categoryFromUrl}</p>}
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64">
          <ProductFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
