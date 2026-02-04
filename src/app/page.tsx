"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  Clock,
  Flame,
  Smartphone,
  Download,
  Utensils,
  MapPin,
} from "lucide-react";
import { MOCK_MENU_ITEMS } from "@/data/mockData";
import { useRef } from "react";

export default function Home() {
  const categoryRef = useRef<HTMLDivElement>(null);
  const bestSellerRef = useRef<HTMLDivElement>(null);

  const scroll = (
    direction: "left" | "right",
    ref: React.RefObject<HTMLDivElement | null>
  ) => {
    if (ref.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-10 px-4 md:px-10 lg:pt-32 overflow-hidden bg-background">
        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="w-fit gap-2 py-2 px-4 rounded-full text-primary bg-primary/10 hover:bg-primary/15 border-none font-bold tracking-wide shadow-sm"
                >
                  <Flame className="w-4 h-4 fill-primary" />
                  #1 PREMIUM DELIGHT
                </Badge>
                <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl xl:text-8xl/none text-foreground font-heading">
                  Hungry? <br />
                  <span className="text-primary relative inline-block">
                    We deliver.
                    <svg
                      className="absolute w-full h-4 -bottom-2 left-0 text-primary/20 -z-10"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 15 100 5"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="none"
                      />
                    </svg>
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed font-light">
                  Order food from favourite restaurants near you. Fast, fresh,
                  and delivered right to your doorstep.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter your delivery location"
                    className="w-full h-14 pl-12 pr-4 rounded-full border border-border/60 bg-secondary/30 focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                  />
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
                  asChild
                >
                  <Link href="/menu">Find Food</Link>
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground shadow-sm"
                    >
                      U{i}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg text-foreground">
                      4.9/5
                    </span>
                  </div>
                  <span className="text-muted-foreground text-sm font-medium">
                    10M+ Happy Customers
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none animate-in fade-in slide-in-from-right-6 duration-1000 delay-200 lg:pl-10">
              <div className="relative aspect-square">
                {/* Decorative blobs - Red Theme */}
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob" />
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000" />

                {/* Main Image Container */}
                <div
                  className="relative w-full h-full rounded-[3rem] bg-gradient-to-br from-secondary/50 to-background border-2 border-white/50 shadow-2xl overflow-hidden flex items-center justify-center transform rotate-[-3deg] hover:rotate-0 transition-transform duration-700 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1000&auto=format&fit=crop')",
                  }}
                >
                  {/* Fallback content if image fails or while loading */}
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent text-white">
                    <p className="font-bold text-xl md:text-3xl">
                      Fresh Salad Bowl
                    </p>
                    <p className="text-white/80 text-sm md:text-base">
                      Healthy & Organic
                    </p>
                  </div>
                </div>

                {/* Floating Cards */}
                <div className="absolute top-10 -left-6 bg-card p-4 rounded-2xl shadow-xl border border-border/50 animate-bounce-slow z-20 flex gap-3 items-center">
                  <div className="bg-red-100 p-2.5 rounded-full text-red-600">
                    <Flame size={20} fill="currentColor" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">
                      Trending
                    </p>
                    <p className="font-bold text-foreground">Hot & Spicy</p>
                  </div>
                </div>

                <div className="absolute bottom-20 -right-6 bg-card p-4 rounded-2xl shadow-xl border border-border/50 animate-bounce-slow animation-delay-2000 z-20 flex gap-3 items-center">
                  <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                    <Clock size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-muted-foreground uppercase">
                      Delivery
                    </p>
                    <p className="font-bold text-foreground">18 Mins</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Swiggy Style */}
      <section className="container px-4 md:px-6 mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            What's on your mind?
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => scroll("left", categoryRef)}
            >
              <ArrowRight className="rotate-180 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 hover:bg-secondary transition-colors"
              onClick={() => scroll("right", categoryRef)}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div
          ref={categoryRef}
          className="flex gap-8 overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth"
        >
          {[
            {
              name: "Biryani",
              img: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=300&auto=format&fit=crop",
            },
            {
              name: "Pizza",
              img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=300&auto=format&fit=crop",
            },
            {
              name: "Burger",
              img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=300&auto=format&fit=crop",
            },
            {
              name: "Sushi",
              img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=300&auto=format&fit=crop",
            },
            {
              name: "Cake",
              img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=300&auto=format&fit=crop",
            },
            {
              name: "Ice Cream",
              img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=300&auto=format&fit=crop",
            },
            {
              name: "Tacos",
              img: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=300&auto=format&fit=crop",
            },
          ].map((item, i) => (
            <Link
              href={`/menu/the-royal-burger`}
              key={i}
              className="flex flex-col items-center gap-3 min-w-[100px] cursor-pointer group snap-center"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-transparent group-hover:border-primary/20 transition-all duration-300 shadow-sm group-hover:shadow-md">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <span className="font-bold text-muted-foreground group-hover:text-primary transition-colors text-lg">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="container px-4 md:px-6 mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">
            Best Sellers & Top Rated
          </h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 opacity-50 hover:opacity-100 transition-opacity"
              onClick={() => scroll("left", bestSellerRef)}
            >
              <ArrowRight className="rotate-180 w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 hover:bg-secondary transition-colors"
              onClick={() => scroll("right", bestSellerRef)}
            >
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div
          ref={bestSellerRef}
          className="flex gap-4 md:gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x scroll-smooth"
        >
          {MOCK_MENU_ITEMS.filter((i) => i.isBestSeller).map((item) => (
            <Link
              href={`/menu/${item.slug}`}
              key={item._id}
              className="min-w-[85vw] sm:min-w-[45vw] md:min-w-[320px] snap-center"
            >
              <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group rounded-2xl h-full flex flex-col">
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={item.image}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.name}
                  />
                  {item.discountedPrice && (
                    <div className="absolute top-0 right-0 left-0 bg-gradient-to-b from-black/50 to-transparent p-4">
                      <div className="flex justify-end">
                        <Badge className="bg-red-500 text-white border-none font-bold shadow-sm">
                          {Math.round(
                            ((item.price - item.discountedPrice) / item.price) *
                              100
                          )}
                          % OFF
                        </Badge>
                      </div>
                    </div>
                  )}
                  {item.isVeg ? (
                    <div className="absolute top-3 left-3 bg-green-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-md z-10">
                      Veg
                    </div>
                  ) : (
                    <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-md z-10">
                      Non-Veg
                    </div>
                  )}
                </div>
                <CardContent className="p-4 bg-card flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-1 gap-2">
                    <h3 className="font-bold text-xl text-foreground line-clamp-1">
                      {item.name}
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-200 gap-1 font-bold shrink-0"
                    >
                      {item.rating} <Star size={10} fill="currentColor" />
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm font-medium mb-3 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-auto border-t border-border/50 pt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-foreground">
                        ${item.discountedPrice || item.price}
                      </span>
                      {item.discountedPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${item.price}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-semibold text-muted-foreground uppercase flex items-center gap-1">
                      <Clock size={12} /> {item.preparationTime} mins
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Mega Combo Deal Section */}
      <section className="container px-4 md:px-6 mx-auto py-10">
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl min-h-[420px] md:min-h-[500px]">
          {/* Background Image */}
          <img
            src="https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=1600&auto=format&fit=crop"
            alt="Mega Combo Deal"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/55"></div>

          {/* Content */}
          <div className="relative z-10 h-full flex items-center p-8 md:p-12">
            <div className="max-w-xl text-white space-y-6">
              <Badge className="bg-primary text-white border-none px-4 py-2 text-sm font-bold uppercase tracking-widest">
                Deal of the Day
              </Badge>

              <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
                Mega Cheese <br />
                <span className="text-primary">Burst Combo</span>
              </h2>

              <p className="text-lg md:text-xl text-white/90">
                Double Patty Burger + Large Fries + Coke at a crazy price.
              </p>

              <div className="flex items-center gap-6">
                <span className="text-5xl font-extrabold text-primary">
                  $14.99
                </span>
                <div>
                  <span className="block text-lg line-through text-white/60 font-bold">
                    $24.99
                  </span>
                  <Badge className="bg-primary text-black font-bold">
                    SAVE $10
                  </Badge>
                </div>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 rounded-full px-8 h-14 text-lg font-bold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
                asChild
              >
                <Link href="/menu/mega-cheese-burger-combo">Order Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Items Section */}
      <section className="container px-4 md:px-6 mx-auto py-8 mb-8">
        <div className="bg-secondary/20 rounded-[2rem] p-6 md:p-12 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-100 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />

          <div className="flex items-center justify-between mb-8 relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-heading">
              Chef's Specials
              <span className="block text-base font-normal text-muted-foreground mt-1">
                Curated dishes just for you
              </span>
            </h2>
            <Button
              variant="outline"
              asChild
              className="rounded-full hidden md:flex"
            >
              <Link href="/menu">View All</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            {MOCK_MENU_ITEMS.filter((i) => i.isChefSpecial)
              .slice(0, 4)
              .map((item) => (
                <Link href={`/menu/${item.slug}`} key={item._id}>
                  <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden cursor-pointer h-full hover:-translate-y-1">
                    <div className="relative h-40">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:scale-110 transition-transform">
                        <Button
                          size="icon"
                          className="h-6 w-6 rounded-full bg-primary text-white p-1"
                        >
                          <Utensils size={12} />
                        </Button>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-primary">
                          ${item.price}
                        </span>
                        <span className="text-[10px] font-bold uppercase bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          Chef Special
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild className="rounded-full w-full">
              <Link href="/menu">View All Specials</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* App Download Section (Keep but refine) */}
      <section className="container px-4 md:px-6 mx-auto py-12 md:py-24">
        <div className="relative rounded-[2.5rem] bg-foreground overflow-hidden text-background p-8 md:p-16 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight">
                For better experience, <br />
                <span className="text-primary">download the Foodie app</span>
              </h2>
              <p className="text-background/70 text-lg md:text-xl leading-relaxed max-w-lg">
                Exclusive offers, live order tracking, and super fast delivery.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="h-14 px-6 rounded-xl gap-2 bg-background text-foreground hover:bg-secondary border-none"
                  asChild
                >
                  <Link href="#">
                    <Smartphone className="w-5 h-5 opacity-60" />
                    <span className="font-bold">App Store</span>
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="h-14 px-6 rounded-xl gap-2 bg-transparent border border-background/20 text-background hover:bg-background/10"
                  asChild
                >
                  <Link href="#">
                    <Download className="w-5 h-5 opacity-60" />
                    <span className="font-bold">Google Play</span>
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative hidden md:flex justify-end items-center pr-10">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
                className="rounded-3xl border-8 border-background/10 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 max-w-[300px]"
                alt="App Preview"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
