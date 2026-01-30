"use client"

import { mockRooms, mockRoomRequests, mockIssues, mockUsers } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BedDouble, Users, AlertTriangle, ClipboardList, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const totalRooms = mockRooms.length
  const availableRooms = mockRooms.filter((r) => r.status === "available").length
  const occupiedRooms = mockRooms.filter((r) => r.status === "occupied").length
  const maintenanceRooms = mockRooms.filter((r) => r.status === "maintenance").length

  const totalStudents = mockUsers.filter((u) => u.role === "user").length
  const pendingRequests = mockRoomRequests.filter((r) => r.status === "pending").length
  const openIssues = mockIssues.filter((i) => i.status === "open").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Overview of hostel operations and management
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Rooms</CardTitle>
            <BedDouble className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{totalRooms}</div>
            <div className="flex gap-2 mt-2">
              <Badge variant="default" className="text-xs">{availableRooms} Available</Badge>
              <Badge variant="secondary" className="text-xs">{occupiedRooms} Occupied</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{totalStudents}</div>
            <p className="text-xs text-muted-foreground mt-2">Registered in system</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Pending Requests</CardTitle>
            <ClipboardList className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground mt-2">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{openIssues}</div>
            <p className="text-xs text-muted-foreground mt-2">Need attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Room Status Overview */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-card-foreground">Room Status Overview</CardTitle>
              <CardDescription>Current status of all hostel rooms</CardDescription>
            </div>
            <Link href="/admin/rooms" className="text-sm text-primary hover:underline">
              Manage Rooms
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{availableRooms}</p>
                  <p className="text-sm text-muted-foreground">Available Rooms</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-secondary-foreground" />
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{occupiedRooms}</p>
                  <p className="text-sm text-muted-foreground">Occupied Rooms</p>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-accent" />
                <div>
                  <p className="text-2xl font-bold text-card-foreground">{maintenanceRooms}</p>
                  <p className="text-sm text-muted-foreground">Under Maintenance</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Room Requests */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Recent Room Requests</CardTitle>
                <CardDescription>Latest student room allocation requests</CardDescription>
              </div>
              <Link href="/admin/requests" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRoomRequests.slice(0, 4).map((request) => (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div>
                    <p className="font-medium text-card-foreground">{request.userName}</p>
                    <p className="text-sm text-muted-foreground capitalize">
                      {request.roomType} Room - {request.duration}
                    </p>
                  </div>
                  <StatusBadge status={request.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Recent Issues</CardTitle>
                <CardDescription>Latest reported maintenance issues</CardDescription>
              </div>
              <Link href="/admin/issues" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockIssues.slice(0, 4).map((issue) => (
                <div
                  key={issue.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                >
                  <div>
                    <p className="font-medium text-card-foreground">{issue.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {issue.userName} - Room {issue.roomNumber}
                    </p>
                  </div>
                  <IssueStatusBadge status={issue.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
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

function IssueStatusBadge({ status }: { status: "open" | "in-progress" | "resolved" }) {
  const config = {
    open: { label: "Open", variant: "destructive" as const },
    "in-progress": { label: "In Progress", variant: "secondary" as const },
    resolved: { label: "Resolved", variant: "default" as const },
  }

  const { label, variant } = config[status]

  return <Badge variant={variant}>{label}</Badge>
}
