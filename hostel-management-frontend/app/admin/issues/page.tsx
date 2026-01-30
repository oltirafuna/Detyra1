"use client"

import { useState } from "react"
import { mockIssues, type Issue } from "@/lib/mock-data"
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
import { AlertTriangle, CheckCircle, Clock, Wrench } from "lucide-react"

export default function AdminIssuesPage() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [filter, setFilter] = useState<string>("all")

  const filteredIssues = filter === "all" ? issues : issues.filter((i) => i.status === filter)

  const updateIssueStatus = (issueId: string, newStatus: Issue["status"]) => {
    setIssues(
      issues.map((issue) =>
        issue.id === issueId ? { ...issue, status: newStatus } : issue
      )
    )
  }

  const openCount = issues.filter((i) => i.status === "open").length
  const inProgressCount = issues.filter((i) => i.status === "in-progress").length
  const resolvedCount = issues.filter((i) => i.status === "resolved").length

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manage Issues</h1>
        <p className="text-muted-foreground mt-1">
          Track and resolve reported maintenance issues
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">{openCount}</p>
                <p className="text-sm text-muted-foreground">Open</p>
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
                <p className="text-2xl font-bold text-card-foreground">{inProgressCount}</p>
                <p className="text-sm text-muted-foreground">In Progress</p>
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
                <p className="text-2xl font-bold text-card-foreground">{resolvedCount}</p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues Table */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-card-foreground">All Issues</CardTitle>
              <CardDescription>Manage reported maintenance issues</CardDescription>
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] bg-input border-border text-foreground">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-popover border-border">
                <SelectItem value="all">All Issues</SelectItem>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredIssues.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No issues found</p>
              <p className="text-sm mt-1">Try adjusting your filter</p>
            </div>
          ) : (
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border bg-muted/30">
                    <TableHead className="text-muted-foreground">Issue</TableHead>
                    <TableHead className="text-muted-foreground">Student</TableHead>
                    <TableHead className="text-muted-foreground">Room</TableHead>
                    <TableHead className="text-muted-foreground">Category</TableHead>
                    <TableHead className="text-muted-foreground">Priority</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredIssues.map((issue) => (
                    <TableRow key={issue.id} className="border-border">
                      <TableCell className="max-w-[200px]">
                        <p className="font-medium text-card-foreground truncate">{issue.title}</p>
                        <p className="text-xs text-muted-foreground truncate">{issue.description}</p>
                      </TableCell>
                      <TableCell className="text-card-foreground">{issue.userName}</TableCell>
                      <TableCell className="text-card-foreground">{issue.roomNumber}</TableCell>
                      <TableCell className="capitalize text-card-foreground">{issue.category}</TableCell>
                      <TableCell>
                        <PriorityBadge priority={issue.priority} />
                      </TableCell>
                      <TableCell>
                        <IssueStatusBadge status={issue.status} />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={issue.status}
                          onValueChange={(value) =>
                            updateIssueStatus(issue.id, value as Issue["status"])
                          }
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs bg-input border-border text-foreground">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover border-border">
                            <SelectItem value="open">Set Open</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

function IssueStatusBadge({ status }: { status: Issue["status"] }) {
  const config = {
    open: { label: "Open", variant: "destructive" as const },
    "in-progress": { label: "In Progress", variant: "secondary" as const },
    resolved: { label: "Resolved", variant: "default" as const },
  }

  const { label, variant } = config[status]

  return <Badge variant={variant}>{label}</Badge>
}

function PriorityBadge({ priority }: { priority: Issue["priority"] }) {
  const config = {
    low: { label: "Low", className: "bg-muted text-muted-foreground border-muted" },
    medium: { label: "Medium", className: "bg-accent/20 text-accent border-accent/30" },
    high: { label: "High", className: "bg-destructive/20 text-destructive border-destructive/30" },
  }

  const { label, className } = config[priority]

  return (
    <Badge variant="outline" className={className}>
      {label}
    </Badge>
  )
}
