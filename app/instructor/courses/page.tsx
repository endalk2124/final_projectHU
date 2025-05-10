"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, FileText, MessageSquare, Search, Filter, Users, Edit, Trash2, Plus } from "lucide-react"
import Link from "next/link"
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

export default function InstructorCoursesPage() {
  // Mock user data
  const user = {
    name: "Dr. Birhanu Ayalew",
    email: "birhanu@example.com",
    role: "instructor",
    department: "Information Systems",
  }

  // Mock departments data
  const departments = [
    { id: "is", name: "Information Systems" },
    { id: "cs", name: "Computer Science" },
    { id: "it", name: "Information Technology" },
  ]

  // Mock courses data
  const [courses, setCourses] = useState([
    {
      id: "is301",
      name: "Database Management",
      code: "IS301",
      department: "is",
      description: "Introduction to database concepts, design principles, and SQL",
      students: 45,
      resources: 12,
      discussions: 3,
    },
    {
      id: "is201",
      name: "Systems Analysis & Design",
      code: "IS201",
      department: "is",
      description: "Methods and techniques for analyzing and designing information systems",
      students: 38,
      resources: 8,
      discussions: 2,
    },
  ])

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("")
  const [editingCourse, setEditingCourse] = useState<any>(null)
  const [newCourse, setNewCourse] = useState({
    name: "",
    code: "",
    department: "is", // Default to instructor's department
    description: "",
  })

  // Filter courses based on search query and filters
  const filteredCourses = courses.filter((course) => {
    // Filter by search query
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by department
    const matchesDepartment = selectedDepartment === "" || course.department === selectedDepartment

    return matchesSearch && matchesDepartment
  })

  // Handle course edit
  const handleEdit = (course: any) => {
    setEditingCourse(course)
  }

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editingCourse) return

    // Update the course in the list
    const updatedCourses = courses.map((c) => (c.id === editingCourse.id ? editingCourse : c))
    setCourses(updatedCourses)
    setEditingCourse(null)
  }

  // Handle course delete
  const handleDelete = (courseId: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      const updatedCourses = courses.filter((c) => c.id !== courseId)
      setCourses(updatedCourses)
    }
  }

  // Handle course creation
  const handleCreateCourse = () => {
    if (!newCourse.name || !newCourse.code || !newCourse.department) {
      alert("Please fill in all required fields")
      return
    }

    // Create a new course object
    const newCourseObj = {
      id: newCourse.code.toLowerCase().replace(/\s+/g, ""),
      name: newCourse.name,
      code: newCourse.code,
      department: newCourse.department,
      description: newCourse.description,
      students: 0,
      resources: 0,
      discussions: 0,
    }

    // Add the new course to the list
    setCourses([...courses, newCourseObj])

    // Reset the form
    setNewCourse({
      name: "",
      code: "",
      department: "is",
      description: "",
    })
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header user={user} />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="mr-2 h-4 w-4" />
                Create Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Create New Course</DialogTitle>
                <DialogDescription>Create a new course for your department.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Course Name</Label>
                  <Input
                    id="name"
                    value={newCourse.name}
                    onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                    placeholder="Enter course name"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="code">Course Code</Label>
                  <Input
                    id="code"
                    value={newCourse.code}
                    onChange={(e) => setNewCourse({ ...newCourse, code: e.target.value })}
                    placeholder="Enter course code (e.g., IS301)"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={newCourse.department}
                    onValueChange={(value) => setNewCourse({ ...newCourse, department: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          {dept.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                    placeholder="Enter course description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() =>
                    setNewCourse({
                      name: "",
                      code: "",
                      department: "is",
                      description: "",
                    })
                  }
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateCourse} className="bg-emerald-600 hover:bg-emerald-700">
                  Create
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
            <div className="flex items-center w-full sm:w-auto gap-2">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search courses..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.length === 0 ? (
              <div className="col-span-full">
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No courses found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search or filters to find what you're looking for.
                    </p>
                  </CardContent>
                </Card>
              </div>
            ) : (
              filteredCourses.map((course) => (
                <Card key={course.id} className="overflow-hidden flex flex-col">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{course.name}</CardTitle>
                        <CardDescription>{course.code}</CardDescription>
                      </div>
                      <div className="flex gap-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[525px]">
                            <DialogHeader>
                              <DialogTitle>Edit Course</DialogTitle>
                              <DialogDescription>Make changes to the course details.</DialogDescription>
                            </DialogHeader>
                            {editingCourse && (
                              <div className="grid gap-4 py-4">
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-name">Course Name</Label>
                                  <Input
                                    id="edit-name"
                                    value={editingCourse.name}
                                    onChange={(e) =>
                                      setEditingCourse({
                                        ...editingCourse,
                                        name: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-code">Course Code</Label>
                                  <Input
                                    id="edit-code"
                                    value={editingCourse.code}
                                    onChange={(e) =>
                                      setEditingCourse({
                                        ...editingCourse,
                                        code: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-department">Department</Label>
                                  <Select
                                    value={editingCourse.department}
                                    onValueChange={(value) =>
                                      setEditingCourse({
                                        ...editingCourse,
                                        department: value,
                                      })
                                    }
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a department" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {departments.map((dept) => (
                                        <SelectItem key={dept.id} value={dept.id}>
                                          {dept.name}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid gap-2">
                                  <Label htmlFor="edit-description">Description</Label>
                                  <Textarea
                                    id="edit-description"
                                    value={editingCourse.description}
                                    onChange={(e) =>
                                      setEditingCourse({
                                        ...editingCourse,
                                        description: e.target.value,
                                      })
                                    }
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setEditingCourse(null)}>
                                Cancel
                              </Button>
                              <Button onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
                                Save Changes
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2 flex-grow">
                    <p className="text-sm text-muted-foreground mb-2">{course.description}</p>
                    <p className="text-sm text-muted-foreground">
                      Department: {departments.find((d) => d.id === course.department)?.name}
                    </p>

                    <div className="flex items-center gap-4 mt-4 text-sm">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{course.students} students</span>
                      </div>
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{course.resources} resources</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 mr-1 text-muted-foreground" />
                        <span>{course.discussions} discussions</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button asChild className="w-full">
                      <Link href={`/instructor/courses/${course.id}`}>Manage Course</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
