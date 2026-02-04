"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  MapPin,
  ChevronRight,
  RefreshCw,
  ShoppingBag,
  Utensils,
  ChefHat,
  Truck,
  PackageCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data
const activeOrders = [
  {
    id: "ORD-7782",
    restaurant: "The Royal Burger",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1899&auto=format&fit=crop",
    status: "Preparation", // Order Placed -> Preparation -> On the Way -> Delivered
    statusStep: 2, // 1 to 4
    date: "Today, 10:23 AM",
    total: "$32.50",
    items: [
      { name: "Classic Cheeseburger", quantity: 2 },
      { name: "Large Fries", quantity: 1 },
      { name: "Coke Zero", quantity: 1 },
    ],
    tracking: true,
  },
];

const pastOrders = [
  {
    id: "ORD-5541",
    restaurant: "Sushi Master",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2070&auto=format&fit=crop",
    status: "Delivered",
    date: "Yesterday, 8:15 PM",
    total: "$45.00",
    items: [
      { name: "Salmon Roll", quantity: 1 },
      { name: "Spicy Tuna", quantity: 1 },
      { name: "Miso Soup", quantity: 2 },
    ],
    tracking: false,
  },
  {
    id: "ORD-3329",
    restaurant: "La Piazza Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop",
    status: "Delivered",
    date: "Dec 20, 1:30 PM",
    total: "$28.90",
    items: [
      { name: "Margherita Pizza", quantity: 1 },
      { name: "Garlic Bread", quantity: 1 },
    ],
    tracking: false,
  },
  {
    id: "ORD-1102",
    restaurant: "Spice Garden",
    image:
      "https://images.unsplash.com/photo-1585937421612-70a008356f36?q=80&w=2070&auto=format&fit=crop",
    status: "Cancelled",
    date: "Dec 15, 7:45 PM",
    total: "$18.50",
    items: [
      { name: "Chicken Curry", quantity: 1 },
      { name: "Naan", quantity: 2 },
    ],
    tracking: false,
  },
];

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20 pt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-2">
              My Orders
            </h1>
            <p className="text-muted-foreground">
              Track current orders and view your history.
            </p>
          </div>
          <Button variant="outline" className="rounded-full" asChild>
            <Link href="/menu">Browse Menu</Link>
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8 bg-muted p-1 rounded-full h-auto">
            <TabsTrigger
              value="active"
              className="rounded-full py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all font-bold text-muted-foreground"
            >
              Active Orders
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="rounded-full py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm transition-all font-bold text-muted-foreground"
            >
              Past Orders
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-6">
            {activeOrders.length > 0 ? (
              activeOrders.map((order) => (
                <OrderCard key={order.id} order={order} isActive={true} />
              ))
            ) : (
              <EmptyState
                title="No Active Orders"
                message="You don't have any orders in progress right now."
              />
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-6">
            {pastOrders.map((order) => (
              <OrderCard key={order.id} order={order} isActive={false} />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrderCard({ order, isActive }: { order: any; isActive: boolean }) {
  const getStatusColor = (status: string) => {
    if (status === "Delivered")
      return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
    if (status === "Cancelled")
      return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
    return "bg-primary/10 text-primary hover:bg-primary/20 border-primary/20";
  };

  const getStepStatus = (step: number) => {
    if (order.statusStep > step) return "completed";
    if (order.statusStep === step) return "current";
    return "pending";
  };

  return (
    <Card
      className={`border-none shadow-sm hover:shadow-md transition-shadow bg-card overflow-hidden rounded-2xl ${
        isActive ? "ring-2 ring-primary/5" : ""
      }`}
    >
      <CardHeader className="p-0">
        <div className="flex flex-col md:flex-row gap-5 p-6 border-b border-border/40">
          {/* Restaurant Info */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative h-16 w-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0 border border-border/50">
              <Image
                src={order.image}
                alt={order.restaurant}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground font-heading">
                {order.restaurant}
              </h3>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mt-0.5">
                <span className="font-medium">{order.items.length} Items</span>
                <span>•</span>
                <span>{order.date}</span>
              </div>
            </div>
          </div>

          {/* Status & Total */}
          <div className="flex flex-col md:items-end justify-center gap-2">
            <Badge
              variant="outline"
              className={`w-fit px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(
                order.status
              )}`}
            >
              {order.status === "Delivered" && (
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              )}
              {isActive && (
                <Clock className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
              )}
              {order.status}
            </Badge>
            <span className="font-bold text-lg text-foreground font-heading">
              {order.total}
            </span>
          </div>
        </div>
      </CardHeader>

      {isActive && (
        <div className="px-6 py-4 bg-secondary/20 border-b border-border/40">
          <div className="relative flex items-center justify-between w-full max-w-2xl mx-auto my-2">
            {/* Progress Bar Background */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-muted rounded-full -z-10" />
            {/* Active Progress */}
            <div
              className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full -z-10 transition-all duration-1000"
              style={{ width: `${((order.statusStep - 1) / 3) * 100}%` }}
            />

            {[
              { icon: Utensils, label: "Placed" },
              { icon: ChefHat, label: "Prep" },
              { icon: Truck, label: "On Way" },
              { icon: PackageCheck, label: "Delivered" },
            ].map((step, idx) => {
              const stepNum = idx + 1;
              const status = getStepStatus(stepNum);
              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      status === "completed" || status === "current"
                        ? "bg-primary border-primary text-white scale-110"
                        : "bg-background border-muted text-muted-foreground"
                    }`}
                  >
                    <step.icon size={14} />
                  </div>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider ${
                      status === "current"
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <CardContent className="p-6 bg-muted/20">
        <ul className="space-y-3">
          {order.items.map((item: any, idx: number) => (
            <li
              key={idx}
              className="text-muted-foreground text-sm flex gap-3 items-center"
            >
              <span className="font-bold text-foreground bg-background border border-border px-2 py-0.5 rounded text-xs min-w-[24px] text-center shadow-sm">
                {item.quantity}x
              </span>
              <span className="font-medium">{item.name}</span>
            </li>
          ))}
        </ul>
        {order.items.length > 3 && (
          <p className="text-xs text-muted-foreground mt-3 ml-10 font-medium">
            + {order.items.length - 3} more items
          </p>
        )}
      </CardContent>

      <CardFooter className="p-4 bg-card flex flex-col sm:flex-row justify-end gap-3 border-t border-border/40">
        {isActive ? (
          <div className="w-full flex justify-between items-center bg-primary/5 p-3 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-primary animate-bounce-slow">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  Arriving in 15 mins
                </p>
                <p className="text-xs text-muted-foreground">
                  Your rider is on the way
                </p>
              </div>
            </div>
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 font-bold px-6">
              Track Map
              <MapPin className="w-4 h-4 ml-2" />
            </Button>
          </div>
        ) : (
          <>
            <Button
              variant="outline"
              className="rounded-full border-border hover:bg-secondary text-foreground font-semibold"
            >
              View Receipt
            </Button>
            <Button
              variant="ghost"
              className="rounded-full text-primary hover:text-primary hover:bg-primary/10 font-bold"
            >
              Reorder
              <RefreshCw className="w-4 h-4 ml-2" />
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

function EmptyState({ title, message }: { title: string; message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-24 h-24 bg-muted/50 rounded-full flex items-center justify-center mb-6">
        <ShoppingBag className="w-12 h-12 text-muted-foreground/50" />
      </div>
      <h3 className="text-xl font-bold text-foreground font-heading mb-2">
        {title}
      </h3>
      <p className="text-muted-foreground max-w-sm mb-8">{message}</p>
      <Button
        className="rounded-full bg-primary hover:bg-primary/90 text-white px-8 font-bold shadow-lg shadow-primary/20"
        asChild
      >
        <Link href="/menu">Browse Menu</Link>
      </Button>
    </div>
  );
}
