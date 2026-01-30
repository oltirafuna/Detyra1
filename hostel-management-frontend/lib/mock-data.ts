export interface User {
  id: string
  name: string
  email: string
  role: "user" | "admin"
  studentId?: string
  phone?: string
  roomNumber?: string
  createdAt: string
}

export interface Room {
  id: string
  number: string
  type: "single" | "double" | "triple" | "dormitory"
  capacity: number
  occupied: number
  floor: number
  status: "available" | "occupied" | "maintenance"
  amenities: string[]
  pricePerMonth: number
}

export interface RoomRequest {
  id: string
  userId: string
  userName: string
  roomType: "single" | "double" | "triple" | "dormitory"
  duration: string
  notes: string
  status: "pending" | "approved" | "rejected"
  createdAt: string
  assignedRoom?: string
}

export interface Issue {
  id: string
  userId: string
  userName: string
  roomNumber: string
  category: "plumbing" | "electrical" | "furniture" | "cleaning" | "other"
  title: string
  description: string
  priority: "low" | "medium" | "high"
  status: "open" | "in-progress" | "resolved"
  createdAt: string
}

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@student.edu",
    role: "user",
    studentId: "STU001",
    phone: "+1 234 567 8900",
    roomNumber: "A-101",
    createdAt: "2025-09-01",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    email: "sarah@student.edu",
    role: "user",
    studentId: "STU002",
    phone: "+1 234 567 8901",
    roomNumber: "B-205",
    createdAt: "2025-09-01",
  },
  {
    id: "3",
    name: "Admin User",
    email: "admin@hostel.edu",
    role: "admin",
    createdAt: "2025-01-01",
  },
]

export const mockRooms: Room[] = [
  {
    id: "1",
    number: "A-101",
    type: "single",
    capacity: 1,
    occupied: 1,
    floor: 1,
    status: "occupied",
    amenities: ["WiFi", "AC", "Attached Bathroom"],
    pricePerMonth: 500,
  },
  {
    id: "2",
    number: "A-102",
    type: "single",
    capacity: 1,
    occupied: 0,
    floor: 1,
    status: "available",
    amenities: ["WiFi", "AC", "Attached Bathroom"],
    pricePerMonth: 500,
  },
  {
    id: "3",
    number: "B-201",
    type: "double",
    capacity: 2,
    occupied: 1,
    floor: 2,
    status: "available",
    amenities: ["WiFi", "AC", "Shared Bathroom"],
    pricePerMonth: 350,
  },
  {
    id: "4",
    number: "B-205",
    type: "double",
    capacity: 2,
    occupied: 2,
    floor: 2,
    status: "occupied",
    amenities: ["WiFi", "AC", "Shared Bathroom"],
    pricePerMonth: 350,
  },
  {
    id: "5",
    number: "C-301",
    type: "triple",
    capacity: 3,
    occupied: 2,
    floor: 3,
    status: "available",
    amenities: ["WiFi", "Fan", "Shared Bathroom"],
    pricePerMonth: 250,
  },
  {
    id: "6",
    number: "D-101",
    type: "dormitory",
    capacity: 6,
    occupied: 4,
    floor: 1,
    status: "available",
    amenities: ["WiFi", "Fan", "Common Bathroom"],
    pricePerMonth: 150,
  },
  {
    id: "7",
    number: "A-103",
    type: "single",
    capacity: 1,
    occupied: 0,
    floor: 1,
    status: "maintenance",
    amenities: ["WiFi", "AC", "Attached Bathroom"],
    pricePerMonth: 500,
  },
]

export const mockRoomRequests: RoomRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Smith",
    roomType: "single",
    duration: "1 semester",
    notes: "Prefer ground floor due to mobility issues",
    status: "approved",
    createdAt: "2025-08-15",
    assignedRoom: "A-101",
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Johnson",
    roomType: "double",
    duration: "1 year",
    notes: "Looking for a quiet study environment",
    status: "pending",
    createdAt: "2025-12-20",
  },
  {
    id: "3",
    userId: "4",
    userName: "Mike Wilson",
    roomType: "dormitory",
    duration: "1 semester",
    notes: "Budget-friendly option preferred",
    status: "pending",
    createdAt: "2026-01-10",
  },
  {
    id: "4",
    userId: "5",
    userName: "Emily Davis",
    roomType: "triple",
    duration: "6 months",
    notes: "",
    status: "rejected",
    createdAt: "2025-11-05",
  },
]

export const mockIssues: Issue[] = [
  {
    id: "1",
    userId: "1",
    userName: "John Smith",
    roomNumber: "A-101",
    category: "plumbing",
    title: "Leaking faucet",
    description: "The bathroom faucet has been leaking for 2 days. Water is dripping constantly.",
    priority: "medium",
    status: "in-progress",
    createdAt: "2026-01-15",
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Johnson",
    roomNumber: "B-205",
    category: "electrical",
    title: "Light not working",
    description: "The ceiling light in the study area stopped working. Already tried changing the bulb.",
    priority: "low",
    status: "open",
    createdAt: "2026-01-20",
  },
  {
    id: "3",
    userId: "1",
    userName: "John Smith",
    roomNumber: "A-101",
    category: "furniture",
    title: "Broken chair",
    description: "The desk chair leg is broken and it's wobbling dangerously.",
    priority: "high",
    status: "open",
    createdAt: "2026-01-25",
  },
  {
    id: "4",
    userId: "3",
    userName: "Alex Chen",
    roomNumber: "C-301",
    category: "cleaning",
    title: "Deep cleaning needed",
    description: "The room needs thorough cleaning. Previous occupant left it in poor condition.",
    priority: "medium",
    status: "resolved",
    createdAt: "2026-01-10",
  },
]
