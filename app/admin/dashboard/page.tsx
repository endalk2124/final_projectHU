import { AvatarFallback } from "@/components/ui/avatar"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { BookOpen, FileText, User, Users, Shield, Database, Server, Activity } from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the HU Informatics Learning Platform administration</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/admin/reports">
              <FileText className="mr-2 h-4 w-4" />
              Generate Reports
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">Current semester</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Load</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24%</div>
            <div className="mt-2">
              <Progress value={24} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <div className="mt-2">
              <Progress value={68} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-3 md:w-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="system">System Status</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>User Distribution</CardTitle>
                <CardDescription>Breakdown of user types in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-blue-500" />
                        <span>Students</span>
                      </div>
                      <span className="font-medium">1,156</span>
                    </div>
                    <Progress value={85} className="h-2 bg-blue-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <BookOpen className="mr-2 h-4 w-4 text-emerald-500" />
                        <span>Instructors</span>
                      </div>
                      <span className="font-medium">72</span>
                    </div>
                    <Progress value={10} className="h-2 bg-emerald-100" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="mr-2 h-4 w-4 text-purple-500" />
                        <span>Administrators</span>
                      </div>
                      <span className="font-medium">20</span>
                    </div>
                    <Progress value={5} className="h-2 bg-purple-100" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
                <CardDescription>Latest system activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-blue-100 p-2 text-blue-600">
                      <User className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New user registered</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-emerald-100 p-2 text-emerald-600">
                      <BookOpen className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New course created</p>
                      <p className="text-xs text-muted-foreground">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-amber-100 p-2 text-amber-600">
                      <FileText className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Resource uploaded</p>
                      <p className="text-xs text-muted-foreground">Yesterday</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-red-100 p-2 text-red-600">
                      <Shield className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Security alert</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>Important system alerts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-800">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      <p className="font-medium">Scheduled Maintenance</p>
                    </div>
                    <p className="mt-1 text-sm">System maintenance scheduled for May 15, 2:00 AM - 4:00 AM.</p>
                  </div>
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 text-blue-800">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4" />
                      <p className="font-medium">Database Backup</p>
                    </div>
                    <p className="mt-1 text-sm">Daily database backup completed successfully.</p>
                  </div>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4" />
                      <p className="font-medium">System Update</p>
                    </div>
                    <p className="mt-1 text-sm">System updated to version 2.4.0 successfully.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4 mt-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>New User Registrations</CardTitle>
                <CardDescription>Pending approval requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>AB</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">Abebe Kebede</p>
                        <p className="text-xs text-muted-foreground">Student</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Reject</Button>
                      <Button size="sm">Approve</Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    \
