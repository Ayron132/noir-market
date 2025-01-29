"use client"

import { useState } from "react"
import { useCart } from "../hooks/useCart"
import { useAuth } from "../hooks/useAuth"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../firebase"
import { useRouter } from "next/navigation"

export default function Checkout() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      alert("Por favor, faça login para finalizar a compra.")
      router.push("/login")
      return
    }

    const order = {
      userId: user.uid,
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      shippingDetails: {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      createdAt: new Date(),
    }

    try {
      await addDoc(collection(db, "orders"), order)
      clearCart()
      alert("Pedido realizado com sucesso!")
      router.push("/profile")
    } catch (error) {
      console.error("Error adding document: ", error)
      alert("Ocorreu um erro ao processar seu pedido. Por favor, tente novamente.")
    }
  }

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Finalizar Compra</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">
            Nome Completo
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block mb-1">
            Endereço
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block mb-1">
            Cidade
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="zipCode" className="block mb-1">
            CEP
          </label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4">
          <label htmlFor="cardNumber" className="block mb-1">
            Número do Cartão
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded" />
        </div>
        <div className="mb-4 flex gap-4">
          <div className="flex-1">
            <label htmlFor="expirationDate" className="block mb-1">
              Data de Expiração
            </label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="MM/AA" />
          </div>
          <div className="flex-1">
            <label htmlFor="cvv" className="block mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded" />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-secondary px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent transition-colors">
          Finalizar Pedido
        </button>
      </form>
    </div>)
  );
}

