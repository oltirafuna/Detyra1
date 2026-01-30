"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Building2, Loader2 } from "lucide-react"

export default function Home() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    } else {
      router.push("/login")
    }
  }, [user, router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
          <Building2 className="w-6 h-6 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">DormHub</h1>
      </div>
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  )
}
