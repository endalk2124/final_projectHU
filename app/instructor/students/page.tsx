"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Phone, BookOpen, BarChart, FileText, MessageSquare, User, Download, Eye } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function InstructorStudentsPage() {
  // Mock data for students
  const students = [
    {
      id: 1,
      name: "Abebe Kebede",
      email: "abebe@example.com",
      phone: "+251912345678",
      department: "Information Systems",
      year: 3,
      courses: [
        { id: "IS301", name: "Database Management", progress: 75, grade: "A-" },
        { id: "IS205", name: "Systems Analysis & Design", progress: 60, grade: "B+" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Tigist Hailu",
      email: "tigist@example.com",
      phone: "+251923456789",
      department: "Information Systems",
      year: 3,
      courses: [
        { id: "IS301", name: "Database Management", progress: 85, grade: "A" },
        { id: "IS205", name: "Systems Analysis & Design", progress: 70, grade: "B" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Dawit Mekonnen",
      email: "dawit@example.com",
      phone: "+251934567890",
      department: "Information Systems",
      year: 3,
      courses: [
        { id: "IS301", name: "Database Management", progress: 65, grade: "B" },
        { id: "IS205", name: "Systems Analysis & Design", progress: 80, grade: "A-" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Sara Tesfaye",
      email: "sara@example.com",
      phone: "+251945678901",
      department: "Information Systems",
      year: 3,
      courses: [
        { id: "IS301", name: "Database Management", progress: 90, grade: "A" },
        { id: "IS205", name: "Systems Analysis & Design", progress: 85, grade: "A" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 5,
      name: "Yonas Tadesse",
      email: "yonas@example.com",
      phone: "+251956789012",
      department: "Information Systems",
      year: 3,
      courses: [
        { id: "IS301", name: "Database Management", progress: 55, grade: "C+" },
        { id: "IS205", name: "Systems Analysis & Design", progress: 65, grade: "B-" },
      ],
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedYear, setSelectedYear] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState(null)

  // Filter students based on search query and filters
  const filteredStudents = students.filter((student) => {
    // Filter by search query
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by course
    const matchesCourse = selectedCourse === "all" || student.courses.some((course) => course.id === selectedCourse)

    // Filter by year
    const matchesYear = selectedYear === "all" || student.year.toString() === selectedYear

    return matchesSearch && matchesCourse && matchesYear
  })

  // Calculate course statistics
  const getCourseStats = (courseId) => {
    const courseStudents = students.filter((student) => student.courses.some((course) => course.id === courseId))

    if (courseStudents.length === 0) return { avgProgress: 0, avgGrade: "N/A" }

    const courseData = courseStudents.map((student) => student.courses.find((course) => course.id === courseId))

    const totalProgress = courseData.reduce((sum, course) => sum + course.progress, 0)
    const avgProgress = totalProgress / courseData.length

    // Simple grade average calculation (not perfect but illustrative)
    const gradePoints = {
      A: 4.0,
      "A-": 3.7,
      "B+": 3.3,
      B: 3.0,
      "B-": 2.7,
      "C+": 2.3,
      C: 2.0,
      "C-": 1.7,
      "D+": 1.3,
      D: 1.0,
      F: 0,
    }

    const totalGradePoints = courseData.reduce((sum, course) => {
      return sum + (gradePoints[course.grade] || 0)
    }, 0)

    const avgGradePoint = totalGradePoints / courseData.length
    let avgGrade = "N/A"

    if (avgGradePoint >= 3.7) avgGrade = "A"
    else if (avgGradePoint >= 3.3) avgGrade = "A-"
    else if (avgGradePoint >= 3.0) avgGrade = "B+"
    else if (avgGradePoint >= 2.7) avgGrade = "B"
    else if (avgGradePoint >= 2.3) avgGrade = "B-"
    else if (avgGradePoint >= 2.0) avgGrade = "C+"
    else if (avgGradePoint >= 1.7) avgGrade = "C"
    else if (avgGradePoint >= 1.3) avgGrade = "C-"
    else if (avgGradePoint >= 1.0) avgGrade = "D"
    else avgGrade = "F"

    return { avgProgress, avgGrade }
  }

  const is301Stats = getCourseStats("IS301")
  const is205Stats = getCourseStats("IS205")

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">Manage and monitor your students' progress</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
          <Button>
            <Mail className="mr-2 h-4 w-4" />
            Email All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{students.length}</div>
            <p className="text-xs text-muted-foreground">Enrolled in your courses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">IS301 Average</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{is301Stats.avgGrade}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Average progress</p>
              <Progress value={is301Stats.avgProgress} className="h-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">IS205 Average</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{is205Stats.avgGrade}</div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Average progress</p>
              <Progress value={is205Stats.avgProgress} className="h-1" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Across all courses</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search students..."
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

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter By Year</h3>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="1">Year 1</SelectItem>
                <SelectItem value="2">Year 2</SelectItem>
                <SelectItem value="3">Year 3</SelectItem>
                <SelectItem value="4">Year 4</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Quick Filters</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                All Students
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4 text-green-500" />
                High Performers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BarChart className="mr-2 h-4 w-4 text-red-500" />
                Needs Attention
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4 text-blue-500" />
                Assignment Pending
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="list">
            <TabsList className="mb-4">
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="table">Table View</TabsTrigger>
              <TabsTrigger value="progress">Progress View</TabsTrigger>
            </TabsList>

            <TabsContent value="list" className="space-y-4">
              {filteredStudents.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <User className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No students found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredStudents.map((student) => (
                  <Card key={student.id} className="overflow-hidden">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex items-center gap-4 p-4 md:w-1/3 border-b md:border-b-0 md:border-r">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                            <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{student.name}</h3>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Mail className="mr-1 h-3 w-3" />
                              <span>{student.email}</span>
                            </div>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Phone className="mr-1 h-3 w-3" />
                              <span>{student.phone}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1 p-4">
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge variant="secondary" className="font-normal">
                              {student.department}
                            </Badge>
                            <Badge variant="outline" className="font-normal">
                              Year {student.year}
                            </Badge>
                          </div>

                          <div className="space-y-3">
                            {student.courses.map((course) => (
                              <div key={course.id} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                  <span>
                                    {course.id} - {course.name}
                                  </span>
                                  <span className="font-medium">
                                    {course.grade} ({course.progress}%)
                                  </span>
                                </div>
                                <Progress value={course.progress} className="h-1" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="border-t p-4 flex justify-between">
                      <div className="text-sm text-muted-foreground">
                        Student ID: {student.id.toString().padStart(6, "0")}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => setSelectedStudent(student)}>
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="mr-1 h-4 w-4" />
                          Contact
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </TabsContent>

            <TabsContent value="table">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead>Year</TableHead>
                        <TableHead>IS301</TableHead>
                        <TableHead>IS205</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredStudents.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8">
                            <div className="flex flex-col items-center justify-center">
                              <User className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="text-sm text-muted-foreground">No students found</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredStudents.map((student) => (
                          <TableRow key={student.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                  <div className="text-xs text-muted-foreground">{student.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{student.department}</TableCell>
                            <TableCell>Year {student.year}</TableCell>
                            <TableCell>{student.courses.find((c) => c.id === "IS301")?.grade || "N/A"}</TableCell>
                            <TableCell>{student.courses.find((c) => c.id === "IS205")?.grade || "N/A"}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm" onClick={() => setSelectedStudent(student)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Mail className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress Overview</CardTitle>
                  <CardDescription>Visual representation of student progress in each course</CardDescription>
                </CardHeader>
                <CardContent>
                  {filteredStudents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <User className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No students found</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-4">IS301 - Database Management</h3>
                        <div className="space-y-4">
                          {filteredStudents
                            .filter((student) => student.courses.some((c) => c.id === "IS301"))
                            .sort((a, b) => {
                              const courseA = a.courses.find((c) => c.id === "IS301")
                              const courseB = b.courses.find((c) => c.id === "IS301")
                              return (courseB?.progress || 0) - (courseA?.progress || 0)
                            })
                            .map((student) => {
                              const course = student.courses.find((c) => c.id === "IS301")
                              return (
                                <div key={student.id} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span>{student.name}</span>
                                    </div>
                                    <span className="font-medium">
                                      {course?.grade} ({course?.progress}%)
                                    </span>
                                  </div>
                                  <Progress value={course?.progress} className="h-2" />
                                </div>
                              )
                            })}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-medium mb-4">IS205 - Systems Analysis & Design</h3>
                        <div className="space-y-4">
                          {filteredStudents
                            .filter((student) => student.courses.some((c) => c.id === "IS205"))
                            .sort((a, b) => {
                              const courseA = a.courses.find((c) => c.id === "IS205")
                              const courseB = b.courses.find((c) => c.id === "IS205")
                              return (courseB?.progress || 0) - (courseA?.progress || 0)
                            })
                            .map((student) => {
                              const course = student.courses.find((c) => c.id === "IS205")
                              return (
                                <div key={student.id} className="space-y-1">
                                  <div className="flex justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage src={student.avatar || "/placeholder.svg"} alt={student.name} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <span>{student.name}</span>
                                    </div>
                                    <span className="font-medium">
                                      {course?.grade} ({course?.progress}%)
                                    </span>
                                  </div>
                                  <Progress value={course?.progress} className="h-2" />
                                </div>
                              )
                            })}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Student Details Dialog */}
      {selectedStudent && (
        <Dialog open={!!selectedStudent} onOpenChange={() => setSelectedStudent(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
              <DialogDescription>Comprehensive information about the student</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedStudent.avatar || "/placeholder.svg"} alt={selectedStudent.name} />
                  <AvatarFallback>{selectedStudent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-xl font-bold">{selectedStudent.name}</h2>
                  <p className="text-muted-foreground">Student ID: {selectedStudent.id.toString().padStart(6, "0")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Contact Information</h3>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedStudent.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedStudent.phone}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Academic Information</h3>
                  <div className="mt-1 space-y-1">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{selectedStudent.department}</span>
                    </div>
                    <div className="flex items-center">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>Year {selectedStudent.year}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Course Performance</h3>
                <div className="space-y-4">
                  {selectedStudent.courses.map((course) => (
                    <div key={course.id} className="border rounded-md p-3">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-medium">
                          {course.id} - {course.name}
                        </h4>
                        <Badge>{course.grade}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View Full Report
              </Button>
              <Button>
                <Mail className="mr-2 h-4 w-4" />
                Contact Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
