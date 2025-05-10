import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Eye, FileText, Search, BookOpen } from "lucide-react"

export default function StudentResourcesPage() {
  // Mock data for resources
  const allResources = [
    {
      id: 1,
      title: "Database Design Principles",
      description: "Comprehensive notes on database design principles and normalization",
      type: "pdf",
      size: "2.4 MB",
      uploadDate: "2024-05-01",
      course: "IS301",
      courseName: "Database Management",
      department: "Information Systems",
      instructor: "Dr. Birhanu Ayalew",
      downloads: 45,
    },
    {
      id: 2,
      title: "SQL Basics Tutorial",
      description: "Step-by-step guide to SQL queries and database operations",
      type: "pdf",
      size: "1.8 MB",
      uploadDate: "2024-04-28",
      course: "IS301",
      courseName: "Database Management",
      department: "Information Systems",
      instructor: "Dr. Birhanu Ayalew",
      downloads: 38,
    },
    {
      id: 3,
      title: "Java Programming Slides",
      description: "Lecture slides covering Java fundamentals and OOP concepts",
      type: "pptx",
      size: "5.2 MB",
      uploadDate: "2024-04-25",
      course: "CS101",
      courseName: "Introduction to Java",
      department: "Computer Science",
      instructor: "Prof. Tigist Lemma",
      downloads: 62,
    },
    {
      id: 4,
      title: "Calculus Formulas Cheat Sheet",
      description: "Quick reference guide for calculus formulas and theorems",
      type: "pdf",
      size: "0.9 MB",
      uploadDate: "2024-04-20",
      course: "MATH201",
      courseName: "Calculus I",
      department: "Mathematics",
      instructor: "Dr. Samuel Belete",
      downloads: 73,
    },
    {
      id: 5,
      title: "Systems Analysis Methods",
      description: "Overview of different methods used in systems analysis",
      type: "pdf",
      size: "3.2 MB",
      uploadDate: "2024-04-22",
      course: "IS205",
      courseName: "Systems Analysis & Design",
      department: "Information Systems",
      instructor: "Dr. Mekdes Mekonnen",
      downloads: 29,
    },
    {
      id: 6,
      title: "ER Diagram Examples",
      description: "Examples of Entity-Relationship diagrams for different scenarios",
      type: "pdf",
      size: "1.5 MB",
      uploadDate: "2024-04-15",
      course: "IS301",
      courseName: "Database Management",
      department: "Information Systems",
      instructor: "Dr. Birhanu Ayalew",
      downloads: 42,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Learning Resources</h1>
          <p className="text-muted-foreground">Access and download learning materials for your courses</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-64 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search resources..." className="pl-8" />
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
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="pdf">PDF Documents</SelectItem>
                <SelectItem value="pptx">PowerPoint Presentations</SelectItem>
                <SelectItem value="docx">Word Documents</SelectItem>
                <SelectItem value="xlsx">Excel Spreadsheets</SelectItem>
                <SelectItem value="zip">ZIP Archives</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Sort By</h3>
            <Select defaultValue="date">
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Upload Date (Newest)</SelectItem>
                <SelectItem value="date-asc">Upload Date (Oldest)</SelectItem>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="downloads">Most Downloaded</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 border-t">
            <h3 className="text-sm font-medium mb-2">Resource Categories</h3>
            <div className="space-y-2">
              <Button variant="secondary" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                All Resources
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Lecture Notes
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Assignments
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Exam Materials
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="mr-2 h-4 w-4" />
                Supplementary
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Resources</TabsTrigger>
              <TabsTrigger value="recent">Recently Added</TabsTrigger>
              <TabsTrigger value="popular">Most Popular</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {allResources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </TabsContent>

            <TabsContent value="recent" className="space-y-4">
              {allResources
                .sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime())
                .slice(0, 3)
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </TabsContent>

            <TabsContent value="popular" className="space-y-4">
              {allResources
                .sort((a, b) => b.downloads - a.downloads)
                .slice(0, 3)
                .map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

// Resource Card Component
function ResourceCard({ resource }) {
  // Get file icon and color based on type
  const getFileTypeStyles = (type) => {
    switch (type) {
      case "pdf":
        return { bgColor: "bg-red-100", textColor: "text-red-600", icon: <FileText className="h-5 w-5" /> }
      case "docx":
      case "doc":
        return { bgColor: "bg-blue-100", textColor: "text-blue-600", icon: <FileText className="h-5 w-5" /> }
      case "pptx":
      case "ppt":
        return { bgColor: "bg-amber-100", textColor: "text-amber-600", icon: <FileText className="h-5 w-5" /> }
      case "xlsx":
      case "xls":
        return { bgColor: "bg-green-100", textColor: "text-green-600", icon: <FileText className="h-5 w-5" /> }
      default:
        return { bgColor: "bg-gray-100", textColor: "text-gray-600", icon: <FileText className="h-5 w-5" /> }
    }
  }

  const { bgColor, textColor, icon } = getFileTypeStyles(resource.type)

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className={`flex items-center justify-center p-6 ${bgColor} ${textColor} md:w-24`}>{icon}</div>
        <div className="flex-1">
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                <CardDescription>{resource.description}</CardDescription>
              </div>
              <Badge variant="outline" className="font-normal uppercase">
                {resource.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="font-normal">
                {resource.course}
              </Badge>
              <Badge variant="outline" className="font-normal">
                {resource.courseName}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <BookOpen className="mr-1 h-4 w-4" />
                <span>{resource.department}</span>
              </div>
              <div>Uploaded on {new Date(resource.uploadDate).toLocaleDateString()}</div>
              <div>Size: {resource.size}</div>
              <div>Downloads: {resource.downloads}</div>
            </div>
          </CardContent>
          <CardFooter className="pt-2 border-t">
            <div className="flex justify-between items-center w-full">
              <div className="text-sm text-muted-foreground">Uploaded by: {resource.instructor}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </Button>
                <Button size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </Button>
              </div>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  )
}
