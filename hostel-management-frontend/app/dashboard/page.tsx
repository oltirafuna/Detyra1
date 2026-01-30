"use client"

import { useAuth } from "@/lib/auth-context"
import { mockRoomRequests, mockIssues } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BedDouble, AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react"
import Link from "next/link"

export default function UserDashboard() {
  const { user } = useAuth()

  const userRequests = mockRoomRequests.filter((r) => r.userId === user?.id)
  const userIssues = mockIssues.filter((i) => i.userId === user?.id)

  const pendingRequests = userRequests.filter((r) => r.status === "pending").length
  const approvedRequests = userRequests.filter((r) => r.status === "approved").length
  const openIssues = userIssues.filter((i) => i.status === "open").length
  const resolvedIssues = userIssues.filter((i) => i.status === "resolved").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Welcome back, {user?.name?.split(" ")[0]}
        </h1>
        <p className="text-muted-foreground mt-1">
          {"Here's an overview of your hostel status"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Current Room</CardTitle>
            <BedDouble className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">
              {user?.roomNumber || "Not Assigned"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {user?.roomNumber ? "Occupied" : "Request a room to get started"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground mt-1">Awaiting approval</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Open Issues</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{openIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">Being addressed</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-card-foreground">Resolved Issues</CardTitle>
            <CheckCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-card-foreground">{resolvedIssues}</div>
            <p className="text-xs text-muted-foreground mt-1">Successfully fixed</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Room Requests */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Recent Room Requests</CardTitle>
                <CardDescription>Your latest room request submissions</CardDescription>
              </div>
              <Link
                href="/dashboard/room-requests"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {userRequests.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BedDouble className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No room requests yet</p>
                <Link
                  href="/dashboard/room-requests"
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                >
                  Submit a request
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.slice(0, 3).map((request) => (
                  <div
                    key={request.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div>
                      <p className="font-medium text-card-foreground capitalize">
                        {request.roomType} Room
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {request.duration} - {request.createdAt}
                      </p>
                    </div>
                    <StatusBadge status={request.status} />
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Issues */}
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-card-foreground">Recent Issues</CardTitle>
                <CardDescription>Your latest reported issues</CardDescription>
              </div>
              <Link
                href="/dashboard/issues"
                className="text-sm text-primary hover:underline"
              >
                View all
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {userIssues.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <AlertTriangle className="h-10 w-10 mx-auto mb-2 opacity-50" />
                <p>No issues reported</p>
                <Link
                  href="/dashboard/issues"
                  className="text-primary hover:underline text-sm mt-2 inline-block"
                >
                  Report an issue
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userIssues.slice(0, 3).map((issue) => (
                  <div
                    key={issue.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-muted/30 border border-border"
                  >
                    <div>
                      <p className="font-medium text-card-foreground">{issue.title}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {issue.category} - {issue.createdAt}
                      </p>
                    </div>
                    <IssueStatusBadge status={issue.status} />
                  </div>
                ))}
              </div>
            )}
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
