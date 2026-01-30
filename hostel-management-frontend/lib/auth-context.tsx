"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { mockUsers, type User } from "./mock-data"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Mock authentication - find user by email
    const foundUser = mockUsers.find((u) => u.email === email)
    
    if (foundUser && password.length >= 6) {
      setUser(foundUser)
      setIsLoading(false)
      return { success: true }
    }
    
    setIsLoading(false)
    return { success: false, error: "Invalid email or password" }
  }, [])

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true)
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === email)
    if (existingUser) {
      setIsLoading(false)
      return { success: false, error: "Email already registered" }
    }
    
    if (password.length < 6) {
      setIsLoading(false)
      return { success: false, error: "Password must be at least 6 characters" }
    }
    
    // Create new user (always as student/user role)
    const newUser: User = {
      id: String(Date.now()),
      name,
      email,
      role: "user",
      studentId: `STU${String(Date.now()).slice(-4)}`,
      createdAt: new Date().toISOString().split("T")[0],
    }
    
    setUser(newUser)
    setIsLoading(false)
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
