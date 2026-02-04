"use client";

import Link from "next/link";
import {
  Menu,
  Search,
  ShoppingCart,
  UtensilsCrossed,
  LogOut,
  Loader2,
  ChevronDown,
  MapPin,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useCart } from "@/context/CartContext";

import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const { itemCount } = useCart();
  const isLoggedIn = true; // status === "authenticated";
  const user = session?.user;

  if (pathname.startsWith("/admin")) return null;
  // ... existing code ...

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col w-full fixed top-0 z-50">
      <TopBar />
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/80 backdrop-blur-2xl border-border/40 shadow-md py-1 md:py-2"
            : "bg-background/60 backdrop-blur-md border-transparent py-2 md:py-3"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo & Location */}
            <div className="flex items-center gap-6">
              <Link href="/" className="flex items-center gap-2 group">
                <div className="bg-primary p-2 md:p-2.5 rounded-xl text-primary-foreground shadow-lg shadow-primary/25 group-hover:bg-primary/90 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3">
                  <UtensilsCrossed size={24} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl md:text-2xl font-bold tracking-tight font-heading text-foreground leading-none">
                    Foodie
                  </span>
                  <span className="hidden md:block text-[0.65rem] uppercase tracking-widest font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    Premium Delivery
                  </span>
                </div>
              </Link>

              {/* Location Selector (Hidden on small mobile) */}
              <div className="hidden lg:flex flex-col items-start ml-4 pl-4 border-l border-border/60">
                <div className="flex items-center gap-1 text-primary text-xs font-bold uppercase tracking-wider">
                  <MapPin size={12} strokeWidth={3} />
                  <span>Delivering to</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors group">
                  <span className="border-b border-dashed border-foreground/30 group-hover:border-primary">
                    New York, USA
                  </span>
                  <ChevronDown
                    size={14}
                    className="text-muted-foreground group-hover:text-primary"
                  />
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Search Bar - Expanded */}
              <div className="hidden xl:flex relative w-[300px] group mr-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  type="search"
                  placeholder="Search for restaurants, food..."
                  className="w-full bg-secondary/50 border-input/40 focus:bg-background focus:border-primary/30 focus:ring-4 focus:ring-primary/10 pl-10 h-11 rounded-xl transition-all duration-300 shadow-sm"
                />
              </div>

              <div className="flex items-center gap-1 bg-secondary/30 p-1 rounded-full border border-border/40">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="rounded-full px-5 hover:bg-white hover:shadow-sm font-medium"
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button
                    variant="ghost"
                    className="rounded-full px-5 hover:bg-white hover:shadow-sm font-medium hover:text-primary"
                  >
                    Menu
                  </Button>
                </Link>
                <Link href="/orders">
                  <Button
                    variant="ghost"
                    className="rounded-full px-5 hover:bg-white hover:shadow-sm font-medium hover:text-primary"
                  >
                    Orders
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Mobile Search Trigger */}
              <Button variant="ghost" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="relative hover:text-primary hover:bg-primary/10 transition-all duration-300 rounded-full h-11 w-11"
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {itemCount > 0 && (
                    <span className="absolute top-2.5 right-2.5 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary border-2 border-background"></span>
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Link>
              </Button>

              {/* ... */}

              {status === "loading" ? (
                <div className="w-10 h-10 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
              ) : isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-11 w-11 border border-border/50 hover:bg-secondary transition-all hover:ring-2 hover:ring-primary/20 p-1 ml-1"
                    >
                      <Avatar className="h-full w-full pointer-events-none">
                        <AvatarImage
                          src={user?.image || ""}
                          alt={user?.name || "User"}
                          className="object-cover"
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                          {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="w-60 p-2 shadow-xl border-border/60 backdrop-blur-xl bg-background/95 mt-2 rounded-2xl"
                  >
                    <div className="px-2 py-3 flex items-center gap-3 bg-secondary/30 rounded-xl mb-1">
                      <Avatar className="h-10 w-10 border border-background shadow-sm">
                        <AvatarImage src={user?.image || ""} />
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {user?.name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-0.5 overflow-hidden">
                        <p className="text-sm font-bold truncate">
                          {user?.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5 font-medium">
                      <Link href="/profile" className="w-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer rounded-lg py-2.5 font-medium">
                      Orders
                    </DropdownMenuItem>
                    {user?.role === "admin" && (
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin/dashboard"
                          className="w-full cursor-pointer rounded-lg py-2.5 font-medium"
                        >
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator className="my-1" />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="text-destructive focus:text-destructive focus:bg-destructive/10 cursor-pointer rounded-lg py-2.5 font-medium"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="hidden md:flex gap-3 ml-2">
                  <Button
                    variant="ghost"
                    size="default"
                    asChild
                    className="hover:text-primary font-medium rounded-full px-6"
                  >
                    <Link href="/auth/login">Log in</Link>
                  </Button>
                  <Button
                    size="default"
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all font-medium px-6 h-11"
                    asChild
                  >
                    <Link href="/auth/register">Sign Up</Link>
                  </Button>
                </div>
              )}

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden hover:text-primary"
                  >
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[300px] sm:w-[350px] border-l-primary/10 rounded-l-[30px]"
                >
                  <SheetHeader>
                    <SheetTitle className="text-left flex items-center gap-2 pb-6 border-b border-border/50">
                      <div className="bg-primary p-2 rounded-xl text-primary-foreground shadow-md">
                        <UtensilsCrossed size={20} />
                      </div>
                      <span className="font-heading font-bold text-2xl tracking-tight">
                        Foodie.
                      </span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="pl-9 bg-secondary/50 border-transparent rounded-xl"
                      />
                    </div>

                    <Link
                      href="/"
                      className="text-xl font-medium text-foreground hover:text-primary transition-colors flex items-center justify-between group"
                    >
                      Home
                      <span className="w-1.5 h-1.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                    <div className="space-y-3">
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest pl-1">
                        Menu
                      </p>
                      <div className="pl-4 flex flex-col gap-4 border-l-2 border-border/50 ml-1">
                        <Link
                          href="/menu?category=burgers"
                          className="text-lg font-medium hover:text-primary transition-colors hover:translate-x-1 duration-200"
                        >
                          Burgers
                        </Link>
                        <Link
                          href="/menu?category=pizza"
                          className="text-lg font-medium hover:text-primary transition-colors hover:translate-x-1 duration-200"
                        >
                          Pizza
                        </Link>
                        <Link
                          href="/menu?category=asian"
                          className="text-lg font-medium hover:text-primary transition-colors hover:translate-x-1 duration-200"
                        >
                          Asian
                        </Link>
                        <Link
                          href="/menu"
                          className="text-base font-bold text-primary mt-2 flex items-center gap-1"
                        >
                          View All Menu{" "}
                          <ChevronDown className="-rotate-90" size={14} />
                        </Link>
                      </div>
                    </div>
                    <Link
                      href="/orders"
                      className="text-xl font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Orders
                    </Link>
                    <Link
                      href="/cart"
                      className="text-xl font-medium text-muted-foreground hover:text-primary transition-colors flex items-center justify-between"
                    >
                      Cart
                      {itemCount > 0 && (
                        <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-0.5 rounded-full">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                    <Link
                      href="/contact"
                      className="text-xl font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                      Contact
                    </Link>

                    {!isLoggedIn && (
                      <div className="flex flex-col gap-3 mt-auto pt-8">
                        <Button
                          variant="outline"
                          className="w-full justify-start h-12 border-primary/20 hover:bg-primary/5 hover:text-primary font-bold rounded-xl"
                          asChild
                        >
                          <Link href="/auth/login">Log in</Link>
                        </Button>
                        <Button
                          className="w-full bg-primary hover:bg-primary/90 h-12 shadow-lg shadow-primary/20 font-bold rounded-xl"
                          asChild
                        >
                          <Link href="/auth/register">Sign Up</Link>
                        </Button>
                      </div>
                    )}
                    {isLoggedIn && (
                      <Button
                        variant="ghost"
                        className="w-full mt-auto justify-start text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl h-12 font-medium"
                        onClick={() => signOut()}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Log Out
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
