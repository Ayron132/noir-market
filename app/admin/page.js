"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [newProduct, setNewProduct] = useState({ name: "", price: "", description: "", imageUrl: "", category: "" })

  useEffect(() => {
    if (user && user.email === "arss@ic.ufal.br") {
      fetchProducts()
      fetchOrders()
    }
  }, [user])

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"))
    const productsData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setProducts(productsData)
  }

  const fetchOrders = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"))
    const ordersData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
    setOrders(ordersData)
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, "products"), newProduct)
      setNewProduct({ name: "", price: "", description: "", imageUrl: "", category: "" })
      fetchProducts()
    } catch (error) {
      console.error("Error adding product: ", error)
    }
  }

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id))
      fetchProducts()
    } catch (error) {
      console.error("Error deleting product: ", error)
    }
  }

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await updateDoc(doc(db, "products", id), updatedProduct)
      fetchProducts()
    } catch (error) {
      console.error("Error updating product: ", error)
    }
  }

  if (!user || user.email !== "arss@ic.ufal.br") {
    return <div className="container mx-auto px-4 py-8">Acesso não autorizado</div>;
  }

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Painel de Administração</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Adicionar Novo Produto</h2>
        <form onSubmit={handleAddProduct} className="space-y-4">
          <input
            type="text"
            placeholder="Nome do Produto"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            className="w-full p-2 border rounded"
            required />
          <input
            type="number"
            placeholder="Preço"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            className="w-full p-2 border rounded"
            required />
          <textarea
            placeholder="Descrição"
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
            className="w-full p-2 border rounded"
            required></textarea>
          <input
            type="text"
            placeholder="URL da Imagem"
            value={newProduct.imageUrl}
            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
            className="w-full p-2 border rounded"
            required />
          <select
            value={newProduct.category}
            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
            className="w-full p-2 border rounded"
            required>
            <option value="">Selecione uma categoria</option>
            <option value="fashion">Moda</option>
            <option value="tech">Tecnologia</option>
            <option value="decor">Decoração</option>
          </select>
          <button type="submit" className="bg-primary text-secondary px-4 py-2 rounded">
            Adicionar Produto
          </button>
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Produtos</h2>
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{product.name}</h3>
              <p>Preço: ${product.price}</p>
              <p>Categoria: {product.category}</p>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="text-red-500 mr-2">
                Excluir
              </button>
              <button
                onClick={() => handleUpdateProduct(product.id, { ...product, price: product.price + 1 })}
                className="text-blue-500">
                Aumentar Preço
              </button>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Pedidos</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="border p-4 rounded-lg">
              <p>
                <strong>Pedido ID:</strong> {order.id}
              </p>
              <p>
                <strong>Usuário ID:</strong> {order.userId}
              </p>
              <p>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </p>
              <p>
                <strong>Data:</strong> {order.createdAt.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>)
  );
}

