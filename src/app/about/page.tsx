"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Soup,
  Utensils,
  Clock,
  ShieldCheck,
  ChefHat,
  Users,
  Trophy,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full bg-background pt-20">
      {/* Hero Section */}
      <section className="relative w-full pt-20 pb-10 px-4 md:px-10 lg:pt-32 overflow-hidden bg-background">
        <div className="container px-4 md:px-6 relative z-10 mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
            <div className="flex flex-col justify-center space-y-8 animate-in fade-in slide-in-from-left-6 duration-700">
              <div className="space-y-4">
                <Badge
                  variant="secondary"
                  className="w-fit gap-2 py-2 px-4 rounded-full text-primary bg-primary/10 border-none font-bold tracking-wide"
                >
                  <Heart className="w-4 h-4 fill-primary" />
                  SINCE 2015
                </Badge>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl xl:text-7xl/none text-foreground font-heading">
                  We cook with <br />
                  <span className="text-primary relative inline-block">
                    passion & love.
                  </span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl leading-relaxed font-light">
                  Foodie isn't just a restaurant; it's a celebration of flavors,
                  traditions, and the joy of sharing good food with great
                  people.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="rounded-full px-8 h-12 text-base font-bold shadow-lg shadow-primary/30"
                  asChild
                >
                  <Link href="/menu">Explore Our Menu</Link>
                </Button>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px] lg:max-w-none">
              <div className="relative aspect-square rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745a30bf?q=80&w=1000&auto=format&fit=crop"
                  alt="Our Kitchen"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="container px-4 md:px-6 mx-auto py-20">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=500&auto=format&fit=crop"
                className="rounded-2xl shadow-lg mt-8"
                alt="Food 1"
              />
              <img
                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop"
                className="rounded-2xl shadow-lg"
                alt="Food 2"
              />
            </div>
            <div className="absolute -z-10 bg-secondary/30 rounded-full w-96 h-96 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold font-heading">
              Our Short Story
            </h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              It all started with a simple idea: to bring authentic,
              high-quality flavors to our table. What began as a small family
              kitchen has grown into a beloved community hub for food lovers.
            </p>
            <p className="text-muted-foreground leading-relaxed text-lg">
              We believe that food is more than just sustenance—it's an
              experience. That's why we source the freshest ingredients, work
              with passionate chefs, and ensure every dish that leaves our
              kitchen is a masterpiece.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-bold text-primary">150+</h3>
                <span className="text-sm text-muted-foreground font-medium">
                  Daily Dishes
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-bold text-primary">20k+</h3>
                <span className="text-sm text-muted-foreground font-medium">
                  Happy Customers
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-secondary/20 py-20">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
              Why Choose Us?
            </h2>
            <p className="text-muted-foreground text-lg">
              We don't just cook; we craft experiences. Here is what makes us
              different.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Soup className="w-8 h-8 text-primary" />}
              title="Fresh Ingredients"
              description="We source our vegetables and meats daily to ensure the highest quality and freshness in every bite."
            />
            <FeatureCard
              icon={<ChefHat className="w-8 h-8 text-primary" />}
              title="Expert Chefs"
              description="Our kitchen is led by award-winning chefs who bring years of culinary expertise and passion."
            />
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Quality Promise"
              description="We maintain strict hygiene and quality standards. Your health and satisfaction are our top priorities."
            />
          </div>
        </div>
      </section>

      {/* Team/CTA Section */}
      <section className="container px-4 md:px-6 mx-auto py-20 text-center">
        <div className="bg-foreground text-background rounded-[2.5rem] p-8 md:p-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="relative z-10 max-w-2xl mx-auto space-y-8">
            <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
            <h2 className="text-3xl md:text-5xl font-bold font-heading">
              Rated #1 in the City
            </h2>
            <p className="text-lg text-background/80 leading-relaxed">
              Join thousands of satisfied foodies who have made us their go-to
              destination for delicious meals.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 text-base font-bold"
              asChild
            >
              <Link href="/menu">Order Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300">
      <CardContent className="p-8 flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-2">
          {icon}
        </div>
        <h3 className="font-bold text-xl font-heading">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
