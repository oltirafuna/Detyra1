"use client"

import { useState } from "react"
import { mockRoomRequests, mockRooms, type RoomRequest } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ClipboardList, CheckCircle, XCircle, Clock, BedDouble } from "lucide-react"

export default function AdminRequestsPage() {
  const [requests, setRequests] = useState<RoomRequest[]>(mockRoomRequests)
  const [filter, setFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<RoomRequest | null>(null)
  const [assignRoom, setAssignRoom] = useState<string>("")

  const filteredRequests = filter === "all" ? requests : requests.filter((r) => r.status === filter)

  const availableRooms = mockRooms.filter((r) => r.status === "available")

  const handleApprove = () => {
    if (!selectedRequest || !assignRoom) return

    setRequests(
      requests.map((req) =>
        req.id === selectedRequest.id
          ? { ...req, status: "approved" as const, assignedRoom: assignRoom }
          : req
      )
    )
    setSelectedRequest(null)
    setAssignRoom("")
  }

  const handleReject = (requestId: string) => {
    setRequests(
      requests.map((req) =>
        req.id === requestId ? { ...req, status: "rejected" as const } : req
      )
    )
  }

  const pendingCount = requests.filter((r) => r.status === "pending").length
  const approvedCount = requests.filter((r) => r.status === "approved").length
  const rejectedCount = requests.filter((r) => r.status === "rejected").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Room Requests</h1>
        <p className="text-muted-foreground mt-1">
          Review and manage student room allocation requests
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Clock className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{pendingCount}</p>
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
                <p className="text-2xl font-bold text-card-foreground">{approvedCount}</p>
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
                <p className="text-2xl font-bold text-card-foreground">{rejectedCount}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Requests List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-card-foreground">All Requests</CardTitle>
              <CardDescription>Approve or reject room allocation requests</CardDescription>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredRequests.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <ClipboardList className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No requests found</p>
              <p className="text-sm mt-1">Try adjusting your filter</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-card-foreground">{request.userName}</p>
                        <StatusBadge status={request.status} />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">Room Type: {request.roomType}</span>
                        <span>Duration: {request.duration}</span>
                      </div>
                      {request.notes && (
                        <p className="text-sm text-muted-foreground">Notes: {request.notes}</p>
                      )}
                      {request.assignedRoom && (
                        <p className="text-sm text-primary font-medium">
                          Assigned: Room {request.assignedRoom}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">Submitted: {request.createdAt}</p>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => setSelectedRequest(request)}
                          className="gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                          className="gap-1"
                        >
                          <XCircle className="h-4 w-4" />
                          Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approve Dialog */}
      <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-card-foreground">Approve Room Request</DialogTitle>
            <DialogDescription>
              Assign a room to {selectedRequest?.userName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-muted/30 border border-border">
              <p className="text-sm text-muted-foreground">Request Details</p>
              <p className="font-medium text-card-foreground capitalize mt-1">
                {selectedRequest?.roomType} Room - {selectedRequest?.duration}
              </p>
              {selectedRequest?.notes && (
                <p className="text-sm text-muted-foreground mt-2">
                  Notes: {selectedRequest.notes}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Assign Room</Label>
              <Select value={assignRoom} onValueChange={setAssignRoom}>
                <SelectTrigger className="bg-input border-border text-foreground">
                  <SelectValue placeholder="Select a room" />
                </SelectTrigger>
                <SelectContent className="bg-popover border-border">
                  {availableRooms.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">No rooms available</div>
                  ) : (
                    availableRooms
                      .filter((room) => room.type === selectedRequest?.roomType)
                      .map((room) => (
                        <SelectItem key={room.id} value={room.number}>
                          {room.number} - {room.type} (${room.pricePerMonth}/mo)
                        </SelectItem>
                      ))
                  )}
                  {availableRooms.filter((room) => room.type === selectedRequest?.roomType)
                    .length === 0 && (
                    <div className="p-2 text-sm text-muted-foreground">
                      No {selectedRequest?.roomType} rooms available. Showing all:
                    </div>
                  )}
                  {availableRooms
                    .filter((room) => room.type !== selectedRequest?.roomType)
                    .map((room) => (
                      <SelectItem key={room.id} value={room.number}>
                        {room.number} - {room.type} (${room.pricePerMonth}/mo)
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setSelectedRequest(null)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={handleApprove} disabled={!assignRoom}>
                Confirm Approval
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
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
