"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Loader2,
  Save,
  MapPin,
  Bell,
  Shield,
  Clock,
} from "lucide-react";

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Settings saved successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your restaurant profile and system preferences.
        </p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-background border border-border/50 p-1 rounded-xl h-auto flex-wrap justify-start w-full md:w-fit">
          <TabsTrigger
            value="general"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="operations"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Operations
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="rounded-lg px-4 py-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
          >
            Security
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Restaurant Profile</CardTitle>
              <CardDescription>
                This information will be displayed to your customers.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input id="name" defaultValue="Food Restaurant" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="contact@foodrestaurant.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    defaultValue="+1 (555) 123-4567"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://foodrestaurant.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="h-32"
                  defaultValue="Experience the best culinary delights in town. We serve fresh, organic, and locally sourced food."
                />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-secondary/5 px-6 py-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save Changes
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Location</CardTitle>
              <CardDescription>
                Your physical store address for pickup and delivery calculation.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="address">Street Address</Label>
                <Input id="address" defaultValue="123 Culinary Avenue" />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" defaultValue="NY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input id="zip" defaultValue="10001" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-secondary/5 px-6 py-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                variant="outline"
              >
                Save Location
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Operations Settings */}
        <TabsContent value="operations" className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Delivery & Fees</CardTitle>
              <CardDescription>
                Configure your delivery parameters and service charges.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="deliveryFee">Base Delivery Fee ($)</Label>
                  <Input id="deliveryFee" type="number" defaultValue="2.99" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minOrder">Minimum Order ($)</Label>
                  <Input id="minOrder" type="number" defaultValue="15.00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="freeDelivery">Free Delivery Over ($)</Label>
                  <Input id="freeDelivery" type="number" defaultValue="50.00" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Estimated Delivery Time (minutes)</Label>
                <div className="flex items-center gap-2">
                  <Input className="w-24" defaultValue="30" />
                  <span className="text-muted-foreground">-</span>
                  <Input className="w-24" defaultValue="45" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-secondary/5 px-6 py-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90"
              >
                Update Operations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Alerts & Notifications</CardTitle>
              <CardDescription>
                Choose how you want to be notified about new orders.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive an email for every new order.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a text message on your registered phone.
                  </p>
                </div>
                <Switch />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Summary</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a daily performance report at 10 PM.
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
              <CardDescription>
                Update your password and secure your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label htmlFor="current">Current Password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new">New Password</Label>
                <Input id="new" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm">Confirm New Password</Label>
                <Input id="confirm" type="password" />
              </div>
            </CardContent>
            <CardFooter className="border-t border-border/50 bg-secondary/5 px-6 py-4">
              <Button
                onClick={handleSave}
                disabled={isLoading}
                variant="destructive"
              >
                Update Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
