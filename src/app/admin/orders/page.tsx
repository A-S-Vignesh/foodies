"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Search,
  ArrowUpDown,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ChefHat,
  Truck,
} from "lucide-react";
import Link from "next/link";

// Mock Data
const ORDERS = [
  {
    id: "ORD-9281",
    customer: "Alice Johnson",
    email: "alice@example.com",
    items: ["The Royal Burger (x2)", "Fries (x1)"],
    total: 42.5,
    status: "Processing",
    date: "2024-02-03T10:30:00",
  },
  {
    id: "ORD-9282",
    customer: "Michael Chen",
    email: "m.chen@example.com",
    items: ["Sushi Platter (x1)", "Miso Soup (x2)"],
    total: 32.0,
    status: "Delivered",
    date: "2024-02-02T19:15:00",
  },
  {
    id: "ORD-9283",
    customer: "Emily Davis",
    email: "emily.d@example.com",
    items: ["Margherita Pizza (x1)", "Coke Zero (x2)"],
    total: 18.5,
    status: "Pending",
    date: "2024-02-03T11:05:00",
  },
  {
    id: "ORD-9284",
    customer: "David Wilson",
    email: "dwilson@example.com",
    items: ["Chicken Curry (x1)", "Naan (x2)", "Rice (x1)"],
    total: 24.0,
    status: "Cancelled",
    date: "2024-02-01T14:20:00",
  },
  {
    id: "ORD-9285",
    customer: "Sarah Brown",
    email: "sarah.b@example.com",
    items: ["Vegan Salad (x1)", "Smoothie (x1)"],
    total: 16.75,
    status: "Processing",
    date: "2024-02-03T10:45:00",
  },
];

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = ORDERS.filter((order) => {
    const matchesFilter =
      filter === "all" || order.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default:
        return "bg-gray-100/50 text-gray-600 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;
      case "processing":
        return <ChefHat className="w-3.5 h-3.5 mr-1" />;
      case "cancelled":
        return <XCircle className="w-3.5 h-3.5 mr-1" />;
      case "pending":
        return <Clock className="w-3.5 h-3.5 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
          >
            Download Report
          </Button>
        </div>
      </div>

      {/* Filters & Actions */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-background/50 p-1 rounded-xl">
        <Tabs
          defaultValue="all"
          className="w-full md:w-auto"
          onValueChange={setFilter}
        >
          <TabsList className="bg-secondary/30 rounded-lg p-1 h-auto">
            <TabsTrigger value="all" className="rounded-md px-4 py-2">
              All Orders
            </TabsTrigger>
            <TabsTrigger value="pending" className="rounded-md px-4 py-2">
              Pending
            </TabsTrigger>
            <TabsTrigger value="processing" className="rounded-md px-4 py-2">
              Processing
            </TabsTrigger>
            <TabsTrigger value="delivered" className="rounded-md px-4 py-2">
              Delivered
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="rounded-md px-4 py-2">
              Cancelled
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search orders..."
            className="pl-9 bg-background border-border"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border/50 bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden md:table-cell">Items</TableHead>
              <TableHead>
                <div className="flex items-center space-x-1 cursor-pointer hover:text-foreground">
                  <span>Date</span>
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  className="group hover:bg-muted/40 transition-colors"
                >
                  <TableCell className="font-bold font-mono text-primary">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{order.customer}</span>
                      <span className="text-xs text-muted-foreground hidden lg:inline-block">
                        {order.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-muted-foreground max-w-[200px] truncate">
                    {order.items.join(", ")}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(order.date).toLocaleDateString()}
                    <br />
                    <span className="text-xs opacity-70">
                      {new Date(order.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </TableCell>
                  <TableCell className="font-bold">
                    ${order.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full px-2.5 py-0.5 font-semibold border-0 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="rounded-xl shadow-lg border-border/60"
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() =>
                            navigator.clipboard.writeText(order.id)
                          }
                        >
                          Copy Order ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link href={`/admin/orders/${order.id}`}>
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600">
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="h-24 text-center text-muted-foreground"
                >
                  No orders found matching your criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
