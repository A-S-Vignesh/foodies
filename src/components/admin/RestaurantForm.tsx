"use client";

import { useState } from "react";
import { Loader2, Upload, MapPin, Image as ImageIcon, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RestaurantFormProps {
  initialData?: any;
}

const CUISINES = [
  "Italian",
  "Chinese",
  "Japanese",
  "Indian",
  "Mexican",
  "Thai",
  "American",
  "French",
  "Mediterranean",
  "Healthy",
];

export function RestaurantForm({ initialData }: RestaurantFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(
    initialData?.logo || null
  );
  const [coverPreview, setCoverPreview] = useState<string | null>(
    initialData?.coverImage || null
  );

  const [tags, setTags] = useState<string[]>(initialData?.tags || []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setLogoPreview(objectUrl);
      toast.success("Logo uploaded successfully");
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setCoverPreview(objectUrl);
      toast.success("Cover image uploaded successfully");
    }
  };

  const toggleTag = (tag: string) => {
    if (tags.includes(tag)) {
      setTags(tags.filter((t) => t !== tag));
    } else {
      if (tags.length < 3) {
        setTags([...tags, tag]);
      } else {
        toast.error("You can only select up to 3 cuisines");
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        initialData
          ? "Restaurant updated successfully"
          : "Restaurant created successfully"
      );
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      {/* Cover Image Section */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-muted border border-border group">
        {coverPreview ? (
          <img
            src={coverPreview}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-muted-foreground">
            <ImageIcon className="w-10 h-10 mb-2" />
            <span className="text-sm">Upload Cover Image</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button
            type="button"
            variant="secondary"
            onClick={() => document.getElementById("cover-upload")?.click()}
          >
            <Upload className="w-4 h-4 mr-2" /> Change Cover
          </Button>
        </div>
        <input
          id="cover-upload"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleCoverUpload}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Identity & Status */}
        <div className="space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Branding</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center gap-4">
                <div
                  className="relative group cursor-pointer"
                  onClick={() =>
                    document.getElementById("logo-upload")?.click()
                  }
                >
                  <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                    <AvatarImage src={logoPreview || ""} />
                    <AvatarFallback>Logo</AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs">
                    Edit
                  </div>
                </div>
                <input
                  id="logo-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                />
                <p className="text-xs text-muted-foreground text-center">
                  Recommended 512x512px
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={initialData?.status || "active"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active (Open)</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="priceRange">Price Range</Label>
                <Select defaultValue={initialData?.priceRange || "$$"}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="$">$ (Budget)</SelectItem>
                    <SelectItem value="$$">$$ (Average)</SelectItem>
                    <SelectItem value="$$$">$$$ (Premium)</SelectItem>
                    <SelectItem value="$$$$">$$$$ (Luxury)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Restaurant Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. The Italian Place"
                    defaultValue={initialData?.name}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug (Unique)</Label>
                  <Input
                    id="slug"
                    placeholder="the-italian-place"
                    defaultValue={initialData?.slug}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Business Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="owner@place.com"
                    defaultValue={initialData?.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    defaultValue={initialData?.phone}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Short Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers about your restaurant..."
                  className="h-24 resize-none"
                  defaultValue={initialData?.description}
                />
              </div>

              <div className="space-y-3">
                <Label>Cuisines (Select up to 3)</Label>
                <div className="flex flex-wrap gap-2">
                  {CUISINES.map((cuisine) => (
                    <div
                      key={cuisine}
                      onClick={() => toggleTag(cuisine)}
                      className={`px-3 py-1 rounded-full text-sm font-medium border cursor-pointer transition-colors ${
                        tags.includes(cuisine)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary"
                      }`}
                    >
                      {cuisine}
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="street">Street Address</Label>
                <Input
                  id="street"
                  placeholder="123 Main St"
                  defaultValue={initialData?.address?.street}
                />
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="New York"
                    defaultValue={initialData?.address?.city}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="NY"
                    defaultValue={initialData?.address?.state}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input
                    id="zip"
                    placeholder="10001"
                    defaultValue={initialData?.address?.zip}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90 min-w-[150px]"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : initialData ? (
                "Update Restaurant"
              ) : (
                "Create Restaurant"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
