import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, FileText, MessageSquare, Users, Clock, Upload } from "lucide-react"

export default function InstructorDashboard() {
  // Mock user data - in a real app, this would come from authentication
  const user = {
    name: "Dr. Birhanu Ayalew",
    email: "birhanu@example.com",
    role: "instructor",
    department: "Information Systems",
  }

  // Mock data for recent activities
  const recentActivities = [
    { id: 1, type: "resource", title: "Database Design Principles", date: "1 hour ago", course: "IS301" },
    { id: 2, type: "discussion", title: "Created Q&A Forum", date: "Yesterday", course: "IS301" },
    { id: 3, type: "resource", title: "Updated Assignment Guidelines", date: "2 days ago", course: "IS301" },
  ]

  // Mock data for upcoming events
  const upcomingEvents = [
    { id: 1, title: "Real-time Discussion: Database Design", date: "Tomorrow, 2:00 PM", course: "IS301" },
    { id: 2, title: "Assignment Deadline: ER Diagrams", date: "May 15, 11:59 PM", course: "IS301" },
  ]

  // Mock data for courses
  const courses = [
    {
      id: 1,
      code: "IS301",
      name: "Database Management",
      students: 45,
      resources: 12,
      discussions: 3,
    },
    {
      id: 2,
      code: "IS201",
      name: "Systems Analysis & Design",
      students: 38,
      resources: 8,
      discussions: 2,
    },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header user={user} />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Department of {user.department}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Courses</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.length}</div>
              <p className="text-xs text-muted-foreground">Active courses this semester</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.students, 0)}</div>
              <p className="text-xs text-muted-foreground">Enrolled across all courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Resources</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.resources, 0)}</div>
              <p className="text-xs text-muted-foreground">Uploaded learning materials</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Discussions</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courses.reduce((acc, course) => acc + course.discussions, 0)}</div>
              <p className="text-xs text-muted-foreground">Active discussion forums</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Your Courses</CardTitle>
                <CardDescription>Courses you are currently teaching</CardDescription>
              </div>
              <Button asChild>
                <Link href="/instructor/courses/create">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Create Course
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="font-semibold text-emerald-700">{course.code.substring(0, 2)}</span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{course.name}</p>
                        <span className="text-sm text-muted-foreground">{course.code}</span>
                      </div>
                      <div className="flex space-x-4 text-sm">
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.students} students</span>
                        </div>
                        <div className="flex items-center">
                          <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.resources} resources</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.discussions} discussions</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Button asChild variant="outline" className="w-full">
                  <Link href="/instructor/courses">Manage All Courses</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:row-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks for instructors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/instructor/resources/upload">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload New Resource
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/instructor/discussions/create">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Create Discussion Forum
                </Link>
              </Button>
              <Button asChild className="w-full justify-start" variant="outline">
                <Link href="/instructor/discussions/schedule">
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Real-time Discussion
                </Link>
              </Button>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">Upcoming Events</h4>
                <div className="space-y-4">
                  {upcomingEvents.map((event) => (
                    <div key={event.id} className="border-b pb-4 last:border-0">
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-sm text-muted-foreground">{event.course}</p>
                        <p className="text-sm font-medium text-emerald-600">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent interactions with the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                      {activity.type === "resource" ? (
                        <FileText className="h-5 w-5 text-slate-600" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{activity.title}</p>
                        <span className="text-sm text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.type === "resource" ? "Uploaded resource" : "Created discussion"} - {activity.course}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
