"use client";

import { useState } from "react";
import Image from "next/image";
import {
  User,
  MapPin,
  ShoppingBag,
  Settings,
  LogOut,
  Camera,
  Edit2,
  Plus,
  Home,
  Briefcase,
  ChevronRight,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Shield,
  Bell,
  Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

// Mock User Data
const MOCK_USER = {
  name: "Alex Johnson",
  email: "alex.johnson@example.com",
  phone: "+1 (555) 012-3456",
  avatar:
    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=256&auto=format&fit=crop",
  memberSince: "August 2023",
  totalOrders: 24,
  savedAmount: 145.5,
};

const SAVED_ADDRESSES = [
  {
    id: 1,
    type: "Home",
    address: "123 Green Valley Apartments, Main Street, New York, NY 10001",
    isDefault: true,
  },
  {
    id: 2,
    type: "Work",
    address: "456 Tech Park, Innovation Blvd, San Francisco, CA 94016",
    isDefault: false,
  },
];

const SAVED_PAYMENT_METHODS: any[] = [
  // {
  //   id: 1,
  //   type: "Visa",
  //   last4: "4242",
  //   expiry: "12/28",
  //   isDefault: true,
  // },
];

// Profile Completion Logic
interface CompletionItem {
  id: string;
  label: string;
  isCompleted: boolean;
  actionLabel: string;
  actionUrl: string; // Using tab values or actual URLs
  icon: any;
}

const getCompletionStatus = () => {
  const items: CompletionItem[] = [
    {
      id: "name",
      label: "Full Name",
      isCompleted: !!MOCK_USER.name,
      actionLabel: "Add Name",
      actionUrl: "profile",
      icon: User,
    },
    {
      id: "email",
      label: "Email Address",
      isCompleted: !!MOCK_USER.email,
      actionLabel: "Add Email",
      actionUrl: "profile",
      icon: Edit2,
    },
    {
      id: "phone",
      label: "Phone Number",
      isCompleted: !!MOCK_USER.phone,
      actionLabel: "Add Phone",
      actionUrl: "profile",
      icon: Edit2,
    },
    {
      id: "avatar",
      label: "Profile Picture",
      isCompleted: !!MOCK_USER.avatar,
      actionLabel: "Upload Photo",
      actionUrl: "profile",
      icon: Camera,
    },
    {
      id: "address",
      label: "Delivery Address",
      isCompleted: SAVED_ADDRESSES.length > 0,
      actionLabel: "Add Address",
      actionUrl: "addresses",
      icon: MapPin,
    },
    {
      id: "payment",
      label: "Payment Method",
      isCompleted: SAVED_PAYMENT_METHODS.length > 0,
      actionLabel: "Add Payment Method",
      actionUrl: "payments",
      icon: CreditCard,
    },
  ];

  const completedCount = items.filter((i) => i.isCompleted).length;
  const totalCount = items.length;
  const percentage = Math.round((completedCount / totalCount) * 100);

  return { items, percentage, completedCount, totalCount };
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);

  const completionStatus = getCompletionStatus();

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-20">
      {/* Profile Header / Cover */}
      <div className="relative h-60 bg-neutral-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop"
          alt="Profile Cover"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent" />
      </div>

      <div className="container mx-auto px-4 max-w-5xl -mt-20 relative z-10">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Left Sidebar: Profile Card & Nav */}
          <div className="w-full md:w-80 space-y-6">
            <Card className="border-none shadow-xl overflow-hidden rounded-3xl">
              <CardContent className="p-6 flex flex-col items-center text-center pt-10">
                <div className="relative mb-4 group cursor-pointer">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage
                      src={MOCK_USER.avatar}
                      className="object-cover"
                    />
                    <AvatarFallback className="text-4xl bg-primary text-white">
                      AJ
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-md group-hover:scale-110 transition-transform">
                    <Camera size={18} />
                  </div>
                </div>

                <h2 className="text-2xl font-bold font-heading mb-1">
                  {MOCK_USER.name}
                </h2>
                <p className="text-neutral-500 mb-6">{MOCK_USER.email}</p>

                <div className="grid grid-cols-2 gap-4 w-full mb-6">
                  <div className="bg-primary/5 p-3 rounded-2xl">
                    <p className="text-2xl font-bold text-primary">
                      {MOCK_USER.totalOrders}
                    </p>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
                      Orders
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-2xl">
                    <p className="text-2xl font-bold text-green-600">
                      ${MOCK_USER.savedAmount}
                    </p>
                    <p className="text-xs font-bold text-neutral-500 uppercase tracking-wide">
                      Saved
                    </p>
                  </div>
                </div>

                <Separator className="mb-6" />

                <p className="text-xs text-neutral-400 font-medium">
                  Member since {MOCK_USER.memberSince}
                </p>

                <Separator className="my-6" />

                {/* Profile Completion Widget */}
                <div className="w-full text-left">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-neutral-700">
                      Profile Completion
                    </span>
                    <span className="text-sm font-bold text-primary">
                      {completionStatus.percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-neutral-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${completionStatus.percentage}%` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400 mt-2">
                    {completionStatus.percentage === 100
                      ? "Great job! Your profile is fully set up."
                      : `${completionStatus.completedCount}/${completionStatus.totalCount} steps completed`}
                  </p>
                </div>
              </CardContent>
            </Card>

            <nav className="hidden md:flex flex-col gap-2">
              <NavButton
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
                icon={<User size={18} />}
              >
                Personal Info
              </NavButton>
              <NavButton
                active={activeTab === "orders"}
                onClick={() => setActiveTab("orders")}
                icon={<ShoppingBag size={18} />}
              >
                My Orders
              </NavButton>
              <NavButton
                active={activeTab === "addresses"}
                onClick={() => setActiveTab("addresses")}
                icon={<MapPin size={18} />}
              >
                Addresses
              </NavButton>
              <NavButton
                active={activeTab === "payments"}
                onClick={() => setActiveTab("payments")}
                icon={<CreditCard size={18} />}
              >
                Payments
              </NavButton>
              <NavButton
                active={activeTab === "settings"}
                onClick={() => setActiveTab("settings")}
                icon={<Settings size={18} />}
              >
                Settings
              </NavButton>
              <NavButton
                active={false}
                onClick={() => {}}
                className="text-red-500 hover:bg-red-50 hover:text-red-600 mt-4"
                icon={<LogOut size={18} />}
              >
                Log Out
              </NavButton>
            </nav>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 w-full">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="md:hidden w-full mb-6 h-auto p-1 bg-white border shadow-sm rounded-xl overflow-x-auto justify-start">
                <TabsTrigger value="profile" className="rounded-lg">
                  Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="rounded-lg">
                  Orders
                </TabsTrigger>
                <TabsTrigger value="addresses" className="rounded-lg">
                  Addresses
                </TabsTrigger>
                <TabsTrigger value="settings" className="rounded-lg">
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile" className="mt-0">
                {/* Missing Setup Section */}
                {completionStatus.percentage < 100 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                      <AlertCircle className="text-orange-500" size={20} />
                      Complete Your Profile
                    </h3>
                    <div className="grid gap-3">
                      {completionStatus.items
                        .filter((item) => !item.isCompleted)
                        .map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setActiveTab(item.actionUrl)}
                            className="bg-white border border-orange-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-orange-200 transition-all group"
                          >
                            <div className="flex items-center gap-4">
                              <div className="bg-orange-50 text-orange-600 p-2.5 rounded-full group-hover:bg-orange-100 transition-colors">
                                <item.icon size={18} />
                              </div>
                              <div>
                                <h4 className="font-bold text-neutral-800">
                                  {item.actionLabel}
                                </h4>
                                <p className="text-sm text-neutral-500">
                                  Required to complete your profile
                                </p>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            >
                              Setup <ChevronRight size={16} className="ml-1" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="border-b border-neutral-100 p-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Personal Information
                      </CardTitle>
                      <CardDescription>
                        Manage your personal details
                      </CardDescription>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="gap-2 rounded-full font-bold border-primary/20 text-primary hover:bg-primary/5 hover:text-primary"
                    >
                      {isEditing ? (
                        "Cancel"
                      ) : (
                        <>
                          <Edit2 size={14} /> Edit Profile
                        </>
                      )}
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input
                          id="fullName"
                          defaultValue={MOCK_USER.name}
                          disabled={!isEditing}
                          className="h-11 bg-neutral-50 border-neutral-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          defaultValue={MOCK_USER.email}
                          disabled={!isEditing}
                          className="h-11 bg-neutral-50 border-neutral-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          defaultValue={MOCK_USER.phone}
                          disabled={!isEditing}
                          className="h-11 bg-neutral-50 border-neutral-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          disabled={!isEditing}
                          className="h-11 bg-neutral-50 border-neutral-200"
                        />
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end pt-4">
                        <Button className="rounded-xl px-8 font-bold shadow-lg shadow-primary/20">
                          Save Changes
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses" className="mt-0">
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="border-b border-neutral-100 p-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        My Addresses
                      </CardTitle>
                      <CardDescription>
                        Manage your delivery locations
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      className="gap-2 rounded-full font-bold shadow-lg shadow-primary/20"
                    >
                      <Plus size={16} /> Add New
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 grid gap-4">
                    {SAVED_ADDRESSES.map((addr) => (
                      <div
                        key={addr.id}
                        className="border border-neutral-100 rounded-2xl p-4 md:p-6 flex items-start gap-4 hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer relative bg-neutral-50/50"
                      >
                        <div
                          className={`p-3 rounded-xl shrink-0 ${
                            addr.type === "Home"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-purple-100 text-purple-600"
                          }`}
                        >
                          {addr.type === "Home" ? (
                            <Home size={20} />
                          ) : (
                            <Briefcase size={20} />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg">{addr.type}</h4>
                            {addr.isDefault && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700 hover:bg-green-100"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-neutral-500 text-sm leading-relaxed max-w-md">
                            {addr.address}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-neutral-200 rounded-full"
                          >
                            <Edit2 size={14} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="payments" className="mt-0">
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="border-b border-neutral-100 p-6 flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-xl font-bold">
                        Payment Methods
                      </CardTitle>
                      <CardDescription>
                        Manage your saved cards and wallets
                      </CardDescription>
                    </div>
                    <Button
                      size="sm"
                      className="gap-2 rounded-full font-bold shadow-lg shadow-primary/20"
                    >
                      <Plus size={16} /> Add New
                    </Button>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 grid gap-4">
                    {SAVED_PAYMENT_METHODS.map((method) => (
                      <div
                        key={method.id}
                        className="border border-neutral-100 rounded-2xl p-4 md:p-6 flex items-center gap-4 hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer relative bg-neutral-50/50"
                      >
                        <div className="p-3 rounded-xl shrink-0 bg-neutral-100 text-neutral-600">
                          <CreditCard size={24} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-lg">
                              {method.type} •••• {method.last4}
                            </h4>
                            {method.isDefault && (
                              <Badge
                                variant="secondary"
                                className="bg-green-100 text-green-700 hover:bg-green-100"
                              >
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-neutral-500 text-sm">
                            Expires {method.expiry}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 hover:bg-neutral-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Edit2 size={14} />
                        </Button>
                      </div>
                    ))}

                    {SAVED_PAYMENT_METHODS.length === 0 && (
                      <div className="text-center py-12">
                        <div className="bg-neutral-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-neutral-400">
                          <CreditCard size={32} />
                        </div>
                        <h3 className="font-bold text-lg text-neutral-900 mb-2">
                          No payment methods
                        </h3>
                        <p className="text-neutral-500 max-w-xs mx-auto mb-6">
                          Add a credit card or debit card to checkout faster.
                        </p>
                        <Button variant="outline" className="rounded-full">
                          Add Payment Method
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="mt-0">
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                  <CardHeader className="border-b border-neutral-100 p-6">
                    <CardTitle className="text-xl font-bold">
                      Account Settings
                    </CardTitle>
                    <CardDescription>
                      Manage preferences and security
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 md:p-8 space-y-6">
                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <Bell size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">
                            Push Notifications
                          </p>
                          <p className="text-sm text-neutral-500">
                            Receive order updates and offers
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-500 hidden md:block">
                          On
                        </span>
                        <div className="w-11 h-6 bg-primary rounded-full relative cursor-pointer">
                          <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                          <Moon size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">
                            Dark Mode
                          </p>
                          <p className="text-sm text-neutral-500">
                            Switch between light and dark themes
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-neutral-500 hidden md:block">
                          Off
                        </span>
                        <div className="w-11 h-6 bg-neutral-200 rounded-full relative cursor-pointer">
                          <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                          <Shield size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-neutral-900">
                            Two-Factor Authentication
                          </p>
                          <p className="text-sm text-neutral-500">
                            Add an extra layer of security
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full"
                      >
                        Enable
                      </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-xl hover:bg-neutral-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                          <LogOut size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-red-600">
                            Delete Account
                          </p>
                          <p className="text-sm text-neutral-500">
                            Permanently delete your account and data
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                      >
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white p-12 text-center">
                  <ShoppingBag className="w-16 h-16 text-neutral-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">
                    No active orders
                  </h3>
                  <p className="text-neutral-500 mb-6">
                    Check the Orders page for your history.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-full"
                    onClick={() => (window.location.href = "/orders")}
                  >
                    View All Orders
                  </Button>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ active, children, icon, onClick, className = "" }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 ${
        active
          ? "bg-primary text-white shadow-lg shadow-primary/25 translate-x-1"
          : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
      } ${className}`}
    >
      {icon}
      {children}
      {active && <ChevronRight size={16} className="ml-auto" />}
    </button>
  );
}
