"use client"

import { useState } from "react"
import { useCart } from "../hooks/useCart"

export default function AddToCartButton({ product }) {
  const { addToCart } = useCart()
  const [showNotification, setShowNotification] = useState(false)

  const handleAddToCart = () => {
    addToCart(product)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="bg-primary text-secondary px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary transition-colors"
      >
        Adicionar ao Carrinho
      </button>

      {showNotification && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg transition-opacity duration-300">
          Produto adicionado ao carrinho!
        </div>
      )}
    </>
  )
}
