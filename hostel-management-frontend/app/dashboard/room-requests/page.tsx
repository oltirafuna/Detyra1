"use client"

import React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockRoomRequests, type RoomRequest } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus, Clock, CheckCircle, XCircle, BedDouble } from "lucide-react"

export default function RoomRequestsPage() {
  const { user } = useAuth()
  const [requests, setRequests] = useState<RoomRequest[]>(mockRoomRequests)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    roomType: "" as "single" | "double" | "triple" | "dormitory" | "",
    duration: "",
    notes: "",
  })

  const userRequests = requests.filter((r) => r.userId === user?.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.roomType || !formData.duration) return

    const newRequest: RoomRequest = {
      id: String(Date.now()),
      userId: user?.id || "",
      userName: user?.name || "",
      roomType: formData.roomType as "single" | "double" | "triple" | "dormitory",
      duration: formData.duration,
      notes: formData.notes,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setRequests([newRequest, ...requests])
    setFormData({ roomType: "", duration: "", notes: "" })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Room Requests</h1>
          <p className="text-muted-foreground mt-1">
            Submit and track your room allocation requests
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Request
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Submit Room Request</DialogTitle>
              <DialogDescription>
                Fill in the details for your room allocation request
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="roomType" className="text-foreground">Room Type</Label>
                <Select
                  value={formData.roomType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, roomType: value as typeof formData.roomType })
                  }
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select room type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="single">Single Room - $500/month</SelectItem>
                    <SelectItem value="double">Double Room - $350/month</SelectItem>
                    <SelectItem value="triple">Triple Room - $250/month</SelectItem>
                    <SelectItem value="dormitory">Dormitory - $150/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-foreground">Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => setFormData({ ...formData, duration: value })}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="1 semester">1 Semester</SelectItem>
                    <SelectItem value="2 semesters">2 Semesters</SelectItem>
                    <SelectItem value="6 months">6 Months</SelectItem>
                    <SelectItem value="1 year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">Additional Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any special requirements or preferences..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground min-h-24"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 bg-transparent"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Submit Request
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Request Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {userRequests.filter((r) => r.status === "pending").length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {userRequests.filter((r) => r.status === "approved").length}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {userRequests.filter((r) => r.status === "rejected").length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Your Requests</CardTitle>
          <CardDescription>Track the status of your room allocation requests</CardDescription>
        </CardHeader>
        <CardContent>
          {userRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <BedDouble className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No requests yet</p>
              <p className="text-sm mt-1">Submit your first room request to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userRequests.map((request) => (
                <div
                  key={request.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-card-foreground capitalize">
                        {request.roomType} Room
                      </p>
                      <StatusBadge status={request.status} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Duration: {request.duration}
                    </p>
                    {request.notes && (
                      <p className="text-sm text-muted-foreground">
                        Notes: {request.notes}
                      </p>
                    )}
                    {request.assignedRoom && (
                      <p className="text-sm text-primary font-medium">
                        Assigned Room: {request.assignedRoom}
                      </p>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Submitted: {request.createdAt}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function StatusBadge({ status }: { status: "pending" | "approved" | "rejected" }) {
  const config = {
    pending: { label: "Pending", variant: "secondary" as const, icon: Clock },
    approved: { label: "Approved", variant: "default" as const, icon: CheckCircle },
    rejected: { label: "Rejected", variant: "destructive" as const, icon: XCircle },
  }

  const { label, variant, icon: Icon } = config[status]

  return (
    <Badge variant={variant} className="gap-1">
      <Icon className="h-3 w-3" />
      {label}
    </Badge>
  )
}
