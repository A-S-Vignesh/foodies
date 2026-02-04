"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Star,
  Clock,
  Heart,
  Minus,
  Plus,
  Share2,
  ChevronRight,
  Utensils,
  MapPin,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock Data (Expanded for Details)
const FOOD_ITEMS: Record<string, any> = {
  "the-royal-burger": {
    id: 1,
    name: "The Royal Burger",
    price: 18.0,
    rating: 4.8,
    reviews: "2.1k",
    description:
      "A culinary masterpiece featuring a juicy, flame-grilled wagyu beef patty topped with melted aged cheddar, crispy artisanal bacon, fresh organic lettuce, vine-ripened tomatoes, and our secret signature truffle sauce, all nestled in a toasted brioche bun.",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=1000&auto=format&fit=crop",
    ],
    time: "25-35 min",
    calories: "850 kcal",
    protein: "45g",
    carbs: "60g",
    fat: "35g",
    ingredients: [
      "Wagyu Beef Patty",
      "Aged Cheddar Cheese",
      "Crispy Bacon",
      "Brioche Bun",
      "Truffle Sauce",
      "Organic Lettuce",
    ],
    isVeg: false,
    restaurant: "The Royal Burger",
  },
  "sushi-master": {
    // fallback for demo if needed
    id: 2,
    name: "Sushi Platter",
    price: 24.0,
    rating: 4.9,
    reviews: "1.8k",
    description:
      "Freshly caught Atlantic salmon served with perfectly seasoned sushi rice.",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=1000&auto=format&fit=crop",
    isVeg: false,
  },
};

import { useCart } from "@/context/CartContext";

export default function FoodDetailsPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addToCart } = useCart();

  // Fallback to first item if slug not found (for demo resilience)
  const product = FOOD_ITEMS[slug] || FOOD_ITEMS["the-royal-burger"];

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(
    product.images?.[0] || product.image
  );

  const handleAddToCart = () => {
    addToCart({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      restaurant: product.restaurant,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/menu" className="hover:text-primary transition-colors">
            Menu
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium truncate max-w-[200px]">
            {product.name}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column: Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-border/50 shadow-lg bg-secondary/10">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
                priority
              />
              <div className="absolute top-4 right-4 z-10">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full h-10 w-10 bg-white/80 backdrop-blur-md hover:bg-white text-foreground hover:text-red-500 shadow-sm"
                >
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </div>
            {product.images && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-24 h-24 rounded-xl overflow-hidden border-2 flex-shrink-0 transition-all ${
                      activeImage === img
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent hover:border-border"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details */}
          <div className="flex flex-col h-full">
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={product.isVeg ? "outline" : "outline"}
                      className={`border-${
                        product.isVeg ? "green" : "red"
                      }-600 text-${product.isVeg ? "green" : "red"}-600 bg-${
                        product.isVeg ? "green" : "red"
                      }-50 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider`}
                    >
                      {product.isVeg ? "Veg" : "Non-Veg"}
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-none font-bold text-[10px] uppercase tracking-wider"
                    >
                      Bestseller
                    </Badge>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-bold font-heading text-foreground mb-2 leading-tight">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground text-lg font-light">
                    {product.restaurant}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-6 pb-6 border-b border-border/50">
                <div>
                  <span className="text-3xl font-bold text-primary font-heading">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-border/60"></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{product.rating}</span>
                  </div>
                  <span className="text-xs text-muted-foreground underline">
                    {product.reviews} reviews
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-border/60"></div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1 font-bold text-lg">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span>{product.time}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Delivery time
                  </span>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed text-lg mb-8">
              {product.description}
            </p>

            {/* Actions */}
            <div className="mt-auto pt-6 border-t border-border/50 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center bg-secondary/30 rounded-full p-1 border border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="rounded-full h-10 w-10 hover:bg-background"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                    className="rounded-full h-10 w-10 hover:bg-background"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="text-right">
                  <span className="text-sm text-muted-foreground block">
                    Total Price
                  </span>
                  <span className="text-2xl font-bold text-foreground">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 rounded-full text-lg h-14 font-bold shadow-lg shadow-primary/25 bg-primary hover:bg-primary/90"
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full w-14 h-14 p-0 border-2 border-border/60 hover:border-primary/50 hover:bg-primary/5 hover:text-primary"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <Tabs defaultValue="about" className="w-full">
            <TabsList className="w-full justify-start border-b border-border/40 rounded-none bg-transparent h-auto p-0 gap-8">
              <TabsTrigger
                value="about"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-0 font-bold text-lg text-muted-foreground data-[state=active]:text-foreground"
              >
                About
              </TabsTrigger>
              <TabsTrigger
                value="ingredients"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-0 font-bold text-lg text-muted-foreground data-[state=active]:text-foreground"
              >
                Ingredients
              </TabsTrigger>
              <TabsTrigger
                value="nutrition"
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none py-3 px-0 font-bold text-lg text-muted-foreground data-[state=active]:text-foreground"
              >
                Nutrition
              </TabsTrigger>
            </TabsList>

            <TabsContent value="about" className="py-8">
              <h3 className="text-xl font-bold font-heading mb-4">
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed max-w-4xl">
                {product.description}
                <br />
                <br />
                Prepared fresh daily using locally sourced ingredients. Our
                chefs ensure every bite is packed with flavor and cooked to
                perfection.
              </p>
            </TabsContent>

            <TabsContent value="ingredients" className="py-8">
              <h3 className="text-xl font-bold font-heading mb-4">
                What's Inside
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.ingredients?.map((ing: string, i: number) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-secondary/20 p-4 rounded-xl border border-border/40"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <span className="font-medium text-foreground">{ing}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="nutrition" className="py-8">
              <h3 className="text-xl font-bold font-heading mb-4">
                Nutritional Facts
              </h3>
              <div className="flex flex-wrap gap-8">
                {[
                  { label: "Calories", val: product.calories },
                  { label: "Protein", val: product.protein },
                  { label: "Carbs", val: product.carbs },
                  { label: "Fat", val: product.fat },
                ].map((nut, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center justify-center w-28 h-28 rounded-full border-2 border-primary/10 bg-primary/5"
                  >
                    <span className="text-xl font-bold text-primary mb-1">
                      {nut.val}
                    </span>
                    <span className="text-xs font-bold text-muted-foreground uppercase">
                      {nut.label}
                    </span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
