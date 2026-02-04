"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  ShoppingBag,
  Star,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock Customer Data
const getCustomer = (id: string) => ({
  id: id,
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  phone: "+1 (555) 123-4567",
  avatar:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
  status: "active",
  joinedDate: "January 12, 2024",
  totalSpent: 450.2,
  avgOrderValue: 37.5,
  ordersCount: 12,
  rating: 4.8,
  address: {
    street: "123 Maple Avenue, Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "USA",
  },
  recentOrders: [
    { id: "ORD-9281", date: "Feb 03, 2024", total: 42.5, status: "Processing" },
    { id: "ORD-8821", date: "Jan 28, 2024", total: 35.0, status: "Delivered" },
    { id: "ORD-7742", date: "Jan 15, 2024", total: 55.2, status: "Delivered" },
    { id: "ORD-6631", date: "Jan 05, 2024", total: 28.0, status: "Delivered" },
  ],
});

export default function CustomerProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const customer = getCustomer(id);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered":
        return "bg-green-100 text-green-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-zinc-100 text-zinc-600";
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          asChild
        >
          <Link href="/admin/customers">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Customer Profile
          </h1>
          <p className="text-muted-foreground text-sm">
            View details for {customer.firstName} {customer.lastName}.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar: Profile Card */}
        <div className="space-y-6">
          <Card className="border-border/60 shadow-md overflow-hidden relative">
            <div className="h-24 bg-gradient-to-r from-primary/80 to-primary/40" />
            <CardContent className="pt-0 pb-6 px-6 relative">
              <div className="absolute -top-12 left-6 border-4 border-background rounded-full shadow-sm">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={customer.avatar} />
                  <AvatarFallback className="text-2xl">
                    {customer.firstName[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="mt-14 mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {customer.firstName} {customer.lastName}
                </h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 capitalize"
                  >
                    {customer.status}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    Joined {customer.joinedDate}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:${customer.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {customer.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <address className="not-italic text-muted-foreground">
                    {customer.address.street}
                    <br />
                    {customer.address.city}, {customer.address.state}{" "}
                    {customer.address.zip}
                  </address>
                </div>
              </div>

              <Separator className="my-6" />

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Spent
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    ${customer.totalSpent.toFixed(0)}
                  </p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Orders
                  </p>
                  <p className="text-xl font-bold text-foreground">
                    {customer.ordersCount}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-sm">
            <CardHeader>
              <CardTitle className="text-base">Tags & Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">VIP</Badge>
                <Badge variant="secondary">Good Tipper</Badge>
                <Badge variant="secondary">Frequent Returns</Badge>
              </div>
              <p className="text-sm text-muted-foreground italic">
                "Customer prefers contactless delivery. Always orders extra
                sauce."
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content: Stats & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="border-border/50 bg-secondary/5">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <Wallet className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    ${customer.avgOrderValue.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Avg. Order Value
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-secondary/5">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <ShoppingBag className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{customer.ordersCount}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Total Orders
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-border/50 bg-secondary/5">
              <CardContent className="p-6 flex flex-col items-center justify-center text-center space-y-2">
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <Star className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{customer.rating}</p>
                  <p className="text-xs text-muted-foreground font-medium">
                    Avg. Review Score
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-border/60 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Order History</CardTitle>
                <CardDescription>
                  Recent purchases by this customer.
                </CardDescription>
              </div>
              <Button size="sm" variant="ghost">
                View All
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm text-left">
                  <thead className="[&_tr]:border-b bg-muted/40">
                    <tr className="border-b transition-colors data-[state=selected]:bg-muted">
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground">
                        Order ID
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground text-right">
                        Total
                      </th>
                      <th className="h-10 px-4 align-middle font-medium text-muted-foreground"></th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {customer.recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="border-b transition-colors hover:bg-muted/50"
                      >
                        <td className="p-4 align-middle font-medium">
                          {order.id}
                        </td>
                        <td className="p-4 align-middle text-muted-foreground">
                          {order.date}
                        </td>
                        <td className="p-4 align-middle">
                          <Badge
                            variant="outline"
                            className={`border-0 rounded-full font-normal ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                          </Badge>
                        </td>
                        <td className="p-4 align-middle text-right font-medium">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="p-4 align-middle text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0"
                            asChild
                          >
                            <Link href={`/admin/orders/${order.id}`}>
                              <MoreVertical className="h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
