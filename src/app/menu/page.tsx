"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Clock,
  Heart,
  Filter,
  ChevronDown,
  MapPin,
  Search,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MOCK_MENU_ITEMS, CATEGORIES, SUB_CATEGORIES } from "@/data/mockData";

const SORT_OPTIONS = [
  "Recommended",
  "Rating: High to Low",
  "Price: Low to High",
  "Price: High to Low",
  "Time: Low to High",
];

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeSubCategory, setActiveSubCategory] = useState("All");
  const [activeSort, setActiveSort] = useState("Recommended");
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyVeg, setOnlyVeg] = useState(false);

  // Filtering and Sorting Logic
  const filteredAndSortedItems = useMemo(() => {
    let result = [...MOCK_MENU_ITEMS];

    // Search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    // Filter by Category
    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }

    // Filter by SubCategory
    if (activeSubCategory !== "All") {
      result = result.filter((item) => item.subCategory === activeSubCategory);
    }

    // Filter by Veg
    if (onlyVeg) {
      result = result.filter((item) => item.isVeg);
    }

    // Sort
    switch (activeSort) {
      case "Rating: High to Low":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "Price: Low to High":
        result.sort(
          (a, b) =>
            (a.discountedPrice || a.price) - (b.discountedPrice || b.price)
        );
        break;
      case "Price: High to Low":
        result.sort(
          (a, b) =>
            (b.discountedPrice || b.price) - (a.discountedPrice || a.price)
        );
        break;
      case "Time: Low to High":
        result.sort((a, b) => a.preparationTime - b.preparationTime);
        break;
      case "Recommended":
      default:
        // Featured, then Best Sellers, then others
        result.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          if (a.isBestSeller && !b.isBestSeller) return -1;
          if (!a.isBestSeller && b.isBestSeller) return 1;
          return 0;
        });
        break;
    }

    return result;
  }, [activeCategory, activeSubCategory, activeSort, searchQuery, onlyVeg]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-20 pt-25 md:pt-32">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-border/50 top-20 z-30 transition-all duration-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold font-heading text-foreground">
                  Discover Food
                </h1>
                <p className="text-muted-foreground text-sm">
                  {filteredAndSortedItems.length} delicious items found
                </p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search food..."
                    className="pl-9 h-10 rounded-full bg-secondary/30 border-none focus:ring-1 focus:ring-primary/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="h-10 w-10 md:w-auto md:px-4 flex items-center justify-center gap-2 bg-white border border-neutral-200 rounded-full hover:bg-neutral-50 text-sm font-medium">
                      <Filter className="w-4 h-4" />
                      <span className="hidden md:inline">Sort</span>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        className={`cursor-pointer ${
                          activeSort === option
                            ? "bg-primary/10 text-primary font-semibold"
                            : ""
                        }`}
                        onClick={() => setActiveSort(option)}
                      >
                        {option}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Filters Row */}
            <div className="flex flex-col gap-4">
              {/* Main Categories */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                {CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setActiveCategory(category);
                      setActiveSubCategory("All"); // Reset sub on main change
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeCategory === category
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white text-neutral-600 border border-neutral-200 hover:border-primary/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Sub Filters & Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-neutral-200 pt-3">
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide flex-1">
                  {SUB_CATEGORIES.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSubCategory(sub)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                        activeSubCategory === sub
                          ? "bg-neutral-800 text-white"
                          : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-3 py-1.5 shadow-sm shrink-0">
                  <Label
                    htmlFor="veg-mode"
                    className={`text-xs font-bold cursor-pointer ${
                      onlyVeg ? "text-green-600" : "text-neutral-500"
                    }`}
                  >
                    Veg Only
                  </Label>
                  <Switch
                    id="veg-mode"
                    checked={onlyVeg}
                    onCheckedChange={setOnlyVeg}
                    className="scale-75 data-[state=checked]:bg-green-600"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedItems.map((item) => (
            <Link key={item._id} href={`/menu/${item.slug}`}>
              <Card className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden bg-white rounded-2xl cursor-pointer h-full flex flex-col hover:-translate-y-1">
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Discount Badge */}
                  {item.discountedPrice && (
                    <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-bl-xl shadow-sm z-10">
                      {Math.round(
                        ((item.price - item.discountedPrice) / item.price) * 100
                      )}
                      % OFF
                    </div>
                  )}

                  {/* Veg/Non-Veg Badge */}
                  <div
                    className={`absolute top-3 left-3 px-2 py-1 rounded-md shadow-sm z-10 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1 ${
                      item.isVeg
                        ? "bg-white text-green-700"
                        : "bg-white text-red-600"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.isVeg ? "bg-green-600" : "bg-red-600"
                      }`}
                    />
                    {item.isVeg ? "Veg" : "Non-Veg"}
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-primary transition-colors line-clamp-1">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-1.5 py-0.5 rounded text-xs font-bold shrink-0">
                      {item.rating} <Star size={10} fill="currentColor" />
                    </div>
                  </div>

                  <p className="text-neutral-500 text-xs line-clamp-2 mb-4">
                    {item.description}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-neutral-100">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-neutral-400 font-bold uppercase">
                        Price
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-lg text-neutral-900">
                          ${item.discountedPrice || item.price}
                        </span>
                        {item.discountedPrice && (
                          <span className="text-xs text-neutral-400 line-through">
                            ${item.price}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white shadow-none hover:shadow-md transition-all"
                    >
                      <ShoppingCart size={14} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
              <Search className="w-10 h-10 text-neutral-300" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">
              No food found
            </h3>
            <p className="text-neutral-500 max-w-xs mx-auto mb-6">
              We couldn't find any items matching your filters. Try adjusting
              your search or categories.
            </p>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => {
                setActiveCategory("All");
                setActiveSubCategory("All");
                setSearchQuery("");
                setOnlyVeg(false);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
