import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { BookOpen, Clock, FileText, MessageSquare, Search, Users } from "lucide-react"

export default function StudentCoursesPage() {
  // Mock data for courses
  const allCourses = [
    {
      id: 1,
      code: "IS301",
      name: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      department: "Information Systems",
      description: "Introduction to database concepts, design principles, and SQL",
      resources: 12,
      discussions: 3,
      students: 45,
      enrolled: true,
      progress: 65,
      nextClass: "Tomorrow, 10:00 AM",
      location: "Room 201",
    },
    {
      id: 2,
      code: "CS101",
      name: "Introduction to Java",
      instructor: "Prof. Tigist Lemma",
      department: "Computer Science",
      description: "Fundamentals of Java programming and object-oriented concepts",
      resources: 15,
      discussions: 4,
      students: 38,
      enrolled: true,
      progress: 80,
      nextClass: "Wednesday, 2:00 PM",
      location: "Lab 102",
    },
    {
      id: 3,
      code: "MATH201",
      name: "Calculus I",
      instructor: "Dr. Samuel Belete",
      department: "Mathematics",
      description: "Introduction to differential and integral calculus",
      resources: 8,
      discussions: 2,
      students: 52,
      enrolled: true,
      progress: 45,
      nextClass: "Friday, 8:30 AM",
      location: "Room 305",
    },
    {
      id: 4,
      code: "IS205",
      name: "Systems Analysis & Design",
      instructor: "Dr. Mekdes Mekonnen",
      department: "Information Systems",
      description: "Methods and techniques for analyzing and designing information systems",
      resources: 10,
      discussions: 2,
      students: 40,
      enrolled: true,
      progress: 60,
      nextClass: "Thursday, 11:00 AM",
      location: "Room 203",
    },
    {
      id: 5,
      code: "IT202",
      name: "Web Development",
      instructor: "Dr. Desta Assefa",
      department: "Information Technology",
      description: "HTML, CSS, JavaScript, and modern web development frameworks",
      resources: 14,
      discussions: 3,
      students: 35,
      enrolled: false,
      progress: 0,
    },
    {
      id: 6,
      code: "IS302",
      name: "Information Systems Security",
      instructor: "Dr. Mekdes Mekonnen",
      department: "Information Systems",
      description: "Principles of information security, cryptography, and network security",
      resources: 10,
      discussions: 2,
      students: 42,
      enrolled: false,
      progress: 0,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
          <p className="text-muted-foreground">Manage your enrolled courses and discover new ones</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search courses..." className="pl-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter By Department</h3>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="is">Information Systems</SelectItem>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="math">Mathematics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sort By</h3>
            <Select defaultValue="name">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Course Name</SelectItem>
                <SelectItem value="code">Course Code</SelectItem>
                <SelectItem value="progress">Progress</SelectItem>
                <SelectItem value="recent">Recently Accessed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Course Status</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                All Courses
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Enrolled Courses
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Available Courses
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Completed Courses
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="enrolled">
            <TabsList className="mb-4">
              <TabsTrigger value="enrolled">Enrolled Courses</TabsTrigger>
              <TabsTrigger value="all">All Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolled" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {allCourses
                  .filter((course) => course.enrolled)
                  .map((course) => (
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
                      <CardContent className="pb-2">
                        <div className="text-sm text-muted-foreground mb-1">Instructor: {course.instructor}</div>
                        <div className="text-sm text-muted-foreground mb-3">Department: {course.department}</div>

                        <div className="space-y-1 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>

                        <div className="flex flex-wrap gap-3 text-sm">
                          <div className="flex items-center">
                            <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{course.resources} resources</span>
                          </div>
                          <div className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{course.discussions} discussions</span>
                          </div>
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                            <span>{course.students} students</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 border-t">
                        <div className="flex justify-between items-center w-full">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="mr-1 h-4 w-4" />
                            <span>Next: {course.nextClass}</span>
                          </div>
                          <Button asChild size="sm">
                            <Link href={`/student/courses/${course.id}`}>View Course</Link>
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {allCourses.map((course) => (
                  <Card key={course.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">{course.name}</CardTitle>
                          <CardDescription>{course.code}</CardDescription>
                        </div>
                        <Badge variant={course.enrolled ? "default" : "outline"} className="font-normal">
                          {course.enrolled ? "Enrolled" : "Available"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm text-muted-foreground mb-1">Instructor: {course.instructor}</div>
                      <div className="text-sm text-muted-foreground mb-3">Department: {course.department}</div>
                      <p className="text-sm mb-3">{course.description}</p>

                      {course.enrolled && (
                        <div className="space-y-1 mb-4">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span className="font-medium">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center">
                          <FileText className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.resources} resources</span>
                        </div>
                        <div className="flex items-center">
                          <MessageSquare className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.discussions} discussions</span>
                        </div>
                        <div className="flex items-center">
                          <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                          <span>{course.students} students</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-2 border-t">
                      {course.enrolled ? (
                        <Button asChild className="w-full">
                          <Link href={`/student/courses/${course.id}`}>View Course</Link>
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full">
                          Request Enrollment
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
