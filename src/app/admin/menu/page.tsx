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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Search,
  Plus,
  Edit,
  Trash2,
  Image as ImageIcon,
} from "lucide-react";

// Mock Data
const MENU_ITEMS = [
  {
    id: "1",
    name: "The Royal Burger",
    price: 18.0,
    category: "Burgers",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=100&auto=format&fit=crop",
    available: true,
  },
  {
    id: "2",
    name: "Sushi Platter",
    price: 24.0,
    category: "Sushi",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=100&auto=format&fit=crop",
    available: true,
  },
  {
    id: "3",
    name: "Dragon Wok",
    price: 16.5,
    category: "Asian",
    image:
      "https://images.unsplash.com/photo-1552590635-27c2c2128abf?q=80&w=100&auto=format&fit=crop",
    available: false,
  },
];

export default function AdminMenuPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = MENU_ITEMS.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Menu Items</h1>
          <p className="text-muted-foreground">
            Manage your food catalog and prices.
          </p>
        </div>
        <Button
          size="sm"
          className="bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2"
          asChild
        >
          <Link href="/admin/menu/new">
            <Plus className="w-4 h-4" /> Add New Item
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 bg-background/50 p-1 rounded-xl">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
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
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <TableRow
                  key={item.id}
                  className="group hover:bg-muted/40 transition-colors"
                >
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-secondary relative border border-border/50">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <ImageIcon className="w-5 h-5" />
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    {item.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="font-normal rounded-md"
                    >
                      {item.category}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-foreground">
                    ${item.price.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`rounded-full border px-2 py-0.5 ${
                        item.available
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-zinc-100 text-zinc-500 border-zinc-200"
                      }`}
                    >
                      {item.available ? "Available" : "Unavailable"}
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
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/admin/menu/${item.id}`}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Edit className="w-4 h-4" /> Edit Item
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 flex items-center gap-2 cursor-pointer">
                          <Trash2 className="w-4 h-4" /> Delete
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
                  No items found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
