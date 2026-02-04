"use client";

import Link from "next/link";
import { useState } from "react";
import {
  UtensilsCrossed,
  Lock,
  Mail,
  User,
  ShieldCheck,
  ArrowRight,
  Loader2,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminRegisterPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate register
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Right: Register Form (Swapped for variety if desired, but keeping consistent left-visual is usually better for auth flows. Let's keep consistent.) */}

      {/* Left: Brand/Visual Section */}
      <div className="hidden lg:flex flex-col justify-between bg-zinc-900 p-12 text-white relative overflow-hidden">
        {/* Abstract Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black z-0" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-xs font-bold uppercase tracking-wider mb-6 border border-primary/20">
              <ShieldCheck className="w-3 h-3" />
              Secure Access
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              Join the <br />
              Leadership <br />
              <span className="text-primary-foreground/80">Team.</span>
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed">
              Create your administrative credential to begin managing the
              platform. Approval required for new accounts.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center justify-between text-sm text-zinc-500 border-t border-white/10 pt-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            System Operational
          </div>
        </div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-[420px] space-y-8">
          <div className="text-center pt-8 lg:pt-0">
            <h2 className="text-2xl font-bold tracking-tighter">
              Create Admin Account
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Enter your details and the secure organization key.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="pl-9 bg-secondary/20"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  className="bg-secondary/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  placeholder="john@foodie.com"
                  type="email"
                  className="pl-9 bg-secondary/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  className="pl-9 bg-secondary/20"
                  required
                  placeholder="Min 8 characters"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="adminKey">Organization Key</Label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-2.5 h-4 w-4 text-primary" />
                <Input
                  id="adminKey"
                  type="password"
                  className="pl-9 bg-primary/5 border-primary/20 focus-visible:ring-primary/30"
                  placeholder="ENTER-ADMIN-KEY-HERE"
                  required
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                This key is provided by your system administrator.
              </p>
            </div>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold shadow-lg hover:shadow-xl transition-all mt-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  Request Access <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground pt-2">
            Already have an account?{" "}
            <Link
              href="/admin/auth/login"
              className="font-semibold text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
