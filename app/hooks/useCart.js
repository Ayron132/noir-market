"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "./useAuth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { db } from "../firebase"

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      fetchCart()
    } else {
      setCart([])
    }
  }, [user])

  const fetchCart = async () => {
    if (user) {
      const cartDoc = await getDoc(doc(db, "carts", user.uid))
      if (cartDoc.exists()) {
        setCart(cartDoc.data().items)
      }
    }
  }

  const saveCart = async (newCart) => {
    if (user) {
      await setDoc(doc(db, "carts", user.uid), { items: newCart })
    }
    setCart(newCart)
  }

  const addToCart = (product) => {
    const newCart = [...cart]
    const itemIndex = newCart.findIndex((item) => item.id === product.id)
    if (itemIndex > -1) {
      newCart[itemIndex].quantity += 1
    } else {
      newCart.push({ ...product, quantity: 1 })
    }
    saveCart(newCart)
  }

  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId)
    saveCart(newCart)
  }

  const updateQuantity = (productId, quantity) => {
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: Math.max(0, quantity) };
      }
      return item
    })
    saveCart(newCart)
  }

  const clearCart = () => {
    saveCart([])
  }

  return (
    (<CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>)
  );
}

export function useCart() {
  return useContext(CartContext);
}

