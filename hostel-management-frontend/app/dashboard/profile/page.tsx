"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, Mail, Phone, Hash, Home, Calendar } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()

  const profileFields = [
    { label: "Full Name", value: user?.name, icon: User },
    { label: "Email Address", value: user?.email, icon: Mail },
    { label: "Phone Number", value: user?.phone || "Not provided", icon: Phone },
    { label: "Student ID", value: user?.studentId || "N/A", icon: Hash },
    { label: "Room Number", value: user?.roomNumber || "Not assigned", icon: Home },
    { label: "Member Since", value: user?.createdAt, icon: Calendar },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Profile</h1>
        <p className="text-muted-foreground mt-1">
          View your account information
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="bg-card border-border lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-4">
                <User className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-card-foreground">{user?.name}</h2>
              <p className="text-muted-foreground mt-1">{user?.email}</p>
              <Badge variant="secondary" className="mt-3 capitalize">
                {user?.role} Account
              </Badge>

              {user?.roomNumber && (
                <div className="mt-6 p-4 rounded-lg bg-muted/30 border border-border w-full">
                  <p className="text-sm text-muted-foreground">Current Room</p>
                  <p className="text-2xl font-bold text-primary mt-1">{user.roomNumber}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-card-foreground">Account Information</CardTitle>
            <CardDescription>
              Your personal details and hostel information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              {profileFields.map((field) => (
                <div
                  key={field.label}
                  className="p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <field.icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{field.label}</p>
                      <p className="font-medium text-card-foreground">{field.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Info */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Account Status</CardTitle>
          <CardDescription>
            Current status and permissions of your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-muted-foreground">Account Type</p>
              <p className="text-lg font-semibold text-primary capitalize mt-1">
                {user?.role === "user" ? "Student" : user?.role}
              </p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-muted-foreground">Status</p>
              <p className="text-lg font-semibold text-card-foreground mt-1">Active</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-muted-foreground">Room Status</p>
              <p className="text-lg font-semibold text-card-foreground mt-1">
                {user?.roomNumber ? "Assigned" : "Pending Assignment"}
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            To update your profile information, please contact the hostel administration office.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
