"use client";

import { useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  DollarSign,
  ShoppingBag,
  Users,
  Activity,
  Calendar as CalendarIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data
const revenueData = [
  { name: "Jan", total: 4500 },
  { name: "Feb", total: 5200 },
  { name: "Mar", total: 4800 },
  { name: "Apr", total: 6100 },
  { name: "May", total: 5500 },
  { name: "Jun", total: 6700 },
  { name: "Jul", total: 7200 },
  { name: "Aug", total: 6900 },
  { name: "Sep", total: 7800 },
  { name: "Oct", total: 8500 },
  { name: "Nov", total: 9200 },
  { name: "Dec", total: 10500 },
];

const categoryData = [
  { name: "Burgers", value: 35, color: "#ef4444" },
  { name: "Pizza", value: 25, color: "#3b82f6" },
  { name: "Asian", value: 20, color: "#10b981" },
  { name: "Drinks", value: 15, color: "#f59e0b" },
  { name: "Desserts", value: 5, color: "#8b5cf6" },
];

const topProducts = [
  { name: "The Royal Burger", sales: 1245, revenue: 22410 },
  { name: "Spicy Pepperoni", sales: 980, revenue: 16660 },
  { name: "Sushi Platter", sales: 850, revenue: 20400 },
  { name: "Chicken Teriyaki", sales: 620, revenue: 9920 },
  { name: "Chocolate Lava Cake", sales: 540, revenue: 4320 },
];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("year");

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Analysis of your restaurant's performance.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="w-[180px]">
              <CalendarIcon className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 3 months</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20">
            Download Report
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Revenue"
          value="$128,430"
          change="+12.5%"
          trend="up"
          icon={DollarSign}
        />
        <KPICard
          title="Total Orders"
          value="15,234"
          change="+8.2%"
          trend="up"
          icon={ShoppingBag}
        />
        <KPICard
          title="New Customers"
          value="2,420"
          change="+15.3%"
          trend="up"
          icon={Users}
        />
        <KPICard
          title="Avg. Order Value"
          value="$42.50"
          change="-2.1%"
          trend="down"
          icon={Activity}
        />
      </div>

      {/* Main Charts */}
      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Monthly revenue performance for the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-0">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="total"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorTotal)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 shadow-sm border-border/50">
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Distribution of sales across different food categories.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2 md:col-span-1 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
            <CardDescription>Highest performing menu items.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topProducts.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="font-bold text-muted-foreground w-4">
                      0{i + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.sales} orders
                      </p>
                    </div>
                  </div>
                  <div className="font-bold">
                    ${item.revenue.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-2 md:col-span-1 border-border/50 shadow-sm">
          <CardHeader>
            <CardTitle>Peak Hours</CardTitle>
            <CardDescription>Daily order volume by hour.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={[
                    { hour: "11 AM", orders: 45 },
                    { hour: "12 PM", orders: 120 },
                    { hour: "1 PM", orders: 95 },
                    { hour: "2 PM", orders: 60 },
                    { hour: "5 PM", orders: 70 },
                    { hour: "6 PM", orders: 110 },
                    { hour: "7 PM", orders: 150 },
                    { hour: "8 PM", orders: 130 },
                    { hour: "9 PM", orders: 90 },
                  ]}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#E5E7EB"
                  />
                  <XAxis
                    dataKey="hour"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="orders" fill="#ef4444" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function KPICard({ title, value, change, trend, icon: Icon }: any) {
  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground flex items-center mt-1">
          {trend === "up" ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span
            className={
              trend === "up"
                ? "text-green-500 font-medium"
                : "text-red-500 font-medium"
            }
          >
            {change}
          </span>
          <span className="ml-1 text-muted-foreground">from last month</span>
        </p>
      </CardContent>
    </Card>
  );
}
