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
import { Search, Plus, MoreHorizontal, MapPin, Store } from "lucide-react";

// Mock Data
const RESTAURANTS = [
  {
    id: "RES-001",
    name: "The Italian Place",
    location: "New York, NY",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=100&auto=format&fit=crop",
    status: "active",
    rating: 4.8,
    orders: 1250,
    tags: ["Italian", "Pizza"],
    priceRange: "$$",
  },
  {
    id: "RES-002",
    name: "Sushi Master",
    location: "Los Angeles, CA",
    logo: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=100&auto=format&fit=crop",
    status: "active",
    rating: 4.9,
    orders: 850,
    tags: ["Sushi", "Japanese"],
    priceRange: "$$$",
  },
  {
    id: "RES-003",
    name: "Burger Joint",
    location: "Chicago, IL",
    logo: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100&auto=format&fit=crop",
    status: "closed",
    rating: 4.5,
    orders: 2100,
    tags: ["Burgers", "American"],
    priceRange: "$",
  },
];

export default function RestaurantsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRestaurants = RESTAURANTS.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Restaurants</h1>
          <p className="text-muted-foreground">
            Manage your restaurant locations and partners.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2"
          asChild
        >
          <Link href="/admin/restaurants/new">
            <Plus className="w-4 h-4" /> Add Restaurant
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-background/50 p-1 rounded-xl">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search restaurants..."
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
              <TableHead className="w-[80px]">Logo</TableHead>
              <TableHead>Restaurant Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Cuisine</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRestaurants.length > 0 ? (
              filteredRestaurants.map((restaurant) => (
                <TableRow
                  key={restaurant.id}
                  className="group hover:bg-muted/40 transition-colors"
                >
                  <TableCell>
                    <Avatar className="h-10 w-10 border border-border rounded-lg">
                      <AvatarImage src={restaurant.logo} />
                      <AvatarFallback className="rounded-lg">
                        <Store className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {restaurant.name}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-3 h-3" /> {restaurant.location}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border px-2 py-0.5 capitalize ${
                        restaurant.status === "active"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200"
                      }`}
                    >
                      {restaurant.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 flex-wrap">
                      {restaurant.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-secondary px-1.5 py-0.5 rounded text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    {restaurant.orders.toLocaleString()}
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
                            href={`/admin/restaurants/${restaurant.id}`}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            Edit Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 cursor-pointer">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-24 text-center text-muted-foreground"
                >
                  No restaurants found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
