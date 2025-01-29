"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function Profile() {
  const { user, signOut } = useAuth()
  const [orders, setOrders] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        const q = query(collection(db, "orders"), where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        setOrders(ordersData)
      }
    }

    fetchOrders()
  }, [user])

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/market")
    } catch (error) {
      console.error("Error signing out: ", error)
    }
  }

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>
  }

  return (
    <div className="max-w-[1440px] mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Perfil do Usuário</h1>
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <LogOut size={20} className="mr-2" />
          Sair
        </button>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Informações da Conta</h2>
        <p className="text-gray-600">
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Seus Pedidos</h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">Você ainda não fez nenhum pedido.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="border p-4 rounded-lg">
                <p>
                  <strong>Pedido ID:</strong> {order.id}
                </p>
                <p>
                  <strong>Data:</strong> {order.createdAt.toDate().toLocaleString()}
                </p>
                <p>
                  <strong>Total:</strong> R$ {order.total.toFixed(2)}
                </p>
                <h3 className="font-semibold mt-2">Itens:</h3>
                <ul className="list-disc list-inside">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - Quantidade: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

