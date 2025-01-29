"use client"

import { useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const { signUp, signInWithGoogle } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("As senhas não coincidem.")
      return
    }
    try {
      await signUp(email, password)
      router.push("/market")
    } catch (error) {
      console.error("Error signing up: ", error)
      alert("Falha no registro. Por favor, tente novamente.")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      router.push("/market")
    } catch (error) {
      console.error("Error signing in with Google: ", error)
      alert("Falha no registro com Google. Por favor, tente novamente.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Registrar</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="mb-4">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-1">
            Senha
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block mb-1">
            Confirmar Senha
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-secondary px-6 py-3 rounded-full text-lg font-semibold hover:bg-accent transition-colors mb-4"
        >
          Registrar
        </button>
      </form>
      <div className="max-w-md mx-auto">
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors"
        >
          Registrar com Google
        </button>
      </div>
      <p className="mt-4 text-center">
        Já tem uma conta?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Faça login
        </Link>
      </p>
    </div>
  )
}

