"use client"

import React from "react"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { mockIssues, type Issue } from "@/lib/mock-data"
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
import { Plus, AlertTriangle, Wrench, CheckCircle, Clock } from "lucide-react"

export default function IssuesPage() {
  const { user } = useAuth()
  const [issues, setIssues] = useState<Issue[]>(mockIssues)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [formData, setFormData] = useState({
    category: "" as Issue["category"] | "",
    title: "",
    description: "",
    priority: "" as Issue["priority"] | "",
  })

  const userIssues = issues.filter((i) => i.userId === user?.id)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.category || !formData.title || !formData.priority) return

    const newIssue: Issue = {
      id: String(Date.now()),
      userId: user?.id || "",
      userName: user?.name || "",
      roomNumber: user?.roomNumber || "N/A",
      category: formData.category as Issue["category"],
      title: formData.title,
      description: formData.description,
      priority: formData.priority as Issue["priority"],
      status: "open",
      createdAt: new Date().toISOString().split("T")[0],
    }

    setIssues([newIssue, ...issues])
    setFormData({ category: "", title: "", description: "", priority: "" })
    setIsDialogOpen(false)
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Report Issues</h1>
          <p className="text-muted-foreground mt-1">
            Submit maintenance requests and track their progress
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Report Issue
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="text-card-foreground">Report an Issue</DialogTitle>
              <DialogDescription>
                Describe the problem and we will address it as soon as possible
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    setFormData({ ...formData, category: value as Issue["category"] })
                  }
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="furniture">Furniture</SelectItem>
                    <SelectItem value="cleaning">Cleaning</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Issue Title</Label>
                <Input
                  id="title"
                  placeholder="Brief description of the issue"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority" className="text-foreground">Priority</Label>
                <Select
                  value={formData.priority}
                  onValueChange={(value) =>
                    setFormData({ ...formData, priority: value as Issue["priority"] })
                  }
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="low">Low - Not urgent</SelectItem>
                    <SelectItem value="medium">Medium - Should be addressed soon</SelectItem>
                    <SelectItem value="high">High - Urgent attention needed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Provide detailed description of the issue..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                  Submit Report
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Issue Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-destructive/10">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold text-card-foreground">
                  {userIssues.filter((i) => i.status === "open").length}
                </p>
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
                <p className="text-2xl font-bold text-card-foreground">
                  {userIssues.filter((i) => i.status === "in-progress").length}
                </p>
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
                <p className="text-2xl font-bold text-card-foreground">
                  {userIssues.filter((i) => i.status === "resolved").length}
                </p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Issues List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-card-foreground">Your Reported Issues</CardTitle>
          <CardDescription>Track the status of your maintenance requests</CardDescription>
        </CardHeader>
        <CardContent>
          {userIssues.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <AlertTriangle className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg font-medium">No issues reported</p>
              <p className="text-sm mt-1">Everything looks good!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {userIssues.map((issue) => (
                <div
                  key={issue.id}
                  className="p-4 rounded-lg bg-muted/30 border border-border"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-card-foreground">{issue.title}</p>
                        <IssueStatusBadge status={issue.status} />
                        <PriorityBadge priority={issue.priority} />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {issue.description}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="capitalize">Category: {issue.category}</span>
                        <span>Room: {issue.roomNumber}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground whitespace-nowrap">
                      {issue.createdAt}
                    </div>
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
    low: { label: "Low", className: "bg-muted text-muted-foreground" },
    medium: { label: "Medium", className: "bg-accent/20 text-accent" },
    high: { label: "High", className: "bg-destructive/20 text-destructive" },
  }

  const { label, className } = config[priority]

  return <Badge variant="outline" className={className}>{label}</Badge>
}
