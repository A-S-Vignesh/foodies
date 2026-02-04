"use client";

import Link from "next/link";
import { useState } from "react";
import { UtensilsCrossed, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      // Redirect would happen here
    }, 2000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left: Brand/Visual Section */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white relative overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="bg-white/10 p-2.5 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Foodie Admin
            </span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Manage your <br />
              Empire with <br />
              <span className="text-primary-foreground/80">Confidence.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Access real-time analytics, manage orders, and update your menu
              from one centralized command center.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-zinc-500 border-t border-white/10 pt-8">
          <p>© 2024 Foodie Inc.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="text-center pt-8 lg:pt-0">
            <h2 className="text-2xl font-bold tracking-tighter">
              Welcome back
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Enter your credentials to access the admin dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    placeholder="admin@foodie.com"
                    type="email"
                    className="pl-9 h-11 bg-secondary/20"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/admin/auth/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    className="pl-9 h-11 bg-secondary/20"
                    required
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <Label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Keep me signed in for 30 days
              </Label>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground pt-4">
            Don't have an admin account?{" "}
            <Link
              href="/admin/auth/register"
              className="font-semibold text-primary hover:underline"
            >
              Request Access
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
