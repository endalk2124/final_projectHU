"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Clock, MessageCircle, MessageSquare, PlusCircle, Search, Tag, ThumbsUp, Users, Trash2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

export default function InstructorForumsPage() {
  // Mock data for discussion forums
  const [forums, setForums] = useState([
    {
      id: 1,
      title: "Database Normalization Concepts",
      description: "Discussion about the different normal forms and when to use them",
      category: "Technical Discussion",
      course: "IS301",
      courseName: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      participants: 24,
      replies: 18,
      views: 156,
      lastActivity: "2 hours ago",
      tags: ["Normalization", "Database Design", "SQL"],
      pinned: true,
      unread: true,
    },
    {
      id: 2,
      title: "Java OOP Principles - Assignment Help",
      description: "Questions and clarifications about the OOP assignment due next week",
      category: "Assignment Help",
      course: "CS101",
      courseName: "Introduction to Java",
      instructor: "Prof. Tigist Lemma",
      participants: 32,
      replies: 27,
      views: 203,
      lastActivity: "4 hours ago",
      tags: ["Java", "OOP", "Assignment"],
      pinned: false,
      unread: true,
    },
    {
      id: 3,
      title: "Mid-term Exam Preparation",
      description: "Discussion about study strategies and important topics for the upcoming exams",
      category: "Exam Preparation",
      course: "IS301",
      courseName: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      participants: 45,
      replies: 38,
      views: 312,
      lastActivity: "1 day ago",
      tags: ["Exams", "Study Tips", "Preparation"],
      pinned: true,
      unread: true,
    },
    {
      id: 4,
      title: "Career Opportunities in Database Administration",
      description: "Discussion about career paths and job opportunities in database administration",
      category: "Career Discussion",
      course: "IS301",
      courseName: "Database Management",
      instructor: "Dr. Birhanu Ayalew",
      participants: 20,
      replies: 15,
      views: 128,
      lastActivity: "3 days ago",
      tags: ["Career", "Database", "Jobs"],
      pinned: false,
      unread: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCourse, setSelectedCourse] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newForum, setNewForum] = useState({
    title: "",
    description: "",
    course: "",
    category: "",
    tags: "",
  })

  // Filter forums based on search query and filters
  const filteredForums = forums.filter((forum) => {
    // Filter by search query
    const matchesSearch =
      forum.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      forum.description.toLowerCase().includes(searchQuery.toLowerCase())

    // Filter by course
    const matchesCourse = selectedCourse === "all" || forum.course === selectedCourse

    // Filter by category
    const matchesCategory = selectedCategory === "all" || forum.category === selectedCategory

    return matchesSearch && matchesCourse && matchesCategory
  })

  // Handle forum creation
  const handleCreateForum = () => {
    if (!newForum.title || !newForum.description || !newForum.course || !newForum.category) {
      alert("Please fill in all required fields")
      return
    }

    const tagsArray = newForum.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "")

    const newForumObj = {
      id: forums.length + 1,
      title: newForum.title,
      description: newForum.description,
      category: newForum.category,
      course: newForum.course,
      courseName: newForum.course === "IS301" ? "Database Management" : "Introduction to Java",
      instructor: "Dr. Birhanu Ayalew",
      participants: 0,
      replies: 0,
      views: 0,
      lastActivity: "Just now",
      tags: tagsArray.length > 0 ? tagsArray : ["General"],
      pinned: false,
      unread: false,
    }

    setForums([newForumObj, ...forums])
    setNewForum({
      title: "",
      description: "",
      course: "",
      category: "",
      tags: "",
    })
  }

  // Handle forum deletion
  const handleDeleteForum = (id: number) => {
    if (confirm("Are you sure you want to delete this forum?")) {
      setForums(forums.filter((forum) => forum.id !== id))
    }
  }

  // Handle forum pin/unpin
  const handleTogglePin = (id: number) => {
    setForums(forums.map((forum) => (forum.id === id ? { ...forum, pinned: !forum.pinned } : forum)))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussion Forums</h1>
          <p className="text-muted-foreground">Create and manage discussion forums for your courses</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Forum
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Create New Discussion Forum</DialogTitle>
              <DialogDescription>Create a new forum for your students to discuss course topics.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Forum Title</Label>
                <Input
                  id="title"
                  value={newForum.title}
                  onChange={(e) => setNewForum({ ...newForum, title: e.target.value })}
                  placeholder="Enter forum title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newForum.description}
                  onChange={(e) => setNewForum({ ...newForum, description: e.target.value })}
                  placeholder="Enter forum description"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="course">Course</Label>
                <Select value={newForum.course} onValueChange={(value) => setNewForum({ ...newForum, course: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IS301">IS301 - Database Management</SelectItem>
                    <SelectItem value="CS101">CS101 - Introduction to Java</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newForum.category}
                  onValueChange={(value) => setNewForum({ ...newForum, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical Discussion">Technical Discussion</SelectItem>
                    <SelectItem value="Assignment Help">Assignment Help</SelectItem>
                    <SelectItem value="Exam Preparation">Exam Preparation</SelectItem>
                    <SelectItem value="Career Discussion">Career Discussion</SelectItem>
                    <SelectItem value="General">General</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={newForum.tags}
                  onChange={(e) => setNewForum({ ...newForum, tags: e.target.value })}
                  placeholder="e.g., Database, SQL, Normalization"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() =>
                  setNewForum({
                    title: "",
                    description: "",
                    course: "",
                    category: "",
                    tags: "",
                  })
                }
              >
                Cancel
              </Button>
              <Button onClick={handleCreateForum} className="bg-emerald-600 hover:bg-emerald-700">
                Create Forum
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
              placeholder="Search forums..."
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
                <SelectItem value="CS101">CS101 - Introduction to Java</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Filter By Category</h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Technical Discussion">Technical Discussion</SelectItem>
                <SelectItem value="Assignment Help">Assignment Help</SelectItem>
                <SelectItem value="Exam Preparation">Exam Preparation</SelectItem>
                <SelectItem value="Career Discussion">Career Discussion</SelectItem>
                <SelectItem value="General">General</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Quick Filters</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                All Forums
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-amber-500" />
                Pinned Forums
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                Active Forums
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                My Forums
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Forums</TabsTrigger>
              <TabsTrigger value="pinned">Pinned Forums</TabsTrigger>
              <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredForums.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No forums found</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Try adjusting your search or filters, or create a new forum.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredForums.map((forum) => (
                  <ForumCard key={forum.id} forum={forum} onDelete={handleDeleteForum} onTogglePin={handleTogglePin} />
                ))
              )}
            </TabsContent>

            <TabsContent value="pinned" className="space-y-4">
              {filteredForums.filter((forum) => forum.pinned).length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-10">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No pinned forums</h3>
                    <p className="text-sm text-muted-foreground mt-1">You haven't pinned any forums yet.</p>
                  </CardContent>
                </Card>
              ) : (
                filteredForums
                  .filter((forum) => forum.pinned)
                  .map((forum) => (
                    <ForumCard
                      key={forum.id}
                      forum={forum}
                      onDelete={handleDeleteForum}
                      onTogglePin={handleTogglePin}
                    />
                  ))
              )}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {filteredForums
                .sort((a, b) => {
                  // Sort by activity (this is a simple simulation)
                  if (a.lastActivity.includes("hour") && !b.lastActivity.includes("hour")) return -1
                  if (!a.lastActivity.includes("hour") && b.lastActivity.includes("hour")) return 1
                  return 0
                })
                .slice(0, 3)
                .map((forum) => (
                  <ForumCard key={forum.id} forum={forum} onDelete={handleDeleteForum} onTogglePin={handleTogglePin} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Forum Card Component
function ForumCard({ forum, onDelete, onTogglePin }) {
  return (
    <Card className={`overflow-hidden ${forum.unread ? "border-l-4 border-l-blue-500" : ""}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start gap-2">
            {forum.pinned && (
              <Badge variant="secondary" className="mt-1">
                Pinned
              </Badge>
            )}
            <div>
              <CardTitle className="text-lg">
                <Link href={`/instructor/forums/${forum.id}`} className="hover:text-primary transition-colors">
                  {forum.title}
                </Link>
              </CardTitle>
              <CardDescription>{forum.description}</CardDescription>
            </div>
          </div>
          <Badge variant="outline" className="font-normal">
            {forum.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="font-normal">
            {forum.course}
          </Badge>
          <Badge variant="outline" className="font-normal">
            {forum.courseName}
          </Badge>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {forum.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center text-xs text-muted-foreground bg-secondary px-2 py-1 rounded-md"
            >
              <Tag className="mr-1 h-3 w-3" />
              {tag}
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Users className="mr-1 h-4 w-4" />
            <span>{forum.participants} participants</span>
          </div>
          <div className="flex items-center">
            <MessageCircle className="mr-1 h-4 w-4" />
            <span>{forum.replies} replies</span>
          </div>
          <div className="flex items-center">
            <ThumbsUp className="mr-1 h-4 w-4" />
            <span>{forum.views} views</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src="/placeholder.svg?height=24&width=24" alt={forum.instructor} />
              <AvatarFallback>{forum.instructor.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{forum.instructor}</span>
            <span className="text-sm text-muted-foreground ml-2">
              <Clock className="inline mr-1 h-4 w-4" />
              {forum.lastActivity}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onTogglePin(forum.id)}>
              {forum.pinned ? "Unpin" : "Pin"}
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/instructor/forums/${forum.id}`}>View</Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-500 hover:text-red-700"
              onClick={() => onDelete(forum.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
