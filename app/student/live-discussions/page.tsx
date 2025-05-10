import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Calendar, Clock, Search, Users, Video, Play, PlusCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

export default function StudentLiveDiscussionsPage() {
  // Mock data for live discussion rooms
  const liveRooms = [
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
    {
      id: 2,
      title: "Java Programming Lab Assistance",
      description: "Live assistance session for the Java programming lab exercises",
      status: "live",
      course: "CS101",
      courseName: "Introduction to Java",
      instructor: "Prof. Tigist Lemma",
      startTime: "Now",
      duration: "90 minutes",
      participants: 12,
      maxParticipants: 25,
      tags: ["Lab", "Java", "Programming"],
    },
  ]

  // Mock data for upcoming discussion rooms
  const upcomingRooms = [
    {
      id: 3,
      title: "Calculus Exam Review Session",
      description: "Comprehensive review of all topics for the upcoming midterm exam",
      status: "upcoming",
      course: "MATH201",
      courseName: "Calculus I",
      instructor: "Dr. Samuel Belete",
      startTime: "Tomorrow, 10:00 AM",
      duration: "120 minutes",
      participants: 0,
      maxParticipants: 50,
      tags: ["Exam Review", "Calculus", "Midterm"],
    },
    {
      id: 4,
      title: "Systems Analysis Case Study Discussion",
      description: "Analysis of real-world case studies in systems analysis and design",
      status: "upcoming",
      course: "IS205",
      courseName: "Systems Analysis & Design",
      instructor: "Dr. Mekdes Mekonnen",
      startTime: "May 12, 2:00 PM",
      duration: "90 minutes",
      participants: 0,
      maxParticipants: 35,
      tags: ["Case Study", "Systems Analysis", "Discussion"],
    },
    {
      id: 5,
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
  ]

  // Mock data for past discussion rooms
  const pastRooms = [
    {
      id: 6,
      title: "Java OOP Concepts Explained",
      description: "Detailed explanation of object-oriented programming concepts in Java",
      status: "past",
      course: "CS101",
      courseName: "Introduction to Java",
      instructor: "Prof. Tigist Lemma",
      startTime: "May 3, 2:00 PM",
      duration: "90 minutes",
      participants: 25,
      maxParticipants: 30,
      tags: ["OOP", "Java", "Programming"],
      recording: true,
    },
    {
      id: 7,
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
      id: 8,
      title: "Systems Analysis Methods Overview",
      description: "Overview of different methods used in systems analysis",
      status: "past",
      course: "IS205",
      courseName: "Systems Analysis & Design",
      instructor: "Dr. Mekdes Mekonnen",
      startTime: "April 28, 2:00 PM",
      duration: "90 minutes",
      participants: 18,
      maxParticipants: 35,
      tags: ["Methods", "Systems Analysis", "Overview"],
      recording: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Discussion Rooms</h1>
          <p className="text-muted-foreground">Join real-time discussions with instructors and peers</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Discussion Room
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search discussions..." className="pl-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter By Course</h3>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="IS301">IS301 - Database Management</SelectItem>
                <SelectItem value="CS101">CS101 - Introduction to Java</SelectItem>
                <SelectItem value="MATH201">MATH201 - Calculus I</SelectItem>
                <SelectItem value="IS205">IS205 - Systems Analysis & Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter By Type</h3>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="lecture">Lecture</SelectItem>
                <SelectItem value="qa">Q&A Session</SelectItem>
                <SelectItem value="workshop">Workshop</SelectItem>
                <SelectItem value="review">Exam Review</SelectItem>
                <SelectItem value="lab">Lab Assistance</SelectItem>
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
              <Button variant="outline" className="w-full justify-start">
                <Video className="mr-2 h-4 w-4 text-purple-500" />
                My Discussions
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
              {liveRooms.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <Video className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No Live Discussions</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      There are no live discussions happening right now. Check back later or view upcoming discussions.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                liveRooms.map((room) => <LiveRoomCard key={room.id} room={room} />)
              )}
            </TabsContent>

            <TabsContent value="upcoming" className="space-y-4">
              {upcomingRooms.map((room) => (
                <UpcomingRoomCard key={room.id} room={room} />
              ))}
            </TabsContent>

            <TabsContent value="past" className="space-y-4">
              {pastRooms.map((room) => (
                <PastRoomCard key={room.id} room={room} />
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Live Room Card Component
function LiveRoomCard({ room }) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-green-500">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-green-500 text-white">LIVE</Badge>
              <CardTitle className="text-lg">
                <Link href={`/student/live-discussions/${room.id}`} className="hover:text-primary transition-colors">
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
          <Button className="bg-green-600 hover:bg-green-700">
            <Video className="mr-2 h-4 w-4" />
            Join Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

// Upcoming Room Card Component
function UpcomingRoomCard({ room }) {
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
            <Button variant="outline">Add to Calendar</Button>
            <Button>Set Reminder</Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

// Past Room Card Component
function PastRoomCard({ room }) {
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
          {room.recording ? (
            <Button>
              <Play className="mr-2 h-4 w-4" />
              Watch Recording
            </Button>
          ) : (
            <Button variant="outline" disabled>
              No Recording Available
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
