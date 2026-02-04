"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Percent,
  ShieldCheck,
  Clock,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

// Mock Cart Data
const INITIAL_CART = [
  {
    id: 101,
    name: "The Royal Burger",
    price: 18.0,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop",
    restaurant: "The Royal Burger",
    description: "Extra cheese, no pickles",
    isVeg: false,
  },
  {
    id: 102,
    name: "Crispy French Fries",
    price: 6.5,
    quantity: 1,
    image:
      "https://images.unsplash.com/photo-1573080496987-a2283cb11b1d?q=80&w=1000&auto=format&fit=crop",
    restaurant: "The Royal Burger",
    description: "Medium Size",
    isVeg: true,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART);
  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: number, change: number) => {
    setCartItems((items) =>
      items
        .map((item) => {
          if (item.id === id) {
            return { ...item, quantity: Math.max(0, item.quantity + change) };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  // Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryFee = subtotal > 50 ? 0 : 5.0;
  const platformFee = 2.0;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + platformFee + taxes;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 pt-24">
        <div className="w-64 h-64 relative mb-8 animate-float">
          <Image
            src="/images/cart/empty.png"
            alt="Empty Cart"
            fill
            className="object-contain opacity-80"
          />
        </div>
        <h1 className="text-3xl font-bold font-heading text-neutral-900 mb-2 text-center">
          Your Cart is Empty
        </h1>
        <p className="text-muted-foreground text-center max-w-md mb-8 px-4">
          Looks like you haven't added anything to your cart yet. Go ahead and
          explore our menu!
        </p>
        <Button
          size="lg"
          className="rounded-full px-8 h-12 text-base font-bold shadow-lg shadow-primary/20"
          asChild
        >
          <Link href="/menu">Browse Restaurants</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 pb-24 pt-24">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold font-heading text-neutral-900 mb-8">
          Secure Checkout
        </h1>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-7 space-y-6">
            {/* Delivery Address Card */}
            <Card className="border-none shadow-sm rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white border border-neutral-100 p-3 rounded-xl shadow-sm">
                    <MapPin className="text-primary w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-bold text-lg text-foreground">
                        Delivery Address
                      </h3>
                      <Button
                        variant="link"
                        className="text-primary h-auto p-0 font-bold"
                      >
                        Change
                      </Button>
                    </div>
                    <p className="text-foreground font-medium">Home</p>
                    <p className="text-muted-foreground text-sm">
                      123, Green Valley Apartments, Main Street, New York, NY
                      10001
                    </p>

                    <div className="flex items-center gap-2 mt-3 text-sm text-green-600 font-bold bg-green-50 w-fit px-3 py-1 rounded-full">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Delivery in 35-40 mins</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between px-2">
              <span className="font-bold text-lg text-muted-foreground px-2">
                Items Added ({cartItems.length})
              </span>
            </div>

            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card
                  key={item.id}
                  className="border-none shadow-sm rounded-2xl overflow-hidden group hover:shadow-md transition-all"
                >
                  <CardContent className="p-4 flex gap-4">
                    {/* Item Image */}
                    <div className="relative h-24 w-24 rounded-xl overflow-hidden flex-shrink-0 bg-secondary/20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div
                                className={`w-3 h-3 border-2 rounded-sm flex items-center justify-center p-[1px] ${
                                  item.isVeg
                                    ? "border-green-600"
                                    : "border-red-600"
                                }`}
                              >
                                <div
                                  className={`w-full h-full rounded-full ${
                                    item.isVeg ? "bg-green-600" : "bg-red-600"
                                  }`}
                                />
                              </div>
                              <h3 className="font-bold text-lg text-foreground leading-tight">
                                {item.name}
                              </h3>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                          <span className="font-bold text-lg text-foreground">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center bg-white border border-neutral-200 rounded-lg shadow-sm h-8">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-3 text-neutral-600 hover:text-red-500 hover:bg-neutral-50 h-full rounded-l-lg transition-colors"
                            >
                              {item.quantity === 1 ? (
                                <Trash2 className="w-3.5 h-3.5" />
                              ) : (
                                <Minus className="w-3.5 h-3.5" />
                              )}
                            </button>
                            <span className="font-bold text-sm min-w-[20px] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-3 text-green-600 hover:bg-green-50 h-full rounded-r-lg transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs font-bold text-primary hover:text-primary hover:bg-primary/5"
                        >
                          Customize
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-none shadow-sm rounded-2xl overflow-hidden bg-white">
              <CardContent className="p-0">
                <button className="w-full p-5 flex items-center justify-between hover:bg-neutral-50 transition-colors text-left">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full text-primary">
                      <Percent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground">
                        Apply Coupon
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Get discount with your order
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-neutral-400" />
                </button>
                <Separator />
                <div className="p-5 flex items-center gap-3">
                  <Input
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="bg-neutral-50 border-neutral-200 rounded-xl h-11"
                  />
                  <Button
                    variant="ghost"
                    className="font-bold text-primary hover:text-primary hover:bg-primary/10 h-11 px-6"
                  >
                    APPLY
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Bill Details */}
          <div className="lg:col-span-5 h-fit lg:sticky lg:top-24">
            <Card className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-bold font-heading text-xl mb-6">
                  Bill Details
                </h3>

                <div className="space-y-4 text-sm mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Item Total</span>
                    <span className="text-foreground font-medium">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span className="flex items-center gap-2">
                      Delivery Fee <InfoTooltip text="Based on distance" />
                    </span>
                    <div className="text-right">
                      {deliveryFee === 0 ? (
                        <span className="text-green-600 font-bold">FREE</span>
                      ) : (
                        <span className="text-foreground font-medium">
                          ${deliveryFee.toFixed(2)}
                        </span>
                      )}
                      {deliveryFee === 0 && (
                        <span className="text-xs text-muted-foreground block line-through">
                          $5.00
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Platform Fee</span>
                    <span className="text-foreground font-medium">
                      ${platformFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>GST and Restaurant Charges</span>
                    <span className="text-foreground font-medium">
                      ${taxes.toFixed(2)}
                    </span>
                  </div>
                </div>

                <Separator className="bg-neutral-100 my-4" />

                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-lg text-foreground">
                    To Pay
                  </span>
                  <span className="font-bold text-2xl text-foreground">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mb-8 text-right">
                  Incl. all taxes and charges
                </p>

                <div className="bg-neutral-50 p-4 rounded-xl mb-6 border border-neutral-100">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-neutral-800">
                        100% Secure Payment
                      </p>
                      <p className="text-xs text-neutral-500 mt-1">
                        We accept all major credit cards and digital wallets.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full rounded-xl h-14 text-lg font-bold shadow-xl shadow-primary/25 bg-primary hover:bg-primary/90 animate-pulse-slow"
                >
                  PROCEED TO PAY
                </Button>
              </CardContent>
            </Card>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              <p>
                By proceeding, you agree to our{" "}
                <Link href="#" className="underline hover:text-primary">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline hover:text-primary">
                  Cancellation Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoTooltip({ text }: { text: string }) {
  return (
    <span className="w-4 h-4 rounded-full border border-neutral-300 flex items-center justify-center text-[10px] text-neutral-400 cursor-help hover:border-primary hover:text-primary transition-colors">
      i
    </span>
  );
}
