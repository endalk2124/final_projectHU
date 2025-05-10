import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { Clock, MessageCircle, MessageSquare, PlusCircle, Search, Tag, ThumbsUp, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function StudentForumsPage() {
  // Mock data for discussion forums
  const allForums = [
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
      title: "Calculus Integration Techniques",
      description: "Sharing different methods for solving integration problems",
      category: "Study Group",
      course: "MATH201",
      courseName: "Calculus I",
      instructor: "Dr. Samuel Belete",
      participants: 18,
      replies: 12,
      views: 98,
      lastActivity: "Yesterday",
      tags: ["Calculus", "Integration", "Mathematics"],
      pinned: false,
      unread: false,
    },
    {
      id: 4,
      title: "Systems Analysis Project Teams",
      description: "Coordination for the group project on systems analysis",
      category: "Project Coordination",
      course: "IS205",
      courseName: "Systems Analysis & Design",
      instructor: "Dr. Mekdes Mekonnen",
      participants: 15,
      replies: 8,
      views: 67,
      lastActivity: "2 days ago",
      tags: ["Project", "Systems Analysis", "Teamwork"],
      pinned: false,
      unread: false,
    },
    {
      id: 5,
      title: "Mid-term Exam Preparation",
      description: "Discussion about study strategies and important topics for the upcoming exams",
      category: "Exam Preparation",
      course: "Multiple",
      courseName: "All Courses",
      instructor: "Student Council",
      participants: 45,
      replies: 38,
      views: 312,
      lastActivity: "1 day ago",
      tags: ["Exams", "Study Tips", "Preparation"],
      pinned: true,
      unread: true,
    },
    {
      id: 6,
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
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Discussion Forums</h1>
          <p className="text-muted-foreground">Engage with your peers and instructors in course discussions</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Topic
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
            <h3 className="text-sm font-medium">Filter By Category</h3>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="technical">Technical Discussion</SelectItem>
                <SelectItem value="assignment">Assignment Help</SelectItem>
                <SelectItem value="study">Study Group</SelectItem>
                <SelectItem value="project">Project Coordination</SelectItem>
                <SelectItem value="exam">Exam Preparation</SelectItem>
                <SelectItem value="career">Career Discussion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sort By</h3>
            <Select defaultValue="activity">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="activity">Recent Activity</SelectItem>
                <SelectItem value="created">Creation Date</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
                <SelectItem value="views">Most Views</SelectItem>
                <SelectItem value="participants">Most Participants</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Quick Filters</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4" />
                All Discussions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-blue-500" />
                Unread Discussions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-amber-500" />
                Pinned Discussions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-green-500" />
                My Discussions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="mr-2 h-4 w-4 text-purple-500" />
                Instructor Discussions
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Discussions</TabsTrigger>
              <TabsTrigger value="course">Course Discussions</TabsTrigger>
              <TabsTrigger value="general">General Discussions</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {allForums.map((forum) => (
                <ForumCard key={forum.id} forum={forum} />
              ))}
            </TabsContent>

            <TabsContent value="course" className="space-y-4">
              {allForums
                .filter((forum) => forum.course !== "Multiple")
                .map((forum) => (
                  <ForumCard key={forum.id} forum={forum} />
                ))}
            </TabsContent>

            <TabsContent value="general" className="space-y-4">
              {allForums
                .filter((forum) => forum.course === "Multiple")
                .map((forum) => (
                  <ForumCard key={forum.id} forum={forum} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Forum Card Component
function ForumCard({ forum }) {
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
                <Link href={`/student/forums/${forum.id}`} className="hover:text-primary transition-colors">
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
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-1 h-4 w-4" />
            <span>Last activity: {forum.lastActivity}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
