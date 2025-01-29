"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../firebase"

export default function Profile() {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])

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

  if (!user) {
    return <div className="container mx-auto px-4 py-8">Carregando...</div>;
  }

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Perfil do Usuário</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Informações da Conta</h2>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Seus Pedidos</h2>
        {orders.length === 0 ? (
          <p>Você ainda não fez nenhum pedido.</p>
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
                  <strong>Total:</strong> ${order.total.toFixed(2)}
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
    </div>)
  );
}

