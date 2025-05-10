import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Book, FileText, Users, Search, Shield, MessageSquare, Download, Eye, Clock, ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

// Mock data for resources
const resources = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Comprehensive guide covering HTML, CSS, and JavaScript basics for beginners.",
    fileType: "pdf",
    fileSize: "2.4 MB",
    uploadDate: "2023-10-15",
    department: "Computer Science",
    course: "CS-101",
    uploader: "Dr. Alemayehu",
  },
  {
    id: 2,
    title: "Network Security Protocols",
    description: "Detailed explanation of modern network security protocols and implementations.",
    fileType: "docx",
    fileSize: "1.8 MB",
    uploadDate: "2023-10-10",
    department: "Information Technology",
    course: "IT-205",
    uploader: "Prof. Kebede",
  },
  {
    id: 3,
    title: "Welcome to Graduate Studies",
    description: "Orientation materials for new graduate students in the Faculty of Informatics.",
    fileType: "ppt",
    fileSize: "5.2 MB",
    uploadDate: "2023-09-28",
    department: "Graduate School",
    course: "GS-001",
    uploader: "Dean Office",
  },
]

// Mock data for forum posts
const forumPosts = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Discussion about the basics of web development for beginners in the program.",
    category: "CS-101",
    participants: 24,
    replies: 15,
    lastActivity: "2 hours ago",
    creator: {
      name: "Dr. Alemayehu",
      role: "Instructor",
    },
  },
  {
    id: 2,
    title: "Assignment 3 Questions",
    description: "Clarifications needed for the third assignment in Network Security course.",
    category: "IT-205",
    participants: 18,
    replies: 7,
    lastActivity: "1 day ago",
    creator: {
      name: "Meron",
      role: "Student",
    },
  },
  {
    id: 3,
    title: "Research Methodology Workshop",
    description: "Planning the upcoming workshop on research methodologies for graduate students.",
    category: "GS-001",
    participants: 12,
    replies: 5,
    lastActivity: "3 days ago",
    creator: {
      name: "Prof. Kebede",
      role: "Professor",
    },
  },
]

export default function Home() {
  // Simulate authentication state (would come from a real auth system)
  const isAuthenticated = false

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute rounded-full bg-primary/10 blur-3xl"
            style={{ width: "24rem", height: "24rem", top: "-5rem", right: "-5rem" }}
          ></div>
          <div
            className="absolute rounded-full bg-blue-400/10 blur-3xl"
            style={{ width: "24rem", height: "24rem", bottom: "-10rem", left: "-5rem" }}
          ></div>
          <div
            className="absolute rounded-full bg-primary/10 blur-3xl"
            style={{ width: "18rem", height: "18rem", top: "33%", left: "25%" }}
          ></div>
        </div>

        <div className="container px-4 relative z-10">
          <div className="flex flex-col items-center text-center">
            <Badge className="px-4 py-2 mb-6 text-base bg-primary/10 text-primary hover:bg-primary/20">
              Hawassa University Faculty of Informatics
            </Badge>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
              Modern Learning & Collaboration Platform
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl">
              Access resources, collaborate with peers, and enhance your learning experience with our comprehensive
              platform designed specifically for Hawassa University's Faculty of Informatics.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Button asChild size="lg" className="px-8">
                  <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="px-8">
                    <Link href="/auth">Get Started</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8">
                    <Link href="/auth">Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden md:block animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted-foreground" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Learning Platform</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Designed with students and instructors in mind, our platform offers everything you need to enhance the
              teaching and learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Book />}
              title="Learning Resources"
              description="Access a centralized repository of course materials, lecture notes, and educational resources organized by department and course."
            />

            <FeatureCard
              icon={<Users />}
              title="Role-Based Access"
              description="Different interfaces and capabilities for students, instructors, and administrators, ensuring everyone has the right tools."
            />

            <FeatureCard
              icon={<MessageSquare />}
              title="Discussion Forums"
              description="Participate in threaded course discussions, ask questions, and engage with peers and instructors in a collaborative environment."
            />

            <FeatureCard
              icon={<FileText />}
              title="File Management"
              description="Easily upload, download, and manage course materials with built-in file previews and organization tools."
            />

            <FeatureCard
              icon={<Search />}
              title="Powerful Search"
              description="Quickly find the resources you need with our comprehensive search functionality across all platform content."
            />

            <FeatureCard
              icon={<Shield />}
              title="Secure Authentication"
              description="Robust security features including role-based permissions and password recovery to keep your account safe."
            />
          </div>
        </div>
      </section>

      {/* Featured Resources Section */}
      <section className="py-20">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Featured Resources</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      {/* Forum Preview Section */}
      <section className="py-20 bg-slate-50">
        <div className="container px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Active Discussions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {forumPosts.map((post) => (
              <ForumCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

// Feature Card Component
function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-300 hover:-translate-y-1">
      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

// Resource Card Component
function ResourceCard({ resource }) {
  // Get file icon and color based on type
  const getFileTypeStyles = (type) => {
    switch (type) {
      case "pdf":
        return { bgColor: "bg-red-100", textColor: "text-red-600", icon: <FileText /> }
      case "docx":
      case "doc":
        return { bgColor: "bg-blue-100", textColor: "text-blue-600", icon: <FileText /> }
      case "ppt":
      case "pptx":
        return { bgColor: "bg-amber-100", textColor: "text-amber-600", icon: <FileText /> }
      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-600", icon: <FileText /> }
    }
  }

  const { bgColor, textColor, icon } = getFileTypeStyles(resource.fileType)

  return (
    <Card className="overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex gap-4">
            <div
              className={`flex-shrink-0 w-10 h-10 ${bgColor} ${textColor} rounded-lg flex items-center justify-center`}
            >
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{resource.title}</h3>
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge variant="secondary" className="font-normal">
                  {resource.department}
                </Badge>
                <Badge variant="outline" className="font-normal">
                  {resource.course}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  {resource.fileType.toUpperCase()} • {resource.fileSize}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{resource.description}</p>
            </div>
          </div>
        </div>

        <div className="border-t p-4 flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            Uploaded on {new Date(resource.uploadDate).toLocaleDateString()} by {resource.uploader}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </Button>
            <Button size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Forum Card Component
function ForumCard({ post }) {
  return (
    <Card className="overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:shadow-md">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <Badge variant="outline" className="mb-2">
              {post.category}
            </Badge>
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p className="text-sm text-muted-foreground">{post.description}</p>
          </div>
          <div className="bg-slate-100 rounded-lg p-2 text-center min-w-[60px]">
            <span className="block font-semibold">{post.replies}</span>
            <span className="text-xs text-muted-foreground">Replies</span>
          </div>
        </div>

        <div className="border-t pt-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center mr-2 text-sm">
              {post.creator.name.charAt(0)}
            </div>
            <div>
              <span className="text-sm font-medium">{post.creator.name}</span>
              <span className="text-sm text-muted-foreground ml-1">({post.creator.role})</span>
            </div>
          </div>

          <div className="flex gap-3 text-sm text-muted-foreground">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {post.participants}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.replies}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {post.lastActivity}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
