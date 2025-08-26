"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Calendar, Clock, BookOpen, TrendingUp, Award, Search } from "lucide-react"
import { useState } from "react"

// Mock data
const mockExams = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Calculus Final",
    date: "2024-01-15",
    time: "09:00",
    duration: 180,
    status: "completed",
    score: 85,
  },
  {
    id: 2,
    subject: "Physics",
    title: "Quantum Mechanics",
    date: "2024-01-20",
    time: "14:00",
    duration: 120,
    status: "completed",
    score: 92,
  },
  {
    id: 3,
    subject: "Chemistry",
    title: "Organic Chemistry",
    date: "2024-01-25",
    time: "10:00",
    duration: 150,
    status: "upcoming",
    score: null,
  },
  {
    id: 4,
    subject: "Biology",
    title: "Cell Biology",
    date: "2024-01-30",
    time: "13:00",
    duration: 90,
    status: "upcoming",
    score: null,
  },
  {
    id: 5,
    subject: "Mathematics",
    title: "Statistics Quiz",
    date: "2024-01-10",
    time: "11:00",
    duration: 60,
    status: "completed",
    score: 78,
  },
]

const performanceData = [
  { month: "Sep", score: 75 },
  { month: "Oct", score: 82 },
  { month: "Nov", score: 78 },
  { month: "Dec", score: 85 },
  { month: "Jan", score: 88 },
]

const subjectData = [
  { subject: "Mathematics", average: 81.5, exams: 2 },
  { subject: "Physics", average: 92, exams: 1 },
  { subject: "Chemistry", average: 0, exams: 0 },
  { subject: "Biology", average: 0, exams: 0 },
]

const gradeDistribution = [
  { grade: "A", count: 2, color: "#22c55e" },
  { grade: "B", count: 1, color: "#3b82f6" },
  { grade: "C", count: 0, color: "#f59e0b" },
  { grade: "D", count: 0, color: "#ef4444" },
]

export function StudentDashboard() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [subjectFilter, setSubjectFilter] = useState("all")

  const filteredExams = mockExams.filter((exam) => {
    const matchesSearch =
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || exam.status === statusFilter
    const matchesSubject = subjectFilter === "all" || exam.subject === subjectFilter
    return matchesSearch && matchesStatus && matchesSubject
  })

  const completedExams = mockExams.filter((exam) => exam.status === "completed")
  const averageScore =
    completedExams.length > 0
      ? Math.round(completedExams.reduce((sum, exam) => sum + (exam.score || 0), 0) / completedExams.length)
      : 0

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Student Dashboard</h1>
            <p className="text-muted-foreground">Track your academic progress and upcoming exams</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-sm">
              Academic Year 2024
            </Badge>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Exams</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockExams.length}</div>
              <p className="text-xs text-muted-foreground">{completedExams.length} completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">Based on {completedExams.length} exams</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Exams</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockExams.filter((exam) => exam.status === "upcoming").length}</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Score</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.max(...completedExams.map((exam) => exam.score || 0))}%</div>
              <p className="text-xs text-muted-foreground">Physics exam</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Exams List */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Exams</CardTitle>
                <CardDescription>Your exam schedule and results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search exams..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Subjects</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Exam Cards */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredExams.map((exam) => (
                    <div key={exam.id} className="border rounded-lg p-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{exam.title}</h3>
                        <Badge variant={exam.status === "completed" ? "default" : "secondary"}>{exam.status}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {exam.subject}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {exam.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {exam.time}
                        </span>
                      </div>
                      {exam.score && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Score:</span>
                          <Badge variant={exam.score >= 90 ? "default" : exam.score >= 80 ? "secondary" : "outline"}>
                            {exam.score}%
                          </Badge>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="space-y-4">
            {/* Performance Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Trend</CardTitle>
                <CardDescription>Your exam scores over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    score: {
                      label: "Score",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-48"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="score"
                        stroke="var(--color-chart-1)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-chart-1)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Subject Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Average scores by subject</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    average: {
                      label: "Average",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-48"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={subjectData.filter((s) => s.exams > 0)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis domain={[0, 100]} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="average" fill="var(--color-chart-2)" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Grade Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Distribution of your exam grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ChartContainer
                config={{
                  count: {
                    label: "Count",
                  },
                }}
                className="h-64 w-64"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={gradeDistribution.filter((g) => g.count > 0)}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="count"
                      label={({ grade, count }) => `${grade}: ${count}`}
                    >
                      {gradeDistribution
                        .filter((g) => g.count > 0)
                        .map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
