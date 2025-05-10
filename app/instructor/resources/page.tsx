"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Search, Filter, Upload, Edit, Trash2, BarChart, Eye } from "lucide-react"
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

export default function InstructorResourcesPage() {
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
  const courses = [
    { id: "is301", name: "Database Management", department: "is" },
    { id: "is201", name: "Systems Analysis & Design", department: "is" },
    { id: "cs101", name: "Introduction to Java", department: "cs" },
    { id: "it202", name: "Web Development", department: "it" },
  ]

  // Mock resources data
  const allResources = [
    {
      id: 1,
      title: "Database Design Principles",
      description: "Comprehensive notes on database design principles and normalization",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-05-01",
      course: "is301",
      department: "is",
      downloads: 45,
    },
    {
      id: 2,
      title: "SQL Basics Tutorial",
      description: "Step-by-step guide to SQL queries and database operations",
      type: "pdf",
      size: "1.8 MB",
      uploadDate: "2024-04-28",
      course: "is301",
      department: "is",
      downloads: 38,
    },
    {
      id: 3,
      title: "Systems Analysis Methods",
      description: "Overview of different methods used in systems analysis",
      type: "pdf",
      size: "3.2 MB",
      uploadDate: "2024-04-22",
      course: "is201",
      department: "is",
      downloads: 29,
    },
    {
      id: 4,
      title: "ER Diagram Examples",
      description: "Examples of Entity-Relationship diagrams for different scenarios",
      type: "pdf",
      size: "1.5 MB",
      uploadDate: "2024-04-15",
      course: "is301",
      department: "is",
      downloads: 42,
    },
  ]

  // State for filters and search
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedDepartment, setSelectedDepartment] = useState("all")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")
  const [resources, setResources] = useState(allResources)
  const [editingResource, setEditingResource] = useState<any>(null)
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    course: "",
    file: null as File | null,
  })

  // Filter resources based on search query and filters
  const filteredResources = resources.filter((resource) => {
    // Filter by search query
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by department
    const matchesDepartment = selectedDepartment === "all" || resource.department === selectedDepartment

    // Filter by course
    const matchesCourse = selectedCourse === "all" || resource.course === selectedCourse

    // Filter by tab (all, recent)
    if (selectedTab === "recent") {
      // Filter for resources uploaded in the last 7 days
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      const uploadDate = new Date(resource.uploadDate)
      return matchesSearch && matchesDepartment && matchesCourse && uploadDate >= sevenDaysAgo
    }

    return matchesSearch && matchesDepartment && matchesCourse
  })

  // Handle course filter change
  const handleCourseChange = (value: string) => {
    setSelectedCourse(value)

    // If a course is selected, automatically set the department
    if (value !== "all") {
      const course = courses.find((c) => c.id === value)
      if (course) {
        setSelectedDepartment(course.department)
      }
    }
  }

  // Handle department filter change
  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value)

    // If the selected course doesn't belong to the new department, reset it
    if (selectedCourse !== "all") {
      const course = courses.find((c) => c.id === selectedCourse)
      if (course && course.department !== value && value !== "all") {
        setSelectedCourse("all")
      }
    }
  }

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewResource({
        ...newResource,
        file: e.target.files[0],
      })
    }
  }

  // Handle resource upload
  const handleUpload = () => {
    if (!newResource.title || !newResource.course || !newResource.file) {
      alert("Please fill in all required fields")
      return
    }

    // In a real app, you would upload the file to a server
    console.log("Uploading resource:", newResource)

    // Create a new resource object
    const course = courses.find((c) => c.id === newResource.course)
    const newResourceObj = {
      id: resources.length + 1,
      title: newResource.title,
      description: newResource.description,
      type: newResource.file.name.split(".").pop() || "unknown",
      size: `${(newResource.file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      course: newResource.course,
      department: course?.department || "",
      downloads: 0,
    }

    // Add the new resource to the list
    setResources([newResourceObj, ...resources])

    // Reset the form
    setNewResource({
      title: "",
      description: "",
      course: "",
      file: null,
    })
  }

  // Handle resource edit
  const handleEdit = (resource: any) => {
    setEditingResource(resource)
  }

  // Handle save edit
  const handleSaveEdit = () => {
    if (!editingResource) return

    // Update the resource in the list
    const updatedResources = resources.map((r) => (r.id === editingResource.id ? editingResource : r))
    setResources(updatedResources)
    setEditingResource(null)
  }

  // Handle resource delete
  const handleDelete = (resourceId: number) => {
    if (confirm("Are you sure you want to delete this resource?")) {
      const updatedResources = resources.filter((r) => r.id !== resourceId)
      setResources(updatedResources)
    }
  }

  // Get course name by ID
  const getCourseNameById = (courseId: string) => {
    const course = courses.find((c) => c.id === courseId)
    return course ? course.name : courseId
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header user={user} />
      <main className="flex-1 container py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Manage Resources</h1>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Upload className="mr-2 h-4 w-4" />
                Upload Resource
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Upload New Resource</DialogTitle>
                <DialogDescription>Upload a new learning resource for your students.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={newResource.title}
                    onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
                    placeholder="Enter resource title"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newResource.description}
                    onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
                    placeholder="Enter resource description"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="course">Course</Label>
                  <Select
                    value={newResource.course}
                    onValueChange={(value) => setNewResource({ ...newResource, course: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a course" />
                    </SelectTrigger>
                    <SelectContent>
                      {courses
                        .filter((course) => course.department === "is") // Filter for instructor's department
                        .map((course) => (
                          <SelectItem key={course.id} value={course.id}>
                            {course.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="file">File</Label>
                  <Input id="file" type="file" onChange={handleFileChange} />
                  <p className="text-xs text-muted-foreground">Supported formats: PDF, DOCX, PPTX, ZIP (Max: 50MB)</p>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() =>
                    setNewResource({
                      title: "",
                      description: "",
                      course: "",
                      file: null,
                    })
                  }
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} className="bg-emerald-600 hover:bg-emerald-700">
                  Upload
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="mb-6">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
              <TabsList>
                <TabsTrigger value="all">All Resources</TabsTrigger>
                <TabsTrigger value="recent">Recently Added</TabsTrigger>
              </TabsList>

              <div className="flex items-center w-full sm:w-auto gap-2">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search resources..."
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
                <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
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
              <div className="w-full sm:w-auto">
                <Select value={selectedCourse} onValueChange={handleCourseChange}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="All Courses" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses
                      .filter(
                        (course) =>
                          !selectedDepartment ||
                          selectedDepartment === "all" ||
                          course.department === selectedDepartment,
                      )
                      .map((course) => (
                        <SelectItem key={course.id} value={course.id}>
                          {course.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-4">
                {filteredResources.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No resources found</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        Try adjusting your search or filters to find what you're looking for.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredResources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex items-center justify-center p-6 bg-slate-100 md:w-24">
                          <FileText className="h-10 w-10 text-slate-600" />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {getCourseNameById(resource.course)}
                                </Badge>
                                <Badge variant="outline" className="text-xs uppercase">
                                  {resource.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{resource.size}</span>
                                <span className="text-xs text-muted-foreground">
                                  Uploaded on {new Date(resource.uploadDate).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Download className="h-3 w-3 mr-1" />
                                  {resource.downloads} downloads
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm">
                                <BarChart className="h-4 w-4 mr-1" />
                                Stats
                              </Button>
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                                    <Edit className="h-4 w-4 mr-1" />
                                    Edit
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[525px]">
                                  <DialogHeader>
                                    <DialogTitle>Edit Resource</DialogTitle>
                                    <DialogDescription>Make changes to the resource details.</DialogDescription>
                                  </DialogHeader>
                                  {editingResource && (
                                    <div className="grid gap-4 py-4">
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-title">Title</Label>
                                        <Input
                                          id="edit-title"
                                          value={editingResource.title}
                                          onChange={(e) =>
                                            setEditingResource({
                                              ...editingResource,
                                              title: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Textarea
                                          id="edit-description"
                                          value={editingResource.description}
                                          onChange={(e) =>
                                            setEditingResource({
                                              ...editingResource,
                                              description: e.target.value,
                                            })
                                          }
                                        />
                                      </div>
                                      <div className="grid gap-2">
                                        <Label htmlFor="edit-course">Course</Label>
                                        <Select
                                          value={editingResource.course}
                                          onValueChange={(value) =>
                                            setEditingResource({
                                              ...editingResource,
                                              course: value,
                                              department:
                                                courses.find((c) => c.id === value)?.department ||
                                                editingResource.department,
                                            })
                                          }
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select a course" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            {courses
                                              .filter((course) => course.department === "is")
                                              .map((course) => (
                                                <SelectItem key={course.id} value={course.id}>
                                                  {course.name}
                                                </SelectItem>
                                              ))}
                                          </SelectContent>
                                        </Select>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button variant="outline" onClick={() => setEditingResource(null)}>
                                      Cancel
                                    </Button>
                                    <Button onClick={handleSaveEdit} className="bg-emerald-600 hover:bg-emerald-700">
                                      Save Changes
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(resource.id)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="recent" className="mt-0">
              <div className="space-y-4">
                {filteredResources.length === 0 ? (
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center py-10">
                      <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium">No recent resources found</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        No resources have been added in the last 7 days.
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredResources.map((resource) => (
                    <Card key={resource.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex items-center justify-center p-6 bg-slate-100 md:w-24">
                          <FileText className="h-10 w-10 text-slate-600" />
                        </div>
                        <CardContent className="flex-1 p-6">
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                            <div>
                              <h3 className="text-lg font-medium">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                              <div className="flex flex-wrap items-center gap-2 mt-2">
                                <Badge variant="outline" className="text-xs">
                                  {getCourseNameById(resource.course)}
                                </Badge>
                                <Badge variant="outline" className="text-xs uppercase">
                                  {resource.type}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{resource.size}</span>
                                <span className="text-xs text-muted-foreground">
                                  Uploaded on {new Date(resource.uploadDate).toLocaleDateString()}
                                </span>
                                <span className="text-xs text-muted-foreground flex items-center">
                                  <Download className="h-3 w-3 mr-1" />
                                  {resource.downloads} downloads
                                </span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                Preview
                              </Button>
                              <Button variant="outline" size="sm">
                                <BarChart className="h-4 w-4 mr-1" />
                                Stats
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleEdit(resource)}>
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDelete(resource.id)}>
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
