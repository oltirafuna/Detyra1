"use client"

import { useState } from "react"
import { mockRooms, type Room } from "@/lib/mock-data"
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { BedDouble, CheckCircle, Users, Wrench } from "lucide-react"

export default function AdminRoomsPage() {
  const [rooms, setRooms] = useState<Room[]>(mockRooms)
  const [filter, setFilter] = useState<string>("all")

  const filteredRooms = filter === "all" ? rooms : rooms.filter((r) => r.status === filter)

  const updateRoomStatus = (roomId: string, newStatus: Room["status"]) => {
    setRooms(
      rooms.map((room) =>
        room.id === roomId ? { ...room, status: newStatus } : room
      )
    )
  }

  const availableCount = rooms.filter((r) => r.status === "available").length
  const occupiedCount = rooms.filter((r) => r.status === "occupied").length
  const maintenanceCount = rooms.filter((r) => r.status === "maintenance").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Rooms</h1>
        <p className="text-muted-foreground mt-1">
          View and manage all hostel rooms and their availability
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <CheckCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{availableCount}</p>
                <p className="text-sm text-muted-foreground">Available</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <Users className="h-5 w-5 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{occupiedCount}</p>
                <p className="text-sm text-muted-foreground">Occupied</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-accent/10">
                <Wrench className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{maintenanceCount}</p>
                <p className="text-sm text-muted-foreground">Maintenance</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-card-foreground">All Rooms</CardTitle>
              <CardDescription>Manage room availability and status</CardDescription>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Rooms</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-border bg-muted/30">
                  <TableHead className="text-muted-foreground">Room</TableHead>
                  <TableHead className="text-muted-foreground">Type</TableHead>
                  <TableHead className="text-muted-foreground">Floor</TableHead>
                  <TableHead className="text-muted-foreground">Capacity</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-muted-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRooms.map((room) => (
                  <TableRow key={room.id} className="border-border">
                    <TableCell className="font-medium text-card-foreground">
                      <div className="flex items-center gap-2">
                        <BedDouble className="h-4 w-4 text-primary" />
                        {room.number}
                      </div>
                    </TableCell>
                    <TableCell className="capitalize text-card-foreground">{room.type}</TableCell>
                    <TableCell className="text-card-foreground">{room.floor}</TableCell>
                    <TableCell className="text-card-foreground">
                      {room.occupied}/{room.capacity}
                    </TableCell>
                    <TableCell className="text-card-foreground">${room.pricePerMonth}/mo</TableCell>
                    <TableCell>
                      <RoomStatusBadge status={room.status} />
                    </TableCell>
                    <TableCell>
                      <Select
                        value={room.status}
                        onValueChange={(value) =>
                          updateRoomStatus(room.id, value as Room["status"])
                        }
                      >
                        <SelectTrigger className="w-[140px] h-8 text-xs bg-input border-border text-foreground">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          <SelectItem value="available">Set Available</SelectItem>
                          <SelectItem value="occupied">Set Occupied</SelectItem>
                          <SelectItem value="maintenance">Set Maintenance</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredRooms.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <BedDouble className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No rooms found</p>
              <p className="text-sm mt-1">Try adjusting your filter</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function RoomStatusBadge({ status }: { status: Room["status"] }) {
  const config = {
    available: { label: "Available", variant: "default" as const },
    occupied: { label: "Occupied", variant: "secondary" as const },
    maintenance: { label: "Maintenance", variant: "outline" as const },
  }

  const { label, variant } = config[status]

  return <Badge variant={variant}>{label}</Badge>
}
