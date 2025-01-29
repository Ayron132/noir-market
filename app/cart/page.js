"use client"

import { useCart } from "../hooks/useCart"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, X } from "lucide-react"

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (cart.length === 0) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 py-12">
        <h1 className="text-3xl font-medium mb-4">Carrinho</h1>
        <p className="text-gray-500 mb-4">
          Você não tem nada no seu carrinho. Vamos mudar isso, use o link abaixo para começar a navegar em nossos
          produtos.
        </p>
        <Link href="/products" className="text-primary hover:underline inline-flex items-center">
          Explorar produtos →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <h1 className="text-3xl font-medium mb-8">Carrinho</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="flex py-8 gap-4">
                <div className="aspect-square relative w-24 h-24">
                  <img
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <h3 className="font-medium">{item.name}</h3>
                    <button onClick={() => removeFromCart(item.id)} className="text-gray-500 hover:text-gray-700">
                      <X size={20} />
                    </button>
                  </div>
                  <p className="text-gray-500 mb-4">{item.category}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 border rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <p className="font-medium">R$ {(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-[350px] bg-gray-50 rounded-lg p-6 h-fit">
          <h2 className="text-lg font-medium mb-4">Resumo do pedido</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span>R$ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Frete</span>
              <span>Calculado no checkout</span>
            </div>
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">R$ {total.toFixed(2)}</span>
            </div>
            <Link
              href="/checkout"
              className="w-full bg-primary text-secondary py-3 rounded-full text-center block hover:bg-accent-hover transition-colors"
            >
              Finalizar Compra
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

