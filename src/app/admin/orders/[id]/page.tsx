"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  MapPin,
  MoreVertical,
  Printer,
  ShoppingBag,
  Truck,
  User,
  Copy,
  CheckCircle2,
  XCircle,
  Clock,
  ChefHat,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock Data Lookup
const getOrderById = (id: string) => {
  // Simulating data fetch
  return {
    id: id,
    createdAt: "Feb 03, 2024 at 10:30 AM",
    status: "Processing",
    customer: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 (555) 123-4567",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    },
    shippingAddress: {
      street: "123 Maple Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billingAddress: {
      street: "123 Maple Avenue",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    payment: {
      method: "Visa",
      last4: "4242",
      status: "Paid",
    },
    items: [
      {
        id: 1,
        name: "The Royal Burger",
        quantity: 2,
        price: 18.0,
        image:
          "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=200&auto=format&fit=crop",
      },
      {
        id: 2,
        name: "Large Fries",
        quantity: 1,
        price: 6.5,
        image:
          "https://images.unsplash.com/photo-1541592106381-b31e9674c0e5?q=80&w=200&auto=format&fit=crop",
      },
    ],
    subtotal: 42.5,
    shippingCost: 5.0,
    tax: 3.8,
    total: 51.3,
  };
};

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const initialOrder = getOrderById(id);
  const [order, setOrder] = useState(initialOrder);

  const handleCopyId = () => {
    navigator.clipboard.writeText(order.id);
    toast.success("Order ID copied to clipboard");
  };

  const handleStatusUpdate = (newStatus: string) => {
    setOrder((prev) => ({ ...prev, status: newStatus }));
    toast.success(`Order status updated to ${newStatus}`);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      case "processing":
        return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-700 hover:bg-red-100 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-yellow-200";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full"
            asChild
          >
            <Link href="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                Order #{order.id}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                  onClick={handleCopyId}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </h1>
              <Badge
                variant="outline"
                className={`rounded-full px-3 py-0.5 border-0 ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              {order.createdAt}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                Update Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleStatusUpdate("Pending")}>
                <Clock className="mr-2 h-4 w-4 text-yellow-500" /> Mark as
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleStatusUpdate("Processing")}
              >
                <ChefHat className="mr-2 h-4 w-4 text-blue-500" /> Mark as
                Processing
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleStatusUpdate("Delivered")}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Mark as
                Delivered
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleStatusUpdate("Cancelled")}
                className="text-red-600 focus:text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" /> Cancel Order
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="default"
            className="gap-2 shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90"
          >
            <Printer className="h-4 w-4" />
            Print Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content: Order Items */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>
                {order.items.length} items in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
                  >
                    <div className="h-20 w-20 relative rounded-xl overflow-hidden bg-secondary/20 border border-border/50 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="object-cover h-full w-full"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-foreground truncate">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>${order.shippingCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between text-sm p-3 bg-secondary/10 rounded-lg border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="bg-white p-1.5 rounded-md border border-border/50">
                    <CreditCard className="h-5 w-5 text-zinc-600" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">
                      Payment via {order.payment.method}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      **** **** **** {order.payment.last4}
                    </span>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700 hover:bg-green-100 border-none"
                >
                  {order.payment.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar: Customer Info */}
        <div className="space-y-6">
          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 pb-6 border-b border-border/50">
                <div className="h-12 w-12 rounded-full overflow-hidden bg-primary/10">
                  <img
                    src={order.customer.avatar}
                    alt={order.customer.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-foreground truncate">
                    {order.customer.name}
                  </p>
                  <p className="text-sm text-primary truncate hover:underline cursor-pointer">
                    View Profile
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="mt-0.5 bg-secondary/30 p-1.5 rounded-md h-fit">
                    <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">12 Orders</p>
                    <p className="text-xs text-muted-foreground">
                      Previous orders
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="mt-0.5 bg-secondary/30 p-1.5 rounded-md h-fit">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-sm truncate">
                      {order.customer.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {order.customer.phone}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-secondary/5 border-t border-border/50 py-3">
              <Button variant="ghost" className="w-full text-xs h-8">
                View Customer Details
              </Button>
            </CardFooter>
          </Card>

          <Card className="shadow-sm border-border/60">
            <CardHeader>
              <CardTitle>Delivery Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 bg-secondary/30 p-1.5 rounded-md h-fit">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <address className="text-sm not-italic flex-1 text-muted-foreground">
                  <span className="font-medium text-foreground block mb-1">
                    Home
                  </span>
                  {order.shippingAddress.street}
                  <br />
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.zip}
                  <br />
                  {order.shippingAddress.country}
                </address>
              </div>

              <div className="flex gap-3 items-start pt-4 border-t border-border/50">
                <div className="mt-0.5 bg-secondary/30 p-1.5 rounded-md h-fit">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">
                    Standard Delivery
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ID: #TRK-885912
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
