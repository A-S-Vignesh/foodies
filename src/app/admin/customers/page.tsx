"use client";

import { useState } from "react";
import Link from "next/link";
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
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Plus, MoreHorizontal, Mail, Phone, Eye } from "lucide-react";

// Mock Data
const CUSTOMERS = [
  {
    id: "CUST-001",
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    status: "active",
    totalSpent: 450.2,
    ordersCount: 12,
    joinedDate: "Jan 12, 2024",
  },
  {
    id: "CUST-002",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 987-6543",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
    status: "active",
    totalSpent: 1250.5,
    ordersCount: 45,
    joinedDate: "Dec 05, 2023",
  },
  {
    id: "CUST-003",
    firstName: "Emily",
    lastName: "Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 456-7890",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    status: "blocked",
    totalSpent: 85.0,
    ordersCount: 3,
    joinedDate: "Feb 01, 2024",
  },
];

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = CUSTOMERS.filter(
    (customer) =>
      (customer.firstName + " " + customer.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            Manage your customer base and view their history.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2"
          asChild
        >
          <Link href="/admin/customers/new">
            <Plus className="w-4 h-4" /> Add Customer
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-background/50 p-1 rounded-xl">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
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
              <TableHead className="w-[80px]">Avatar</TableHead>
              <TableHead>Customer Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  className="group hover:bg-muted/40 transition-colors"
                >
                  <TableCell>
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>{customer.firstName[0]}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {customer.firstName} {customer.lastName}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <Mail className="w-3 h-3" /> {customer.email}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border px-2 py-0.5 capitalize ${
                        customer.status === "active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {customer.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {customer.ordersCount}
                  </TableCell>
                  <TableCell className="font-bold text-foreground">
                    ${customer.totalSpent.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {customer.joinedDate}
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
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/customers/${customer.id}`}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Eye className="w-4 h-4" /> View Profile
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                          Block Customer
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
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
