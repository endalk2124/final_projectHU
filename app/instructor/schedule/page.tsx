"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Video, FileText, Users, BookOpen, PlusCircle } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function InstructorSchedulePage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedEventType, setSelectedEventType] = useState("all")
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    course: "",
    eventType: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
  })

  // Mock data for schedule events
  const events = [
    {
      id: 1,
      title: "Database Design Lecture",
      description: "Introduction to database design principles and normalization",
      course: "IS301",
      courseName: "Database Management",
      eventType: "lecture",
      date: "2025-05-10",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: "Room 201",
    },
    {
      id: 2,
      title: "Database Project Discussion",
      description: "Live session to discuss the final database design project",
      course: "IS301",
      courseName: "Database Management",
      eventType: "discussion",
      date: "2025-05-10",
      startTime: "2:00 PM",
      endTime: "3:00 PM",
      location: "Online",
    },
    {
      id: 3,
      title: "Office Hours",
      description: "Weekly office hours for student consultations",
      course: "Multiple",
      courseName: "All Courses",
      eventType: "office-hours",
      date: "2025-05-10",
      startTime: "4:00 PM",
      endTime: "6:00 PM",
      location: "Office 305",
    },
    {
      id: 4,
      title: "Systems Analysis Lab",
      description: "Practical lab session on systems analysis techniques",
      course: "IS205",
      courseName: "Systems Analysis & Design",
      eventType: "lab",
      date: "2025-05-11",
      startTime: "9:00 AM",
      endTime: "11:00 AM",
      location: "Lab 102",
    },
    {
      id: 5,
      title: "Database Midterm Exam",
      description: "Midterm examination covering all topics discussed so far",
      course: "IS301",
      courseName: "Database Management",
      eventType: "exam",
      date: "2025-05-15",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: "Exam Hall 1",
    },
  ]

  // Filter events based on selected date and filters
  const filteredEvents = events.filter((event) => {
    // Filter by date
    const eventDate = new Date(event.date)
    const selectedDate = date ? new Date(date) : new Date()

    const matchesDate =
      eventDate.getDate() === selectedDate.getDate() &&
      eventDate.getMonth() === selectedDate.getMonth() &&
      eventDate.getFullYear() === selectedDate.getFullYear()

    // Filter by course
    const matchesCourse = selectedCourse === "all" || event.course === selectedCourse

    // Filter by event type
    const matchesEventType = selectedEventType === "all" || event.eventType === selectedEventType

    return matchesDate && matchesCourse && matchesEventType
  })

  // Group events by time for the day view
  const groupedEvents = filteredEvents.reduce((acc, event) => {
    const timeKey = `${event.startTime} - ${event.endTime}`
    if (!acc[timeKey]) {
      acc[timeKey] = []
    }
    acc[timeKey].push(event)
    return acc
  }, {})

  // Handle event creation
  const handleCreateEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.course ||
      !newEvent.eventType ||
      !newEvent.date ||
      !newEvent.startTime ||
      !newEvent.endTime
    ) {
      alert("Please fill in all required fields")
      return
    }

    console.log("New event created:", newEvent)

    // In a real app, you would add the event to the database
    // For now, we'll just reset the form
    setNewEvent({
      title: "",
      description: "",
      course: "",
      eventType: "",
      date: "",
      startTime: "",
      endTime: "",
      location: "",
    })
  }

  // Get event type icon
  const getEventTypeIcon = (type) => {
    switch (type) {
      case "lecture":
        return <BookOpen className="h-4 w-4" />
      case "discussion":
        return <Video className="h-4 w-4" />
      case "lab":
        return <FileText className="h-4 w-4" />
      case "exam":
        return <FileText className="h-4 w-4" />
      case "office-hours":
        return <Users className="h-4 w-4" />
      default:
        return <CalendarIcon className="h-4 w-4" />
    }
  }

  // Get event type color
  const getEventTypeColor = (type) => {
    switch (type) {
      case "lecture":
        return "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
      case "discussion":
        return "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
      case "lab":
        return "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
      case "exam":
        return "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
      case "office-hours":
        return "bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400"
      default:
        return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground">Manage your teaching schedule and academic events</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Create a new event in your teaching schedule.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Enter event description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={newEvent.course}
                    onValueChange={(value) => setNewEvent({ ...newEvent, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="IS301">IS301 - Database Management</SelectItem>
                      <SelectItem value="IS205">IS205 - Systems Analysis & Design</SelectItem>
                      <SelectItem value="Multiple">Multiple Courses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eventType">Event Type</Label>
                  <Select
                    value={newEvent.eventType}
                    onValueChange={(value) => setNewEvent({ ...newEvent, eventType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lecture">Lecture</SelectItem>
                      <SelectItem value="discussion">Discussion</SelectItem>
                      <SelectItem value="lab">Lab</SelectItem>
                      <SelectItem value="exam">Exam</SelectItem>
                      <SelectItem value="office-hours">Office Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="startTime">Start Time</Label>
                  <Input
                    id="startTime"
                    type="time"
                    value={newEvent.startTime}
                    onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="endTime">End Time</Label>
                  <Input
                    id="endTime"
                    type="time"
                    value={newEvent.endTime}
                    onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={newEvent.location}
                  onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                  placeholder="e.g., Room 201, Lab 102, Online"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setNewEvent({
                    title: "",
                    description: "",
                    course: "",
                    eventType: "",
                    date: "",
                    startTime: "",
                    endTime: "",
                    location: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button onClick={handleCreateEvent} className="bg-emerald-600 hover:bg-emerald-700">
                Add Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-auto">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view events</CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <div className="w-full">
                <Label htmlFor="course-filter">Filter by Course</Label>
                <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="IS301">IS301 - Database Management</SelectItem>
                    <SelectItem value="IS205">IS205 - Systems Analysis & Design</SelectItem>
                    <SelectItem value="Multiple">Multiple Courses</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label htmlFor="event-type-filter">Filter by Event Type</Label>
                <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="All Event Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Event Types</SelectItem>
                    <SelectItem value="lecture">Lectures</SelectItem>
                    <SelectItem value="discussion">Discussions</SelectItem>
                    <SelectItem value="lab">Labs</SelectItem>
                    <SelectItem value="exam">Exams</SelectItem>
                    <SelectItem value="office-hours">Office Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardFooter>
          </Card>
        </div>

        <div className="flex-1">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Events for {date ? format(date, "EEEE, MMMM do, yyyy") : "Today"}</CardTitle>
              <CardDescription>
                {filteredEvents.length} event{filteredEvents.length !== 1 ? "s" : ""} scheduled
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="day">
                <TabsList className="mb-4">
                  <TabsTrigger value="day">Day View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>

                <TabsContent value="day" className="space-y-6">
                  {Object.keys(groupedEvents).length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No events scheduled</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are no events scheduled for this day. Click "Add Event" to create one.
                      </p>
                    </div>
                  ) : (
                    Object.entries(groupedEvents)
                      .sort(([timeA], [timeB]) => {
                        // Sort by start time
                        const startTimeA = timeA.split(" - ")[0]
                        const startTimeB = timeB.split(" - ")[0]
                        return startTimeA.localeCompare(startTimeB)
                      })
                      .map(([time, timeEvents]) => (
                        <div key={time} className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <h3 className="font-medium">{time}</h3>
                          </div>
                          <div className="pl-6 space-y-2">
                            {timeEvents.map((event) => (
                              <Card key={event.id} className="overflow-hidden">
                                <div className="flex">
                                  <div className={`w-2 ${getEventTypeColor(event.eventType).split(" ")[0]}`} />
                                  <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                      <div>
                                        <h4 className="font-medium">{event.title}</h4>
                                        <p className="text-sm text-muted-foreground">{event.description}</p>
                                      </div>
                                      <Badge variant="outline" className="ml-2">
                                        {event.location}
                                      </Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      <Badge variant="secondary" className="font-normal">
                                        {event.course}
                                      </Badge>
                                      <Badge
                                        className={`flex items-center gap-1 ${getEventTypeColor(event.eventType)}`}
                                      >
                                        {getEventTypeIcon(event.eventType)}
                                        <span className="capitalize">{event.eventType.replace("-", " ")}</span>
                                      </Badge>
                                    </div>
                                  </CardContent>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      ))
                  )}
                </TabsContent>

                <TabsContent value="list" className="space-y-4">
                  {filteredEvents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <CalendarIcon className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No events scheduled</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        There are no events scheduled for this day. Click "Add Event" to create one.
                      </p>
                    </div>
                  ) : (
                    filteredEvents
                      .sort((a, b) => {
                        // Sort by start time
                        return a.startTime.localeCompare(b.startTime)
                      })
                      .map((event) => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className="flex">
                            <div className={`w-2 ${getEventTypeColor(event.eventType).split(" ")[0]}`} />
                            <div className="flex-1">
                              <CardHeader className="pb-2">
                                <div className="flex justify-between">
                                  <CardTitle className="text-lg">{event.title}</CardTitle>
                                  <Badge variant="outline">{event.location}</Badge>
                                </div>
                                <CardDescription>{event.description}</CardDescription>
                              </CardHeader>
                              <CardContent className="pb-2">
                                <div className="flex flex-wrap gap-2 mb-2">
                                  <Badge variant="secondary" className="font-normal">
                                    {event.course}
                                  </Badge>
                                  <Badge className={`flex items-center gap-1 ${getEventTypeColor(event.eventType)}`}>
                                    {getEventTypeIcon(event.eventType)}
                                    <span className="capitalize">{event.eventType.replace("-", " ")}</span>
                                  </Badge>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="mr-1 h-4 w-4" />
                                  <span>
                                    {event.startTime} - {event.endTime}
                                  </span>
                                </div>
                              </CardContent>
                              <CardFooter className="pt-2 border-t">
                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm">
                                    Edit
                                  </Button>
                                  <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                                    Delete
                                  </Button>
                                </div>
                              </CardFooter>
                            </div>
                          </div>
                        </Card>
                      ))
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
