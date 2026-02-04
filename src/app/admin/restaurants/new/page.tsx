"use client";

import { RestaurantForm } from "@/components/admin/RestaurantForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewRestaurantPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 rounded-full"
          asChild
        >
          <Link href="/admin/restaurants">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Add New Restaurant
          </h1>
          <p className="text-muted-foreground text-sm">
            Onboard a new restaurant partner or branch.
          </p>
        </div>
      </div>

      <RestaurantForm />
    </div>
  );
}
