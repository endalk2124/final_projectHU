"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, Clock, Search, Users, Video, Play, PlusCircle, Trash2, Edit } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function InstructorLiveDiscussionsPage() {
  // Mock data for live discussion rooms
  const [liveRooms, setLiveRooms] = useState([
    {
      id: 1,
      title: "Database Design Project Discussion",
      description: "Live session to discuss the final database design project requirements and answer questions",
      status: "live",
      course: "IS301",
      courseName: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      startTime: "Now",
      duration: "60 minutes",
      participants: 18,
      maxParticipants: 30,
      tags: ["Project", "Database Design", "Q&A"],
    },
  ])

  // Mock data for upcoming discussion rooms
  const [upcomingRooms, setUpcomingRooms] = useState([
    {
      id: 3,
      title: "Database Normalization Workshop",
      description: "Hands-on workshop on database normalization techniques",
      status: "upcoming",
      course: "IS301",
      courseName: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      startTime: "May 15, 11:00 AM",
      duration: "120 minutes",
      participants: 0,
      maxParticipants: 30,
      tags: ["Workshop", "Normalization", "Database"],
    },
  ])

  // Mock data for past discussion rooms
  const [pastRooms, setPastRooms] = useState([
    {
      id: 6,
      title: "SQL Query Optimization Techniques",
      description: "Advanced techniques for optimizing SQL queries for better performance",
      status: "past",
      course: "IS301",
      courseName: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      startTime: "May 1, 10:00 AM",
      duration: "60 minutes",
      participants: 22,
      maxParticipants: 30,
      tags: ["SQL", "Optimization", "Performance"],
      recording: true,
    },
    {
      id: 7,
      title: "Systems Analysis Methods Overview",
      description: "Overview of different methods used in systems analysis",
      status: "past",
      course: "IS205",
      courseName: "Systems Analysis & Design",
      instructor: "Dr. Birhanu Ayalew",
      startTime: "April 28, 2:00 PM",
      duration: "90 minutes",
      participants: 18,
      maxParticipants: 35,
      tags: ["Methods", "Systems Analysis", "Overview"],
      recording: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [newRoom, setNewRoom] = useState({
    title: "",
    description: "",
    course: "",
    startDate: "",
    startTime: "",
    duration: "",
    maxParticipants: "30",
    tags: "",
  })

  // Filter rooms based on search query and filters
  const filterRooms = (rooms) => {
    return rooms.filter((room) => {
      // Filter by search query
      const matchesSearch =
        room.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.description.toLowerCase().includes(searchQuery.toLowerCase())

      // Filter by course
      const matchesCourse = selectedCourse === "all" || room.course === selectedCourse

      return matchesSearch && matchesCourse
    })
  }

  const filteredLiveRooms = filterRooms(liveRooms)
  const filteredUpcomingRooms = filterRooms(upcomingRooms)
  const filteredPastRooms = filterRooms(pastRooms)

  // Handle room creation
  const handleCreateRoom = () => {
    if (
      !newRoom.title ||
      !newRoom.description ||
      !newRoom.course ||
      !newRoom.startDate ||
      !newRoom.startTime ||
      !newRoom.duration ||
      !newRoom.maxParticipants
    ) {
      alert("Please fill in all required fields")
      return
    }

    const tagsArray = newRoom.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    const newRoomObj = {
      id: Math.max(...[...liveRooms, ...upcomingRooms, ...pastRooms].map((room) => room.id)) + 1,
      title: newRoom.title,
      description: newRoom.description,
      status: "upcoming",
      course: newRoom.course,
      courseName: newRoom.course === "IS301" ? "Database Management" : "Systems Analysis & Design",
      instructor: "Dr. Birhanu Ayalew",
      startTime: `${newRoom.startDate}, ${newRoom.startTime}`,
      duration: `${newRoom.duration} minutes`,
      participants: 0,
      maxParticipants: Number.parseInt(newRoom.maxParticipants),
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
    }

    setUpcomingRooms([newRoomObj, ...upcomingRooms])
    setNewRoom({
      title: "",
      description: "",
      course: "",
      startDate: "",
      startTime: "",
      duration: "",
      maxParticipants: "30",
      tags: "",
    })
  }

  // Handle room deletion
  const handleDeleteRoom = (id: number, status: string) => {
    if (confirm("Are you sure you want to delete this discussion room?")) {
      if (status === "live") {
        setLiveRooms(liveRooms.filter((room) => room.id !== id))
      } else if (status === "upcoming") {
        setUpcomingRooms(upcomingRooms.filter((room) => room.id !== id))
      } else if (status === "past") {
        setPastRooms(pastRooms.filter((room) => room.id !== id))
      }
    }
  }

  // Handle starting a scheduled room
  const handleStartRoom = (id: number) => {
    const roomToStart = upcomingRooms.find((room) => room.id === id)
    if (roomToStart) {
      const newLiveRoom = {
        ...roomToStart,
        status: "live",
        startTime: "Now",
        participants: 1,
      }
      setLiveRooms([...liveRooms, newLiveRoom])
      setUpcomingRooms(upcomingRooms.filter((room) => room.id !== id))
    }
  }

  // Handle ending a live room
  const handleEndRoom = (id: number) => {
    const roomToEnd = liveRooms.find((room) => room.id === id)
    if (roomToEnd) {
      const newPastRoom = {
        ...roomToEnd,
        status: "past",
        startTime:
          new Date().toLocaleDateString() +
          ", " +
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        recording: true,
      }
      setPastRooms([newPastRoom, ...pastRooms])
      setLiveRooms(liveRooms.filter((room) => room.id !== id))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Discussion Rooms</h1>
          <p className="text-muted-foreground">Create and manage real-time discussion sessions with your students</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Schedule Discussion
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Schedule New Discussion</DialogTitle>
              <DialogDescription>Create a new live discussion session for your students.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Discussion Title</Label>
                <Input
                  id="title"
                  value={newRoom.title}
                  onChange={(e) => setNewRoom({ ...newRoom, title: e.target.value })}
                  placeholder="Enter discussion title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newRoom.description}
                  onChange={(e) => setNewRoom({ ...newRoom, description: e.target.value })}
                  placeholder="Enter discussion description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select value={newRoom.course} onValueChange={(value) => setNewRoom({ ...newRoom, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IS301">IS301 - Database Management</SelectItem>
                    <SelectItem value="IS205">IS205 - Systems Analysis & Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startDate">Date</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={newRoom.startDate}
                    onChange={(e) => setNewRoom({ ...newRoom, startDate: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newRoom.startTime}
                    onChange={(e) => setNewRoom({ ...newRoom, startTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration (minutes)</Label>
                  <Input
                    id="duration"
                    type="number"
                    min="15"
                    step="15"
                    value={newRoom.duration}
                    onChange={(e) => setNewRoom({ ...newRoom, duration: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="maxParticipants">Max Participants</Label>
                  <Input
                    id="maxParticipants"
                    type="number"
                    min="5"
                    value={newRoom.maxParticipants}
                    onChange={(e) => setNewRoom({ ...newRoom, maxParticipants: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newRoom.tags}
                  onChange={(e) => setNewRoom({ ...newRoom, tags: e.target.value })}
                  placeholder="e.g., Database, SQL, Workshop"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setNewRoom({
                    title: "",
                    description: "",
                    course: "",
                    startDate: "",
                    startTime: "",
                    duration: "",
                    maxParticipants: "30",
                    tags: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button onClick={handleCreateRoom} className="bg-emerald-600 hover:bg-emerald-700">
                Schedule Discussion
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search discussions..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter By Course</h3>
            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
              <SelectTrigger>
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="IS301">IS301 - Database Management</SelectItem>
                <SelectItem value="IS205">IS205 - Systems Analysis & Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Quick Filters</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4" />
                All Discussions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4 text-green-500" />
                Live Now
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4 text-blue-500" />
                Upcoming
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4 text-amber-500" />
                With Recordings
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="live">
            <TabsList className="mb-4">
              <TabsTrigger value="live">Live Now</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="past">Past Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="live" className="space-y-4">
              {filteredLiveRooms.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Live Discussions</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      There are no live discussions happening right now. Start a scheduled discussion or create a new
                      one.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredLiveRooms.map((room) => (
                  <LiveRoomCard
                    key={room.id}
                    room={room}
                    onDelete={() => handleDeleteRoom(room.id, "live")}
                    onEnd={() => handleEndRoom(room.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {filteredUpcomingRooms.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Upcoming Discussions</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      You don't have any upcoming discussions scheduled. Create a new one to get started.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredUpcomingRooms.map((room) => (
                  <UpcomingRoomCard
                    key={room.id}
                    room={room}
                    onDelete={() => handleDeleteRoom(room.id, "upcoming")}
                    onStart={() => handleStartRoom(room.id)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {filteredPastRooms.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Past Discussions</h3>
                    <p className="text-sm text-muted-foreground mt-1">You haven't conducted any discussions yet.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredPastRooms.map((room) => (
                  <PastRoomCard key={room.id} room={room} onDelete={() => handleDeleteRoom(room.id, "past")} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Live Room Card Component
function LiveRoomCard({ room, onDelete, onEnd }) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-green-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-green-500 text-white">LIVE</Badge>
              <CardTitle className="text-lg">
                <Link href={`/instructor/live-discussions/${room.id}`} className="hover:text-primary transition-colors">
                  {room.title}
                </Link>
              </CardTitle>
            </div>
            <CardDescription>{room.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="font-normal">
            {room.course}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {room.courseName}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {room.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>Started: {room.startTime}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>Duration: {room.duration}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between text-sm">
            <span>Participants</span>
            <span className="font-medium">
              {room.participants}/{room.maxParticipants}
            </span>
          </div>
          <Progress value={(room.participants / room.maxParticipants) * 100} className="h-2" />
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt={room.instructor} />
              <AvatarFallback>{room.instructor.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{room.instructor}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/instructor/live-discussions/${room.id}`}>Manage</Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={onEnd}>
              End Session
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

// Upcoming Room Card Component
function UpcomingRoomCard({ room, onDelete, onStart }) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-blue-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">UPCOMING</Badge>
              <CardTitle className="text-lg">{room.title}</CardTitle>
            </div>
            <CardDescription>{room.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="font-normal">
            {room.course}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {room.courseName}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {room.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Starts: {room.startTime}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>Duration: {room.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>Max Participants: {room.maxParticipants}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt={room.instructor} />
              <AvatarFallback>{room.instructor.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{room.instructor}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onStart}>
              Start Now
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

// Past Room Card Component
function PastRoomCard({ room, onDelete }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge variant="outline">PAST</Badge>
              <CardTitle className="text-lg">{room.title}</CardTitle>
            </div>
            <CardDescription>{room.description}</CardDescription>
          </div>
          {room.recording && (
            <Badge variant="secondary" className="font-normal">
              Recording Available
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="font-normal">
            {room.course}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {room.courseName}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {room.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md"
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-4 w-4" />
            <span>Held on: {room.startTime}</span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            <span>Duration: {room.duration}</span>
          </div>
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>
              Participants: {room.participants}/{room.maxParticipants}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt={room.instructor} />
              <AvatarFallback>{room.instructor.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{room.instructor}</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" onClick={onDelete}>
              <Trash2 className="h-4 w-4" />
            </Button>
            {room.recording ? (
              <Button>
                <Play className="mr-2 h-4 w-4" />
                View Recording
              </Button>
            ) : (
              <Button variant="outline" disabled>
                No Recording Available
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
