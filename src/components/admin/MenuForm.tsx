"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

interface MenuFormProps {
  initialData?: any;
}

const CATEGORIES = [
  "Burgers",
  "Pizza",
  "Sushi",
  "Asian",
  "Mexican",
  "Healthy",
  "Desserts",
  "Drinks",
];

export function MenuForm({ initialData }: MenuFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(
    initialData?.image || null
  );

  // Mock Ingredient State
  const [ingredients, setIngredients] = useState<string[]>(
    initialData?.ingredients || []
  );
  const [newIngredient, setNewIngredient] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, upload to S3/Cloudinary here
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
      toast.success("Image uploaded successfully");
    }
  };

  const addIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        initialData ? "Item updated successfully" : "Item created successfully"
      );
      // In real app, redirect here
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media & Status */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-border/50 shadow-sm">
            <CardContent className="p-0">
              <div className="aspect-square relative bg-secondary/20 flex flex-col items-center justify-center border-b border-border/50 group">
                {imagePreview ? (
                  <>
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        Change Image
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-border/50">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Click to upload image
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      SVG, PNG, JPG or GIF (max. 2MB)
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </div>
              <div className="p-6 space-y-4 bg-card">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() =>
                    document.getElementById("image-upload")?.click()
                  }
                >
                  {imagePreview ? "Replace Image" : "Upload Image"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="available" className="flex flex-col gap-1">
                  <span>Available</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Show in menu
                  </span>
                </Label>
                <Switch
                  id="available"
                  defaultChecked={initialData?.available ?? true}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="featured" className="flex flex-col gap-1">
                  <span>Featured</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Show in promo sections
                  </span>
                </Label>
                <Switch
                  id="featured"
                  defaultChecked={initialData?.featured ?? false}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="veg" className="flex flex-col gap-1">
                  <span>Vegetarian</span>
                  <span className="font-normal text-xs text-muted-foreground">
                    Contains no meat
                  </span>
                </Label>
                <Switch id="veg" defaultChecked={initialData?.isVeg ?? false} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="name">Item Name</Label>
                  <Input
                    id="name"
                    placeholder="e.g. Classic Cheeseburger"
                    defaultValue={initialData?.name}
                    required
                  />
                </div>
                <div className="space-y-2 col-span-2 md:col-span-1">
                  <Label htmlFor="price">Price ($)</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    defaultValue={initialData?.price}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={initialData?.category || "Burgers"}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your delicious item..."
                  className="h-32 resize-none"
                  defaultValue={initialData?.description}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-sm">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Ingredients</Label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {ingredients.map((ing, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1 bg-secondary px-2.5 py-1 rounded-full text-sm font-medium"
                    >
                      {ing}
                      <button
                        type="button"
                        onClick={() => removeIngredient(i)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add ingredient (e.g. Cheese)"
                    onKeyDown={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addIngredient())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addIngredient}
                    size="icon"
                    variant="secondary"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
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
                "Save Changes"
              ) : (
                "Create Item"
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
