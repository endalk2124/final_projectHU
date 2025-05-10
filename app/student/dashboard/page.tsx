import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, Calendar, Clock, FileText, GraduationCap, LayoutDashboard, MessageSquare } from "lucide-react"

export default function StudentDashboard() {
  // Mock data for enrolled courses
  const enrolledCourses = [
    {
      id: 1,
      code: "IS301",
      name: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      progress: 65,
      nextClass: "Tomorrow, 10:00 AM",
      location: "Room 201",
    },
    {
      id: 2,
      code: "CS101",
      name: "Introduction to Java",
      instructor: "Prof. Tigist Lemma",
      progress: 80,
      nextClass: "Wednesday, 2:00 PM",
      location: "Lab 102",
    },
    {
      id: 3,
      code: "MATH201",
      name: "Calculus I",
      instructor: "Dr. Samuel Belete",
      progress: 45,
      nextClass: "Friday, 8:30 AM",
      location: "Room 305",
    },
    {
      id: 4,
      code: "IS205",
      name: "Systems Analysis & Design",
      instructor: "Dr. Mekdes Mekonnen",
      progress: 60,
      nextClass: "Thursday, 11:00 AM",
      location: "Room 203",
    },
  ]

  // Mock data for upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: "Database Design Project Submission",
      course: "IS301",
      date: "May 15, 2024",
      time: "11:59 PM",
      type: "assignment",
    },
    {
      id: 2,
      title: "Java Programming Lab",
      course: "CS101",
      date: "May 10, 2024",
      time: "2:00 PM - 4:00 PM",
      type: "lab",
    },
    {
      id: 3,
      title: "Mid-term Exam",
      course: "MATH201",
      date: "May 20, 2024",
      time: "9:00 AM - 11:00 AM",
      type: "exam",
    },
  ]

  // Mock data for recent activities
  const recentActivities = [
    {
      id: 1,
      title: "Downloaded Database Normalization Notes",
      course: "IS301",
      time: "2 hours ago",
      type: "resource",
    },
    {
      id: 2,
      title: "Submitted Java Assignment #3",
      course: "CS101",
      time: "Yesterday",
      type: "assignment",
    },
    {
      id: 3,
      title: "Participated in 'OOP Concepts' Discussion",
      course: "CS101",
      time: "2 days ago",
      type: "discussion",
    },
    {
      id: 4,
      title: "Viewed Calculus Lecture Recording",
      course: "MATH201",
      time: "3 days ago",
      type: "resource",
    },
  ]

  // Mock data for announcements
  const announcements = [
    {
      id: 1,
      title: "Final Project Guidelines Published",
      course: "IS301",
      date: "May 5, 2024",
      content: "The guidelines for the final database project have been published. Please check the resources section.",
    },
    {
      id: 2,
      title: "Change in Lecture Schedule",
      course: "CS101",
      date: "May 4, 2024",
      content: "The Java Programming lecture scheduled for May 12 has been moved to May 13 due to a faculty meeting.",
    },
    {
      id: 3,
      title: "New Study Materials Available",
      course: "MATH201",
      date: "May 3, 2024",
      content:
        "Additional practice problems for the upcoming mid-term exam have been uploaded to the resources section.",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Endale! Here's what's happening with your courses.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/student/schedule">
              <Calendar className="mr-2 h-4 w-4" />
              View Schedule
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enrolled Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enrolledCourses.length}</div>
            <p className="text-xs text-muted-foreground">Current semester courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">In the next 2 weeks</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Resources</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Across all your courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="courses">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="courses">My Courses</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            {enrolledCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div>
                      <CardTitle className="text-lg">{course.name}</CardTitle>
                      <CardDescription>{course.code}</CardDescription>
                    </div>
                    <Badge variant="outline" className="font-normal">
                      {course.code}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-muted-foreground mb-3">Instructor: {course.instructor}</div>

                  <div className="space-y-1 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-1 h-4 w-4" />
                      <span>Next: {course.nextClass}</span>
                    </div>
                    <Button asChild size="sm">
                      <Link href={`/student/courses/${course.id}`}>View Course</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-center">
            <Button asChild variant="outline">
              <Link href="/student/courses">View All Courses</Link>
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your schedule for the next two weeks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
                  <div className={`p-2 rounded-md ${getEventTypeColor(event.type)}`}>
                    {getEventTypeIcon(event.type)}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{event.title}</h4>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mt-1">
                      <Badge variant="outline">{event.course}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="mr-1 h-3 w-3" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/student/schedule">View Full Schedule</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
              <CardDescription>Latest updates from your courses</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="pb-4 border-b last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium">{announcement.title}</h4>
                    <Badge variant="outline">{announcement.course}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{announcement.content}</p>
                  <div className="text-xs text-muted-foreground">Posted on {announcement.date}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions with the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex">
                    <div className="relative mr-4">
                      <div
                        className={`absolute top-0 left-0 w-8 h-8 rounded-full flex items-center justify-center ${getActivityTypeColor(activity.type)}`}
                      >
                        {getActivityTypeIcon(activity.type)}
                      </div>
                      {activity.id !== recentActivities.length && (
                        <div className="absolute top-8 bottom-0 left-4 w-px bg-border"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-8 last:pb-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <Badge variant="outline">{activity.course}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Helper functions for event types
function getEventTypeColor(type) {
  switch (type) {
    case "assignment":
      return "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
    case "exam":
      return "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
    case "lab":
      return "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  }
}

function getEventTypeIcon(type) {
  switch (type) {
    case "assignment":
      return <FileText className="h-4 w-4" />
    case "exam":
      return <GraduationCap className="h-4 w-4" />
    case "lab":
      return <LayoutDashboard className="h-4 w-4" />
    default:
      return <Calendar className="h-4 w-4" />
  }
}

// Helper functions for activity types
function getActivityTypeColor(type) {
  switch (type) {
    case "resource":
      return "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400"
    case "assignment":
      return "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
    case "discussion":
      return "bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-400"
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
  }
}

function getActivityTypeIcon(type) {
  switch (type) {
    case "resource":
      return <FileText className="h-4 w-4" />
    case "assignment":
      return <FileText className="h-4 w-4" />
    case "discussion":
      return <MessageSquare className="h-4 w-4" />
    default:
      return <Clock className="h-4 w-4" />
  }
}
